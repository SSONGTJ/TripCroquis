import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const FlexDiv = styled.div`
    display: flex;
    flex-direction: column;
`;
const PlaceList = styled.ul`
    color: black;
    padding: 0;
    display: flex;
    flex-direction: column;
    max-height: 150px;
    height:150px;
    overflow-y: auto;
`;

const ListUp = styled.li`
    list-style: none;
    padding: 10px 10px;
    margin: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #efefef;
    border-radius: 10px;
`;

const DistanceText = styled.span`
    font-size: 14px;
    color: gray;
`;

const InputButtonWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
`;

const StyledInput = styled.input`
    flex: 1;
    min-width: 250px;
    max-width: 300px;
    padding: 10px;
    font-size: 16px;
`;

const StyledButton = styled.button`
    padding: 10px 15px;
    font-size: 16px;
    background-color: #3b3b3b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #0056b3;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    text-align: center;
    color: black;
    display:flex;
    flex-direction:column;
`;

const Button = styled.button`
    margin-top: 10px;
    padding: 10px 15px;
    font-size: 16px;
    background-color: #3b3b3b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #0056b3;
    }
`;

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const Travel = () => {
    const mapRef = useRef(null);
    const inputRef = useRef(null);

    const [map, setMap] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [placesList, setPlacesList] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [polyline, setPolyline] = useState(null);
    const [distances, setDistances] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listText, setListText] = useState('');

    useEffect(() => {
        const loadScript = () => {
            if (document.getElementById('google-maps-script')) return;

            const script = document.createElement('script');
            script.id = 'google-maps-script';
            script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places,geometry`;
            script.async = true;
            script.onload = () => initMap();
            document.body.appendChild(script);
        };

        const initMap = () => {
            if (!mapRef.current || !window.google) return;

            const newMap = new window.google.maps.Map(mapRef.current, {
                center: { lat: 33.59175491333008, lng: 130.40151977539062 },
                zoom: 14,
            });
            setMap(newMap);
        };

        loadScript();
    }, []);

    useEffect(() => {
        if (!map || !window.google || !inputRef.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(
            inputRef.current
        );
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location) return;

            const newLocation = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                name: place.name,
            };

            setSelectedPlace(newLocation);
            map.setCenter(newLocation);
            map.setZoom(14);
        });
    }, [map]);

    // 🛠 장소 추가 및 마커 표시
    const handleAddPlace = () => {
        if (selectedPlace && map) {
            const newMarker = new window.google.maps.Marker({
                position: { lat: selectedPlace.lat, lng: selectedPlace.lng },
                map,
                title: selectedPlace.name,
            });

            setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
            setPlacesList((prevList) => [...prevList, selectedPlace]);
            setSelectedPlace(null);
            inputRef.current.value = '';
        }
    };

    // 🔗 거리 계산 및 폴리라인 업데이트
    useEffect(() => {
        if (placesList.length > 1) {
            const updatedDistances = [];
            const path = [];

            for (let i = 0; i < placesList.length - 1; i++) {
                const placeA = placesList[i];
                const placeB = placesList[i + 1];

                const distance =
                    window.google.maps.geometry.spherical.computeDistanceBetween(
                        new window.google.maps.LatLng(placeA.lat, placeA.lng),
                        new window.google.maps.LatLng(placeB.lat, placeB.lng)
                    );

                updatedDistances.push(distance);
            }

            placesList.forEach((place) => {
                path.push(new window.google.maps.LatLng(place.lat, place.lng));
            });

            if (polyline) {
                polyline.setMap(null); // 기존 경로 제거
            }

            const newPolyline = new window.google.maps.Polyline({
                path,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                map,
            });

            setPolyline(newPolyline);
            setDistances(updatedDistances);
        }
    }, [placesList, map]);

    // 🔥 공유 버튼 클릭 시 실행
    const handleShare = () => {
        if (!placesList.length) return;

        // 1️⃣ 장소 및 거리 목록 정리
        let text = `📌 방문 장소 목록:\n`;
        placesList.forEach((place, index) => {
            text += `${index + 1}. ${place.name}`;
            if (index > 0 && distances[index - 1] !== undefined) {
                text += ` (${distances[index - 1]?.toFixed(2)} m)`;
            }
            text += '\n';
        });

        setListText(text);
        setIsModalOpen(true);
    };

    // 📋 클립보드 복사 기능
    const handleCopyToClipboard = () => {
        navigator.clipboard
            .writeText(listText)
            .then(() => alert('클립보드에 복사되었습니다!'))
            .catch((err) => console.error('복사 실패:', err));
    };

    return (
        <FlexDiv>
            <div
                ref={mapRef}
                style={{ height: '30vh', width: '100%', marginTop: '10px' }}
            ></div>

            <InputButtonWrap
                style={{ display: 'flex', gap: '10px', marginTop: '10px' }}
            >
                <StyledInput
                    ref={inputRef}
                    type="text"
                    placeholder="장소 검색"
                />
                <StyledButton onClick={handleAddPlace}>추가</StyledButton>
            </InputButtonWrap>

            <PlaceList>
                {placesList.map((place, index) => (
                    <ListUp key={index}>
                        <span>
                            {index + 1}. {place.name}
                        </span>
                        {index > 0 && distances[index - 1] !== undefined && (
                            <DistanceText>
                                ({distances[index - 1]?.toFixed(2)} m)
                            </DistanceText>
                        )}
                    </ListUp>
                ))}
            </PlaceList>

            <StyledButton onClick={handleShare}>📷 공유하기</StyledButton>

            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <h3>📍 방문 장소 목록</h3>
                        <pre
                            style={{
                                textAlign: 'left',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {listText}
                        </pre>
                        <Button onClick={handleCopyToClipboard}>
                            복사하기
                        </Button>
                        <Button onClick={() => setIsModalOpen(false)}>
                            닫기
                        </Button>
                    </ModalContent>
                </ModalOverlay>
            )}
        </FlexDiv>
    );
};

export default Travel;

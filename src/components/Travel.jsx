import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const PlaceList = styled.ul`
    color: black;
    padding: 0;
    display: flex;
    flex-direction: column;
    max-height: 200px;
    overflow-y: scroll;
`;
const ListUp = styled.li`
    list-style: none;
    padding: 10px 10px;
    margin: 5px 10px;
    display: flex;
    align-items: center;
    border: 1px solid #efefef;
    border-radius: 10px;
`;

const InputButton = styled.div`
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

const Travel = () => {
    const mapRef = useRef(null);
    const inputRef = useRef(null);
    const [map, setMap] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [placesList, setPlacesList] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [polyline, setPolyline] = useState(null);

    useEffect(() => {
        const loadScript = () => {
            if (document.getElementById('google-maps-script')) return;

            const script = document.createElement('script');
            script.id = 'google-maps-script';
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAX8LV4r7I1oeADd__z1C61M3UasEAA8Bs&libraries=places`;
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

    // 장소 추가 및 지도 업데이트
    const handleAddPlace = () => {
        if (selectedPlace) {
            setPlacesList((prevList) => {
                const updatedList = [...prevList, selectedPlace];

                // 새로운 마커 추가
                const newMarker = new window.google.maps.Marker({
                    position: selectedPlace,
                    map,
                    title: selectedPlace.name,
                });

                setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

                // 2개 이상이면 경로(Polyline) 업데이트
                if (updatedList.length > 1) {
                    if (polyline) polyline.setMap(null); // 기존 선 삭제

                    const newPolyline = new window.google.maps.Polyline({
                        path: updatedList.map((place) => ({
                            lat: place.lat,
                            lng: place.lng,
                        })),
                        geodesic: true,
                        strokeColor: '#FF0000',
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                        map,
                    });

                    setPolyline(newPolyline);
                }

                return updatedList;
            });

            setSelectedPlace(null);
            inputRef.current.value = ''; // 입력창 초기화
        }
    };

    return (
        <div>
            {/* 지도 표시 영역 */}
            <div
                ref={mapRef}
                style={{ height: '30vh', width: '100%', marginTop: '10px' }}
            ></div>

            <InputButton>
                {/* 검색 입력창 */}
                <StyledInput
                    ref={inputRef}
                    type="text"
                    placeholder="장소 검색"
                />
                <StyledButton
                    onClick={handleAddPlace}
                    style={{ marginLeft: '10px', padding: '10px' }}
                >
                    추가
                </StyledButton>
            </InputButton>

            {/* 추가된 장소 리스트 */}
            <PlaceList>
                {placesList.map((place, index) => (
                    <ListUp key={index}>
                        {index + 1}. {place.name}
                    </ListUp>
                ))}
            </PlaceList>
        </div>
    );
};

export default Travel;

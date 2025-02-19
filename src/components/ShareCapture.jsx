import html2canvas from 'html2canvas';
import React, { useRef } from 'react';
import styled from 'styled-components';

const CaptureContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: white;
`;

const CaptureButton = styled.button`
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

const ShareCapture = ({ placesList, distances }) => {
    const captureRef = useRef(null);

    const handleCapture = async () => {
        if (!captureRef.current) return;
        const canvas = await html2canvas(captureRef.current);
        const image = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = image;
        link.download = 'trip-summary.png';
        link.click();
    };

    return (
        <div>
            <CaptureContainer ref={captureRef}>
                <h2>여행 경로</h2>
                <ul>
                    {placesList.map((place, index) => (
                        <li key={index}>
                            {index + 1}. {place.name}{' '}
                            {index > 0 &&
                                `(${distances[index - 1]?.toFixed(2)}m)`}
                        </li>
                    ))}
                </ul>
                <div
                    id="mapCapture"
                    style={{
                        width: '300px',
                        height: '200px',
                        background: '#ddd',
                    }}
                >
                    (지도 캡처)
                </div>
                <h3>
                    총 이동 거리:{' '}
                    {distances.reduce((sum, d) => sum + d, 0).toFixed(2)}m
                </h3>
            </CaptureContainer>
            <CaptureButton onClick={handleCapture}>이미지 저장</CaptureButton>
        </div>
    );
};

export default ShareCapture;

import './App.css';
import styled from 'styled-components';
import Travel from './components/Travel';
import BottomNav from './components/BottomNav';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* 화면 전체 높이 */
    background-color: #f0f0f0; /* 배경 색상 */
`;
const PhoneBox = styled.div`
    width: 400px; /* 스마트폰 너비 */
    height: 700px; /* 스마트폰 높이 (원하는 크기로 조정 가능) */
    background-color: #fff; /* 배경 색상 */
    border-radius: 30px; /* 둥근 모서리 */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    overflow: hidden; /* 내용이 넘칠 경우 숨김 처리 */
`;
const AppContent = styled.div`
    padding: 0 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
    color: gray;
    margin-bottom: 20px;
`;

function App() {
    return (
        <>
            <Wrapper>
                <PhoneBox>
                    <Title>Trip Croquis</Title>
                    <AppContent>
                        <Travel />
                    </AppContent>
                    <BottomNav style={{ position:'absolute' }} />
                </PhoneBox>
            </Wrapper>
        </>
    );
}

export default App;

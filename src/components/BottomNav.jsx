import React from 'react';
import styled from 'styled-components';

const BotNav = styled.div`
    width: 100px;
    height: 20px;
    background-color: gray;
`;

const Navui = styled.ul`
    color: black;
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    justify-content: space-evenly;
    height: 40px;
    width: 100%;
    align-items: center;
`;
const Navli = styled.li``;
const BottomNav = () => {
    return (
        <div>
            <Navui>
                <Navli>공유하기</Navli>
                <Navli>로그인</Navli>
            </Navui>
        </div>
    );
};

export default BottomNav;

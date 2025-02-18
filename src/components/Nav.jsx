import React from 'react';
import styled from 'styled-components';

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

const StyledTitle = styled.h1`
    color: gray;
`;
const Navli = styled.li``;
const Nav = () => {
    return (
        <div>
            <StyledTitle>Trip Croquis</StyledTitle>
        </div>
    );
};

export default Nav;

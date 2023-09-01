import {useNavigate} from 'react-router-dom';

import ROUTES from '../constants/routes';
import {OWNER, REPO} from '../constants/api';

import styled from 'styled-components';
import colorPalette from '../styles/colorPalette.styled';

const Header = () => {
    const navigate = useNavigate();

    const navigateToMain = () => {
        navigate(ROUTES.ISSUES);
    };
    return (
        <StyledHeader>
            <span className='owner'>{OWNER}</span> /{' '}
            <span onClick={navigateToMain} className='repo'>
                {REPO}
            </span>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    padding: 16px 0 16px 0;
    min-width: 100vw;
    background-color: ${colorPalette.listItemBg};
    text-align: center;
    .repo {
        font-weight: 600;
        cursor: pointer;
    }
`;

export default Header;

import styled from 'styled-components';
import {OWNER, REPO} from '../constants/repoInfo';

const Header = () => {
    return (
        <StyledHeader>
            <span className='owner'>{OWNER}</span> / <span className='repo'>{REPO}</span>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    padding: 16px 0 16px 0;
    min-width: 100vw;
    background-color: lightgray;
    text-align: center;
    .repo {
        font-weight: 600;
    }
`;

export default Header;

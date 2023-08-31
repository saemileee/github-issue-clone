import {useNavigate} from 'react-router-dom';
import ROUTES from '../constants/routes';

import {DefaultContainer} from '../styles/DefaultContainer.styled';

import styled from 'styled-components';
import colorPalette from '../styles/colorPalette.styled';

const NotFound = ({errorStatus}: {errorStatus?: number | string}) => {
    const navigate = useNavigate();

    const navigateToMain = () => {
        navigate(ROUTES.ISSUES);
    };

    return (
        <DefaultContainer>
            <StyledNotFoundContainer>
                <p className='error-status'>{errorStatus ? errorStatus : 404}</p>
                <p className='message'>페이지를 찾을 수 없습니다 :(</p>
                <button onClick={navigateToMain}>메인으로 돌아가기</button>
            </StyledNotFoundContainer>
        </DefaultContainer>
    );
};

const StyledNotFoundContainer = styled.div`
    margin-top: 50px;
    text-align: center;
    .error-status {
        margin: 0;
        font-size: 70px;
        font-weight: 900;
        color: ${colorPalette.highLighting};
    }

    .message {
        padding-top: 0px;
        font-size: 26px;
        font-weight: 800;
        color: ${colorPalette.textSubtitle};
    }

    button {
        padding: 16px;
        font-size: 18px;
        font-weight: 600;
        color: white;
        background-color: ${colorPalette.highLighting};
        border: none;
        border-radius: 12px;
        cursor: pointer;
    }
`;

export default NotFound;

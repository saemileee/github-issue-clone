import LoadingItem from './LoadingItem';

import styled from 'styled-components';
import {StyledIssuePostContainer} from './IssuePost';
import colorPalette from '../../styles/colorPalette.styled';

const LoadingPost = () => {
    return (
        <StyledLoadingPostContainer>
            <div className='post-top-container'>
                <span className='user-avater-container'></span>
                <LoadingItem />
            </div>
            <div className='post-body-container'>
                <div className='empty-body'></div>
            </div>
        </StyledLoadingPostContainer>
    );
};

const StyledLoadingPostContainer = styled(StyledIssuePostContainer)`
    width: 100%;
    overflow: hidden;
    position: relative;

    @keyframes shine {
        0% {
            opacity: 1;
        }

        50% {
            opacity: 0.5;
        }

        100% {
            opacity: 1;
        }
    }

    .user-avater-container {
        height: 60px;
        background-color: ${colorPalette.textCode};
        animation: shine 1s ease-in-out infinite;
    }

    .post-body-container {
        .empty-body {
            width: 100%;
            height: 400px;
            box-sizing: border-box;
            background-color: ${colorPalette.textCode};
            animation: shine 1s ease-in-out infinite;
        }
    }
`;

export default LoadingPost;

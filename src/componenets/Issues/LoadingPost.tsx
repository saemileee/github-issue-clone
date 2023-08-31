import styled from 'styled-components';
import {StyledIssuePostContainer} from './IssuePost';
import LoadingItem from './LoadingItem';
import colorPalette from '../../styles/colorPalette.styled';
import {StyledLoadingAnimationBar} from '../../styles/common/Loading.styled';

const LoadingPost = () => {
    return (
        <StyledLoadingPostContainer>
            <StyledLoadingAnimationBar blur={'80px'} />
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

    .user-avater-container {
        height: 60px;
        background-color: ${colorPalette.textCode};
    }

    .post-body-container {
        .empty-body {
            width: 100%;
            height: 400px;
            box-sizing: border-box;
            background-color: ${colorPalette.textCode};
        }
    }
`;

export default LoadingPost;

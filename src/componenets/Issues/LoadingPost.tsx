import styled from 'styled-components';
import {StyledIssuePostContainer} from './IssuePost';
import LoadingItem from './LoadingItem';

const LoadingPost = () => {
    return (
        <LoadingPostContainer>
            <div className='post-top-container'>
                <span className='user-avater-container'></span>
                <LoadingItem />
            </div>
            <div className='post-body-container'>
                <div className='empty-body'></div>
            </div>
        </LoadingPostContainer>
    );
};

const LoadingPostContainer = styled(StyledIssuePostContainer)`
    .user-avater-container {
        height: 60px;
        background-color: lightgray;
    }
    .post-body-container {
        .empty-body {
            padding: 16px;
            width: 100%;
            height: 400px;
            box-sizing: border-box;
            background-color: lightgray;
        }
    }
`;

export default LoadingPost;

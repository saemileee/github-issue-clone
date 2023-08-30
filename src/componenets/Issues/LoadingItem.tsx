import styled from 'styled-components';
import {StyledIssueListLayout} from './IssueItem';

interface LoadingItemProps {
    innerRef?: any;
}

const LoadingItem = ({innerRef}: LoadingItemProps) => {
    return (
        <StyledLoadingItem ref={innerRef}>
            <div className='left-container'>
                <div className='top-container'></div>
                <div className='bottom-container'></div>
            </div>
            <div className='right-container'></div>
        </StyledLoadingItem>
    );
};

const StyledLoadingItem = styled(StyledIssueListLayout)`
    div {
        border-radius: 6px;
    }

    .left-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .top-container {
            height: 21px;
            background-color: lightgray;
        }

        .bottom-container {
            height: 21px;
            background-color: lightgray;
        }
    }

    .right-container {
        flex-shrink: 0;
        width: 70px;
        height: 16px;
        background-color: lightgray;
    }
`;

export default LoadingItem;

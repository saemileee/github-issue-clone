import styled from 'styled-components';
import {StyledIssueItem} from './IssueItem';
import colorPalette from '../../styles/colorPalette.styled';

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

const StyledLoadingItem = styled(StyledIssueItem)`
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

    div {
        border-radius: 6px;
        animation: shine 1s ease-in-out infinite;
    }

    .left-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: relative;

        .top-container {
            height: 21px;
            background-color: ${colorPalette.textCode};
        }

        .bottom-container {
            height: 21px;
            background-color: ${colorPalette.textCode};
        }
    }

    .right-container {
        flex-shrink: 0;
        width: 70px;
        height: 16px;
        background-color: ${colorPalette.textCode};
    }
`;

export default LoadingItem;

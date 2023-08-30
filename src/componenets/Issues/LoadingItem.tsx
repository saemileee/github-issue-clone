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
            background-color: ${colorPalette.listItemBg};
        }

        .bottom-container {
            height: 21px;
            background-color: ${colorPalette.listItemBg};
        }
    }

    .right-container {
        flex-shrink: 0;
        width: 70px;
        height: 16px;
        background-color: ${colorPalette.listItemBg};
    }
`;

export default LoadingItem;

import styled from 'styled-components';
import {StyledIssueItem} from './IssueItem';
import colorPalette from '../../styles/colorPalette.styled';
import {StyledLoadingAnimationBar} from '../../styles/common/Loading.styled';

interface LoadingItemProps {
    innerRef?: any;
}

const LoadingItem = ({innerRef}: LoadingItemProps) => {
    return (
        <StyledLoadingItem ref={innerRef}>
            <StyledLoadingAnimationBar blur={'50px'} />
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

    div {
        border-radius: 6px;
    }

    .left-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: relative;

        .top-container {
            height: 21px;
            background-color: ${colorPalette.listItemBg};
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

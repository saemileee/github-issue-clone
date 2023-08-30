import styled from 'styled-components';
import {StyledIssueListContainer, StyledIssueListLayout} from './IssueList';
import LoadingItem from './LoadingItem';

const LOADING_COMP_COUNTS = 5;

const LoadingList = () => {
    return (
        <StyledLoadingListContainer>
            {new Array(LOADING_COMP_COUNTS).fill(0).map((_, idx: number) => (
                <StyledIssueListLayout>
                    <LoadingItem key={`loading-${idx}`} />
                </StyledIssueListLayout>
            ))}
        </StyledLoadingListContainer>
    );
};

const StyledLoadingListContainer = styled(StyledIssueListContainer)`
    width: 100%;
`;

export default LoadingList;

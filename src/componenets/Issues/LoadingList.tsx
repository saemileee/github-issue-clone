import LoadingItem from './LoadingItem';

import styled from 'styled-components';
import {StyledIssueListContainer, StyledIssueListLayout} from './IssueList';

const LOADING_COMP_COUNTS = 5;

const LoadingList = () => {
    return (
        <StyledLoadingListContainer>
            {new Array(LOADING_COMP_COUNTS).fill(0).map((_, idx: number) => (
                <StyledIssueListLayout key={`loading-${idx}`}>
                    <LoadingItem />
                </StyledIssueListLayout>
            ))}
        </StyledLoadingListContainer>
    );
};

const StyledLoadingListContainer = styled(StyledIssueListContainer)`
    width: 100%;
`;

export default LoadingList;

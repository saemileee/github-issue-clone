import {StyledIssueListContainer, StyledIssueListLayout} from './IssueList';
import LoadingItem from './LoadingItem';

const LOADING_COMP_COUNTS = 5;

const LoadingList = () => {
    return (
        <StyledIssueListContainer>
            {new Array(LOADING_COMP_COUNTS).fill(0).map((_, idx: number) => (
                <StyledIssueListLayout>
                    <LoadingItem key={`loading-${idx}`} />
                </StyledIssueListLayout>
            ))}
        </StyledIssueListContainer>
    );
};

export default LoadingList;

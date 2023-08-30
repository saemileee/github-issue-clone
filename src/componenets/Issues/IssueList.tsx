import IssueItem from '../../componenets/Issues/IssueItem';
import AdBanner from '../../componenets/Issues/AdBanner';
import * as Type from '../../types/issues';
import styled from 'styled-components';

interface issueListProps {
    issuesData?: Type.issueItem[];
}
const IDX_OF_AD_BANNER = 5;
const IssueList = ({issuesData}: issueListProps) => {
    return (
        <StyledIssueListContainer>
            {issuesData &&
                issuesData.map((issue: Type.issueItem, idx: number) =>
                    (idx + 1) % IDX_OF_AD_BANNER ? (
                        <StyledIssueList>
                            <IssueItem key={`issue-${issue.id}`} issue={issue} />
                        </StyledIssueList>
                    ) : (
                        <AdBanner key={`ad-banner-${idx}`} />
                    )
                )}
        </StyledIssueListContainer>
    );
};

export const StyledIssueListContainer = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;

export const StyledIssueListLayout = styled.li`
    padding: 12px;
    width: 100%;
    border-bottom: 1px solid gray;
    box-sizing: border-box;
    &:last-child {
        border-bottom: none;
    }
`;

const StyledIssueList = styled(StyledIssueListLayout)`
    &:hover {
        background-color: lightgray;
    }
    .left-container {
        .top-container {
            cursor: pointer;

            &:hover {
                color: blue;
            }
        }
    }
`;

export default IssueList;

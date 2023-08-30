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
                        <IssueItem key={`issue-${issue.id}`} issue={issue} />
                    ) : (
                        <AdBanner key={`ad-banner-${idx}`} />
                    )
                )}
        </StyledIssueListContainer>
    );
};

const StyledIssueListContainer = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;

export default IssueList;

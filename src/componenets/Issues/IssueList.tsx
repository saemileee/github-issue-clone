import IssueItem from '../../componenets/Issues/IssueItem';
import AdBanner from '../../componenets/Issues/AdBanner';
import * as Type from '../../types/issues';
import styled from 'styled-components';
import colorPalette from '../../styles/colorPalette.styled';

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
                        <StyledIssueList key={`issue-${issue.id}`}>
                            <IssueItem issue={issue} />
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
    padding: 16px;
    width: 100%;
    border-bottom: 1px solid ${colorPalette.listBorder};
    box-sizing: border-box;
    list-style: none;
`;

const StyledIssueList = styled(StyledIssueListLayout)`
    &:hover {
        background-color: ${colorPalette.listItemHoverBg};
    }
    .left-container {
        .top-container {
            cursor: pointer;

            &:hover {
                color: ${colorPalette.highLighting};
            }
        }
    }
`;

export default IssueList;

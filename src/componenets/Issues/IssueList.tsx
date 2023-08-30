import IssueItem from '../../componenets/Issues/IssueItem';
import AdBanner from '../../componenets/Issues/AdBanner';
import * as Type from '../../types/issues';
import styled from 'styled-components';

interface issueListProps {
    issuesData: Type.issueItem[];
}
const IDX_OF_AD_BANNER = 5;
const IssueList = ({issuesData}: issueListProps) => {
    return (
        <StyledIssuesList>
            {issuesData.map((issue: Type.issueItem, idx: number) =>
                (idx + 1) % IDX_OF_AD_BANNER ? (
                    <IssueItem key={`issue-${issue.id}`} issue={issue} />
                ) : (
                    <AdBanner key={`ad-banner-${idx}`} />
                )
            )}
        </StyledIssuesList>
    );
};

const StyledIssuesList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;

    li {
        padding: 12px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid gray;

        .left-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            .top-container {
                display: inline;
                cursor: pointer;

                .number {
                    margin-right: 6px;
                }
                .title {
                    font-size: 18px;
                    font-weight: 600;
                }
                &:hover {
                    color: blue;
                }
            }
            .bottom-container {
                display: flex;
                gap: 6px;
                color: gray;
            }
        }

        .right-container {
            flex-shrink: 0;
            font-size: 14px;
            color: gray;
            span {
                font-weight: 500;
            }
        }

        &:hover {
            background-color: lightgray;
        }
    }
`;

export default IssueList;

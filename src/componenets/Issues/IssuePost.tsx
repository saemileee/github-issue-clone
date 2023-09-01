import * as Type from '../../types/issues';

import IssueItem from '../../componenets/Issues/IssueItem';

import styled from 'styled-components';
import colorPalette from '../../styles/colorPalette.styled';

import MarkdownPreview from '@uiw/react-markdown-preview';

interface IssuePostProps {
    issueInfo: Type.issuePost;
}

const IssuePost = ({issueInfo}: IssuePostProps) => {
    const {number, title, user, created_at, comments, body} = issueInfo;

    return (
        <StyledIssuePostContainer>
            <div className='post-top-container'>
                <span className='user-avater-container'>
                    <img alt='user_avater' src={user.avatar_url} />
                </span>
                <IssueItem issue={{number, title, user, created_at, comments}} />
            </div>
            <div className='post-body-container'>
                <MarkdownPreview source={body} />
            </div>
        </StyledIssuePostContainer>
    );
};

export const StyledIssuePostContainer = styled.div`
    max-width: 768px;
    border: 1px solid ${colorPalette.listBorder};
    border-radius: 12px;
    overflow-wrap: break-word;
    box-sizing: border-box;

    .post-top-container {
        display: flex;
        padding: 16px;
        gap: 16px;
        border-bottom: 1px solid ${colorPalette.listBorder};
        .user-avater-container {
            align-self: center;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            img {
                height: 100%;
            }
        }
    }

    .post-body-container {
        padding: 16px;
    }
`;

export default IssuePost;

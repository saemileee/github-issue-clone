import {useNavigate} from 'react-router-dom';
import * as Type from '../../types/issues';
import ROUTES from '../../constants/routes';
import styled from 'styled-components';

interface IssueItemProps {
    issue: Type.issueItem;
}

const IssueItem = ({issue}: IssueItemProps) => {
    const navigate = useNavigate();
    const {number, title, user, created_at, comments} = issue;

    const localizedCreatedAt = new Date(created_at).toLocaleDateString();

    const navigateToPostPage = () => {
        navigate(`${ROUTES.ISSUES}/${number}`);
    };
    return (
        <StyledIssueItem>
            <div className='left-container'>
                <div className='top-container' onClick={navigateToPostPage}>
                    <span className='number'>#{number}</span>
                    <span className='title'>{title}</span>
                </div>
                <div className='bottom-container'>
                    <label>
                        작성자 : <span>{user.login}</span>
                    </label>
                    /
                    <label>
                        작성일 : <span>{localizedCreatedAt}</span>
                    </label>
                </div>
            </div>
            <div className='right-container'>
                <label>
                    코멘트 <span>{comments}</span>
                </label>
            </div>
        </StyledIssueItem>
    );
};

export const StyledIssueItem = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    .left-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .top-container {
            display: inline;

            .number {
                margin-right: 6px;
            }
            .title {
                font-size: 18px;
                font-weight: 600;
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
`;

export default IssueItem;

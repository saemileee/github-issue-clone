import {useNavigate} from 'react-router-dom';
import * as Type from '../../types/issues';
import ROUTES from '../../constants/routes';

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
        <li>
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
        </li>
    );
};

export default IssueItem;

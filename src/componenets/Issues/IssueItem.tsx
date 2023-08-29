import {useNavigate} from 'react-router-dom';
import * as Type from '../../types/issues';
import ROUTES from '../../constants/routes';

interface IssueItemProps {
    issue: Type.issueItem;
}

const IssueItem = ({issue}: IssueItemProps) => {
    const navigate = useNavigate();
    const {number, title, user, created_at, comments} = issue;

    const navigateToPostPage = () => {
        navigate(`${ROUTES.ISSUES}/${number}`);
    };
    return (
        <li onClick={navigateToPostPage}>
            <div>
                <span>{number}</span>
                <span>{title}</span>
            </div>
            <div>
                <span>작성자</span>
                <span>{user.login}</span>
                <span>작성일</span>
                <span>{created_at}</span>
            </div>
            <div>
                <span>코멘트</span>
                <span>{comments}</span>
            </div>
        </li>
    );
};

export default IssueItem;

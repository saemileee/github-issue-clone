import * as Type from '../../types/issues';

interface IssueItemProps {
    issue: Type.issue;
}

const IssueItem = ({issue}: IssueItemProps) => {
    const {number, title, user, created_at, comments} = issue;
    return (
        <li>
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

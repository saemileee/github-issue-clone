import * as Type from '../../types/issues';
import IssueItem from '../../componenets/Issues/IssueItem';

interface IssuePostProps {
    issueInfo: Type.issuePost;
}

const IssuePost = ({issueInfo}: IssuePostProps) => {
    const {number, title, user, created_at, comments, body} = issueInfo;
    return (
        <>
            <div>
                <span>
                    <img alt='user_avater' src={user.avatar_url} />
                </span>
                <div>
                    <IssueItem issue={{number, title, user, created_at, comments}} />
                </div>
            </div>
            <div>{body}</div>
        </>
    );
};

export default IssuePost;

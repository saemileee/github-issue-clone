import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import IssuePost from '../../componenets/Issues/IssuePost';
import LoadingPost from '../../componenets/Issues/LoadingPost';
import NotFound from '../../pages/NotFound';
import useIssuePost from '../../controllers/useIssuePost';

const IssuePostContainer = () => {
    const params = useParams();
    const postId = Number(params.id);

    const {issuePost, getIssue} = useIssuePost();
    const {isLoading, issueInfo, errorStatus} = issuePost;

    useEffect(() => {
        getIssue(postId);
    }, [getIssue, postId]);

    if (errorStatus) return <NotFound errorStatus={errorStatus} />;

    return (
        <>
            {isLoading && <LoadingPost />}
            {!isLoading && !errorStatus && <IssuePost issueInfo={issueInfo} />}
        </>
    );
};

export default IssuePostContainer;

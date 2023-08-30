import {useEffect, useState} from 'react';
import * as Fetcher from '../../apis/Issues';
import * as Type from '../../types/issues';
import IssuePost from '../../componenets/Issues/IssuePost';
import {useParams} from 'react-router-dom';
import LoadingPost from '../../componenets/Issues/LoadingPost';
import NotFound from '../../pages/NotFound';
import {AxiosError} from 'axios';
import {INVALID_ERROR_MSG} from '../../constants/messages';

const IssuePostContainer = () => {
    const params = useParams();
    const postId = parseInt(params.id!);

    const [errorStatus, setErrorStatus] = useState<number | string>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [issueInfo, setIssueInfo] = useState<Type.issuePost>({
        number: 0,
        title: '',
        user: {
            login: '',
            avatar_url: '',
        },
        created_at: '',
        comments: 0,
        body: '',
    });

    const getIssueInfo = async () => {
        try {
            const res = await Fetcher.getIssue(postId);
            setIssueInfo(res.data);
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                setErrorStatus(e.response.status);
            } else {
                console.error(e);
                setErrorStatus(INVALID_ERROR_MSG);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getIssueInfo();
    }, []);

    if (errorStatus) return <NotFound errorStatus={errorStatus} />;

    return (
        <>
            {isLoading && <LoadingPost />}
            {!isLoading && !errorStatus && <IssuePost issueInfo={issueInfo} />}
        </>
    );
};

export default IssuePostContainer;

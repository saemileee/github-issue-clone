import {useEffect, useState} from 'react';
import {AxiosError} from 'axios';
import {useParams} from 'react-router-dom';
import * as Fetcher from '../../apis/Issues';
import * as Type from '../../types/issues';
import {INVALID_ERROR_MSG} from '../../constants/messages';

import IssuePost from '../../componenets/Issues/IssuePost';
import LoadingPost from '../../componenets/Issues/LoadingPost';
import NotFound from '../../pages/NotFound';

const IssuePostContainer = () => {
    const params = useParams();
    const postId = parseInt(params.id!);

    const {issueState, getIssueInfo} = IssuePostController(postId);
    const {isLoading, issueInfo, errorStatus} = issueState;

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

const IssuePostController = (postId: number) => {
    const [issueState, setIssueState] = useState<Type.issuePostState>({
        isLoading: true,
        errorStatus: 0,
        issueInfo: {
            number: 0,
            title: '',
            user: {
                login: '',
                avatar_url: '',
            },
            created_at: '',
            comments: 0,
            body: '',
        },
    });

    const getIssueInfo = async () => {
        try {
            const res = await Fetcher.getIssue(postId);
            setIssueState((prev: Type.issuePostState) => ({...prev, issueInfo: res.data}));
        } catch (e) {
            const error = e as AxiosError;
            setIssueState((prev: Type.issuePostState) => ({
                ...prev,
                errorStatus: error.response?.status ?? INVALID_ERROR_MSG,
            }));
        } finally {
            setIssueState((prev: Type.issuePostState) => ({...prev, isLoading: false}));
        }
    };
    return {issueState, getIssueInfo};
};

export default IssuePostContainer;

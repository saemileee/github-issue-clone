import {useEffect, useState} from 'react';
import * as Fetcher from '../../apis/Issues';
import * as Type from '../../types/issues';
import IssuePost from '../../componenets/Issues/IssuePost';
import {useParams} from 'react-router-dom';

const IssuePostContainer = () => {
    const params = useParams();
    const postId = parseInt(params.id!);

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
            console.error(e);
        }
    };

    useEffect(() => {
        getIssueInfo();
    }, []);

    return (
        <>
            <IssuePost issueInfo={issueInfo} />
        </>
    );
};

export default IssuePostContainer;

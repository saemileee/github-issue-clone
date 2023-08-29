import {useEffect, useState} from 'react';
import IssueItem from '../../componenets/Issues/IssueItem';
import * as Fetcher from '../../apis/Issues';
import * as Type from '../../types/issues';

const IssuesContainer = () => {
    const [issues, setIssues] = useState<Type.issues[] | []>([]);

    const getIssues = async (page: number) => {
        try {
            const res = await Fetcher.getIssues(page);
            setIssues((prev: Type.issues[]) => [...prev, res.data]);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getIssues(0);
    }, []);

    return (
        <>
            <h1>IssuesContainer</h1>
            <IssueItem />
        </>
    );
};

export default IssuesContainer;

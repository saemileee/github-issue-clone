import {useEffect, useState} from 'react';
import IssueItem from '../../componenets/Issues/IssueItem';
import * as Fetcher from '../../apis/Issues';
import * as Type from '../../types/issues';

const IssuesContainer = () => {
    const [pageCount, setPageCount] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [issues, setIssues] = useState<Type.issue[] | []>([]);

    const getIssues = async (page: number) => {
        try {
            const res = await Fetcher.getIssues(page);
            setIssues((prev: Type.issue[]) => [...prev, ...res.data]);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getIssues(1);
    }, []);

    const getNextPage = () => {
        const newPageCount = pageCount + 1;
        setPageCount(newPageCount);
        getIssues(newPageCount);
    };

    if (isLoading) return <div>로딩 중</div>;

    return (
        <>
            <h1>IssuesContainer</h1>
            {issues.map((issue: Type.issue) => {
                const {id, number, title, user, created_at, comments} = issue;
                return (
                    <li key={`issue-${id}`}>
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
            })}
            <IssueItem />
            <button onClick={getNextPage}>next page</button>
        </>
    );
};

export default IssuesContainer;

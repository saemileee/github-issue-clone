import {useEffect, useState} from 'react';
import IssueItem from '../../componenets/Issues/IssueItem';
import * as Fetcher from '../../apis/Issues';
import * as Type from '../../types/issues';
import AdBanner from '../../componenets/Issues/AdBanner';

const IDX_OF_AD_BANNER = 5;

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
            <ul>
                {issues.map((issue: Type.issue, idx: number) =>
                    (idx + 1) % IDX_OF_AD_BANNER ? (
                        <IssueItem key={`issue-${issue.id}`} issue={issue} />
                    ) : (
                        <AdBanner key={`ad-banner-${idx}`} />
                    )
                )}
            </ul>
            <button onClick={getNextPage}>next page</button>
        </>
    );
};

export default IssuesContainer;

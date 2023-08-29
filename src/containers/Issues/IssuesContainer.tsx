import {RefObject, useEffect, useState} from 'react';
import IssueItem from '../../componenets/Issues/IssueItem';
import * as Fetcher from '../../apis/Issues';
import * as Type from '../../types/issues';
import AdBanner from '../../componenets/Issues/AdBanner';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import LoadingItem from '../../componenets/Issues/LoadingItem';

const IDX_OF_AD_BANNER = 5;

const IssuesContainer = () => {
    const [pageCount, setPageCount] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [issues, setIssues] = useState<Type.issueItem[] | []>([]);
    const [moreData, setMoreData] = useState(true);

    const getIssues = async (page: number) => {
        try {
            setMoreData(false);
            const res = await Fetcher.getIssues(page);
            setIssues(prev => [...prev, ...res.data]);
            setMoreData(true);
        } catch (e) {
            console.error(e);
            setMoreData(false);
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

    const getNextPageRef: RefObject<HTMLElement | HTMLLIElement> = useInfiniteScroll(() => {
        getNextPage();
    });

    if (isLoading) return <LoadingItem />;

    return (
        <>
            <h1>IssuesContainer</h1>
            <ul>
                {issues.map((issue: Type.issueItem, idx: number) =>
                    (idx + 1) % IDX_OF_AD_BANNER ? (
                        <IssueItem key={`issue-${issue.id}`} issue={issue} />
                    ) : (
                        <AdBanner key={`ad-banner-${idx}`} />
                    )
                )}
            </ul>
            {moreData && <LoadingItem innerRef={getNextPageRef} />}
        </>
    );
};

export default IssuesContainer;

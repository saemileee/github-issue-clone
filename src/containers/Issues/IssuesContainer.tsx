import {RefObject, useEffect} from 'react';
import IssueItem from '../../componenets/Issues/IssueItem';
import * as Fetcher from '../../apis/Issues';
import * as Type from '../../types/issues';
import AdBanner from '../../componenets/Issues/AdBanner';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import LoadingItem from '../../componenets/Issues/LoadingItem';
import Error from '../../componenets/Error';
import {useRecoilState} from 'recoil';
import {issuesState} from '../../contexts/IssuesAtom';

const IDX_OF_AD_BANNER = 5;

const IssuesContainer = () => {
    const [issues, setIssues] = useRecoilState(issuesState);
    const {isLoading, pageCount, moreData, issues: issuesData} = issues;

    const getIssues = async (page: number) => {
        try {
            setIssues((prev: Type.issuesState) => ({...prev, moreData: false}));
            const res = await Fetcher.getIssues(page);
            setIssues((prev: Type.issuesState) => ({
                ...prev,
                issues: [...prev.issues, ...res.data],
            }));
            if (!res.data.length) {
                setIssues((prev: Type.issuesState) => ({...prev, moreData: false}));
            }
            setIssues((prev: Type.issuesState) => ({...prev, moreData: true}));
        } catch (e) {
            console.error(e);
            return <Error />;
        } finally {
            setIssues((prev: Type.issuesState) => ({...prev, isLoading: false}));
        }
    };

    useEffect(() => {
        getIssues(1);
    }, []);

    const getNextPage = () => {
        const newPageCount = pageCount + 1;
        setIssues((prev: Type.issuesState) => ({...prev, pageCount: newPageCount}));
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
                {issuesData.map((issue: Type.issueItem, idx: number) =>
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

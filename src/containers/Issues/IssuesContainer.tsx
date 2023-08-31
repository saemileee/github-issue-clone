import {RefObject, useEffect} from 'react';
import {AxiosError} from 'axios';
import * as Fetcher from '../../apis/Issues';
import * as Type from '../../types/issues';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

import {useRecoilState, useRecoilValue} from 'recoil';
import {issuesStateAtom} from '../../contexts/IssuesAtom';

import IssueList from '../../componenets/Issues/IssueList';
import LoadingList from '../../componenets/Issues/LoadingList';
import NotFound from '../../pages/NotFound';
import {INVALID_ERROR_MSG} from '../../constants/messages';
import LoadingSpinner from '../../componenets/common/LoadingSpinner';

import styled from 'styled-components';
import colorPalette from '../../styles/colorPalette.styled';

const IssuesContainer = () => {
    const issuesState = useRecoilValue(issuesStateAtom);
    const {isLoading, errorStatus, moreData, issues: issuesData} = issuesState;
    // 기존 issues가 있으면 기존 issues 리스트를 보여주기 위함
    const isRefetchNeeded = !issuesData.length;

    const {getIssues, getNextPage} = IssuesController();

    useEffect(() => {
        isRefetchNeeded && getIssues(1);
    }, []);

    const getNextPageRef: RefObject<HTMLElement | HTMLLIElement> = useInfiniteScroll(() => {
        getNextPage();
    });

    if (errorStatus) return <NotFound errorStatus={errorStatus} />;

    return (
        <StyledIssuesContainer>
            <div className='head'>Issues</div>
            {issuesData.length > 0 && <IssueList issuesData={issuesData} />}
            {isLoading && isRefetchNeeded && <LoadingList />}
            {isLoading && !isRefetchNeeded && <LoadingSpinner />}
            {moreData && <LoadingSpinner innerRef={getNextPageRef} />}
        </StyledIssuesContainer>
    );
};

const IssuesController = () => {
    const [issuesState, setIssuesState] = useRecoilState(issuesStateAtom);

    const getIssues = async (page: number) => {
        try {
            setIssuesState((prev: Type.issuesState) => ({...prev, moreData: false}));
            const res = await Fetcher.getIssues(page);
            // 마지막 불러온 페이지가 빈 (마지막 페이지 +1 )페이지인 경우 더이상 무한스크롤 안되게 세팅
            if (!res.data.length) {
                setIssuesState((prev: Type.issuesState) => ({
                    ...prev,
                    moreData: false,
                }));
            }
            setIssuesState((prev: Type.issuesState) => {
                const newIssues = res.data;
                // 서버 통신 전 코멘트 정렬이 변경될 경우 기존 배열 필터링하고 새로운 값 받기
                const filteredIssues = prev.issues.filter(
                    preIssue =>
                        !newIssues.some(
                            (newIssue: Type.issueItem) => newIssue.number === preIssue.number
                        )
                );
                return {
                    ...prev,
                    moreData: true,
                    issues: [...filteredIssues, ...newIssues],
                };
            });
        } catch (e) {
            const error = e as AxiosError;
            setIssuesState((prev: Type.issuesState) => ({
                ...prev,
                errorStatus: error.response?.status ?? INVALID_ERROR_MSG,
            }));
        } finally {
            setIssuesState((prev: Type.issuesState) => ({...prev, isLoading: false}));
        }
    };

    const getNextPage = () => {
        const newPageCount = issuesState.pageCount + 1;
        setIssuesState((prev: Type.issuesState) => ({
            ...prev,
            isLoading: true,
            pageCount: prev.pageCount + 1,
        }));
        getIssues(newPageCount);
    };

    return {getIssues, getNextPage};
};

const StyledIssuesContainer = styled.div`
    max-width: 768px;
    border: 1px solid ${colorPalette.listBorder};
    border-radius: 12px;
    overflow: hidden;

    .head {
        min-width: 768px;
        padding: 16px;
        border-bottom: 1px solid ${colorPalette.listBorder};
        background-color: ${colorPalette.listItemBg};
        font-size: 16px;
        font-weight: 600;
    }
`;
export default IssuesContainer;

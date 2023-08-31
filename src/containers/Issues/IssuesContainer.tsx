import {RefObject, useEffect, useState} from 'react';
import {AxiosError} from 'axios';
import * as Fetcher from '../../apis/Issues';
import * as Type from '../../types/issues';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

import {useRecoilState} from 'recoil';
import {issuesState} from '../../contexts/IssuesAtom';

import IssueList from '../../componenets/Issues/IssueList';
import LoadingList from '../../componenets/Issues/LoadingList';
import NotFound from '../../pages/NotFound';
import {INVALID_ERROR_MSG} from '../../constants/messages';
import LoadingSpinner from '../../componenets/common/LoadingSpinner';

import styled from 'styled-components';
import colorPalette from '../../styles/colorPalette.styled';

const IssuesContainer = () => {
    const [errorStatus, setErrorStatus] = useState<number | string>(0);
    const [issues, setIssues] = useRecoilState(issuesState);
    const {isLoading, pageCount, moreData, issues: issuesData} = issues;
    // 기존 issues가 있으면 기존 issues 리스트를 보여주기 위함
    const isRefetchNeeded = !issuesData.length;

    const getIssues = async (page: number) => {
        try {
            setIssues((prev: Type.issuesState) => ({...prev, moreData: false}));
            const res = await Fetcher.getIssues(page);
            // 마지막 불러온 페이지가 빈 (마지막 페이지 +1 )페이지인 경우 더이상 무한스크롤 안되게 세팅
            if (!res.data.length) {
                setIssues((prev: Type.issuesState) => ({
                    ...prev,
                    moreData: false,
                }));
            }
            setIssues((prev: Type.issuesState) => {
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
            if (e instanceof AxiosError && e.response) {
                setErrorStatus(e.response.status);
            } else {
                console.error(e);
                setErrorStatus(INVALID_ERROR_MSG);
            }
        } finally {
            setIssues((prev: Type.issuesState) => ({...prev, isLoading: false}));
        }
    };

    useEffect(() => {
        isRefetchNeeded && getIssues(1);
    }, []);

    const getNextPage = () => {
        const newPageCount = pageCount + 1;
        setIssues((prev: Type.issuesState) => ({
            ...prev,
            isLoading: true,
            pageCount: newPageCount,
        }));
        getIssues(newPageCount);
    };

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

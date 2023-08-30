import {RefObject, useEffect, useState} from 'react';

import * as Fetcher from '../../apis/Issues';
import * as Type from '../../types/issues';

import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import LoadingItem from '../../componenets/Issues/LoadingItem';
import {useRecoilState} from 'recoil';
import {issuesState} from '../../contexts/IssuesAtom';
import styled from 'styled-components';
import IssueList from '../../componenets/Issues/IssueList';
import LoadingList from '../../componenets/Issues/LoadingList';

import colorPalette from '../../styles/colorPalette.styled';
import NotFound from '../../pages/NotFound';
import {AxiosError} from 'axios';
import {INVALID_ERROR_MSG} from '../../constants/messages';

const IssuesContainer = () => {
    const [errorStatus, setErrorStatus] = useState<number | string>(0);
    const [issues, setIssues] = useRecoilState(issuesState);
    const {isLoading, pageCount, moreData, issues: issuesData} = issues;
    const isRefetchNeeded = !issuesData.length;

    const getIssues = async (page: number) => {
        try {
            setIssues((prev: Type.issuesState) => ({...prev, moreData: false}));
            const res = await Fetcher.getIssues(page);
            if (!res.data.length) {
                setIssues((prev: Type.issuesState) => ({
                    ...prev,
                    moreData: false,
                }));
            }
            setIssues((prev: Type.issuesState) => ({
                ...prev,
                moreData: true,
                issues: [...prev.issues, ...res.data],
            }));
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
        setIssues((prev: Type.issuesState) => ({...prev, pageCount: newPageCount}));
        getIssues(newPageCount);
    };

    const getNextPageRef: RefObject<HTMLElement | HTMLLIElement> = useInfiniteScroll(() => {
        getNextPage();
    });

    if (errorStatus) return <NotFound errorStatus={errorStatus} />;

    return (
        <StyledIssuesContainer>
            <div className='head'>Issues</div>
            {isLoading ? <LoadingList /> : <IssueList issuesData={issuesData} />}
            {moreData && <LoadingItem innerRef={getNextPageRef} />}
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

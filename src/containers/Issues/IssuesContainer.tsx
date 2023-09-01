import {RefObject, useEffect} from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

import {useRecoilValue} from 'recoil';
import {issuesStateAtom} from '../../contexts/IssuesAtom';

import IssueList from '../../componenets/Issues/IssueList';
import LoadingList from '../../componenets/Issues/LoadingList';
import NotFound from '../../pages/NotFound';
import LoadingSpinner from '../../componenets/common/LoadingSpinner';

import styled from 'styled-components';
import colorPalette from '../../styles/colorPalette.styled';
import useIssues from '../../controllers/useIssues';

const IssuesContainer = () => {
    const issuesState = useRecoilValue(issuesStateAtom);
    const {isRefetchNeeded, isLoading, errorStatus, moreData, issues: issuesData} = issuesState;

    const {getIssues, getNextPage} = useIssues();

    useEffect(() => {
        isRefetchNeeded && getIssues(1);
    }, [getIssues, isRefetchNeeded]);

    const getNextPageRef: RefObject<HTMLElement | HTMLLIElement> = useInfiniteScroll(() => {
        getNextPage();
    });

    if (errorStatus) return <NotFound errorStatus={errorStatus} />;

    return (
        <StyledIssuesContainer>
            <div className='head'>Issues</div>
            {issuesData.length > 0 ? <IssueList issuesData={issuesData} /> : <LoadingList />}
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

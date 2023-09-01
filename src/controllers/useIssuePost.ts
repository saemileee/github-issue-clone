import * as api from '../apis/Issues';
import {AxiosError} from 'axios';
import {useCallback, useState} from 'react';
import * as Type from '../types/issues';
import useIssues from './useIssues';
import {INVALID_ERROR_MSG} from '../constants/messages';

const useIssuePost = () => {
    const [issuePost, setIssuePost] = useState<Type.issuePostState>({
        isLoading: true,
        errorStatus: 0,
        issueInfo: {
            number: 0,
            title: '',
            user: {
                login: '',
                avatar_url: '',
            },
            created_at: '',
            comments: 0,
            body: '',
        },
    });

    const {updateIssues} = useIssues();

    const getIssue = useCallback(
        async (id: number) => {
            try {
                const res = await api.getIssue(id);
                const issueInfo = res.data;
                setIssuePost(prev => ({...prev, issueInfo}));

                if (res.data.state !== 'open') {
                    const error = new AxiosError();
                    setIssuePost(prev => ({
                        ...prev,
                        errorStatus: error.response?.status ?? 'open 상태가 아닙니다',
                    }));
                }

                // 가져온 정보가 업데이트 된 정보일 수 있기 때문에 이슈 목록 업데이트
                updateIssues(issueInfo);
            } catch (e) {
                const error = e as AxiosError;
                setIssuePost(prev => ({
                    ...prev,
                    errorStatus: error.response?.status ?? INVALID_ERROR_MSG,
                }));
            } finally {
                setIssuePost(prev => ({...prev, isLoading: false}));
            }
        },
        [updateIssues]
    );

    return {issuePost, getIssue};
};

export default useIssuePost;

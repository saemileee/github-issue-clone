import axiosIssuesInstance from './instances';
const ISSUES_PATH = '/issues';

export const getIssues = async (page: number, perPage = 24, state = 'open', sort = 'comments') => {
    const response = await axiosIssuesInstance.get(
        `${ISSUES_PATH}?page=${page}&per_page=${perPage}&state=${state}&sort=${sort}`
    );
    return response;
};

export const getIssue = async (postId: number) => {
    const response = await axiosIssuesInstance.get(`${ISSUES_PATH}/${postId}`);
    return response;
};

import axios from 'axios';
import {OWNER, REPO} from '../constants/repoInfo';

export const axiosIssuesInstance = axios.create({
    baseURL: `https://api.github.com/repos/${OWNER}/${REPO}`,
    timeout: 4000,
    headers: {
        Authorization: process.env.REACT_APP_GIT_TOKEN,
    },
});

axiosIssuesInstance.interceptors.request.use(
    config => config,
    err => err
);

axiosIssuesInstance.interceptors.response.use(
    config => config,
    err => err
);

export default axiosIssuesInstance;

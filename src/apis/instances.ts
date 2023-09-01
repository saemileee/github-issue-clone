import axios from 'axios';
import {OWNER, REPO} from '../constants/api';

export const axiosIssuesInstance = axios.create({
    baseURL: `https://api.github.com/repos/${OWNER}/${REPO}`,
    timeout: 4000,
    headers: {
        Authorization: process.env.REACT_APP_GIT_TOKEN,
    },
});

axiosIssuesInstance.interceptors.request.use(
    config => config,
    err => Promise.reject(err)
);

export default axiosIssuesInstance;

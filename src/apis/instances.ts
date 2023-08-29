import axios from 'axios';

const OWNER = 'facebook';
const REPO = 'react';

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

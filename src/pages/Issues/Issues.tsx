import {useEffect} from 'react';
import * as Fetcher from '../../apis/Issues';

const Issues = () => {
    const fetchIssues = async () => {
        try {
            const res = await Fetcher.getIssues(1, 5);
            console.log(res);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        fetchIssues();
    }, []);
    return (
        <>
            <h1>Issue List</h1>
        </>
    );
};

export default Issues;

import {useReducer, useEffect, Reducer} from 'react';
import {INVALID_ERROR_MSG} from '../constants/messages';

interface AsyncState<Data> {
    loading: boolean;
    data: Data | null;
    error: Error | null;
}

type AsyncAction<Data> =
    | {type: 'LOADING'}
    | {type: 'SUCCESS'; data: Data}
    | {type: 'ERROR'; error: Error};

const reducer = <Data>(state: AsyncState<Data>, action: AsyncAction<Data>): AsyncState<Data> => {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null,
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
            };
        default:
            throw new Error(`Unhandled action type: ${action}`);
    }
};

const useAsync = <Data>(
    callback: () => Promise<Data>,
    deps: React.DependencyList = [],
    skip = false
): [AsyncState<Data>, () => Promise<void>] => {
    const [state, dispatch] = useReducer<Reducer<AsyncState<Data>, AsyncAction<Data>>>(reducer, {
        loading: false,
        data: null,
        error: null,
    });

    const fetchData = async () => {
        dispatch({type: 'LOADING'});
        try {
            const data = await callback();
            dispatch({type: 'SUCCESS', data});
        } catch (e: unknown) {
            if (e instanceof Error) {
                dispatch({type: 'ERROR', error: e});
            }
            throw new Error(INVALID_ERROR_MSG);
        }
    };

    useEffect(() => {
        if (skip) return;
        fetchData();
        // eslint 설정을 다음 줄에서만 비활성화
        // eslint-disable-next-line
    }, deps);

    return [state, fetchData];
};

export default useAsync;

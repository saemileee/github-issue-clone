import {atom} from 'recoil';
import * as Type from '../types/issues';

export const issuesState = atom<Type.issuesState>({
    key: 'issuesState',
    default: {isLoading: true, pageCount: 1, moreData: true, issues: []},
});

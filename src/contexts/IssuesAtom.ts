import {atom} from 'recoil';
import * as Type from '../types/issues';

export const issuesStateAtom = atom<Type.issuesState>({
    key: 'issuesStateAtom',
    default: {isLoading: true, errorStatus: 0, pageCount: 1, moreData: true, issues: []},
});

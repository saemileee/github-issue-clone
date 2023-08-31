export interface issueItem {
    id?: number;
    number: number;
    title: string;
    user: {
        login: string;
    };
    created_at: string;
    comments: number;
}

export interface issuePost {
    number: number;
    title: string;
    user: {
        login: string;
        avatar_url: string;
    };
    created_at: string;
    comments: number;
    body: string;
}

export interface issuesState {
    isLoading: boolean;
    errorStatus: number | string;
    pageCount: number;
    moreData: boolean;
    issues: issueItem[] | [];
}

export interface issuePostState {
    isLoading: boolean;
    errorStatus: number | string;
    issueInfo: issuePost;
}

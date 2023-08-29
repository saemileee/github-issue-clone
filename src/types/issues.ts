interface user {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

interface label {
    id: number;
    node_id: string;
    url: string;
    name: string;
    description: string;
    color: string;
    default: boolean;
}

interface milestone {
    url: string;
    html_url: string;
    labels_url: string;
    id: number;
    node_id: string;
    number: number;
    state: string;
    title: string;
    description: string;
    creator: user;
    open_issues: number;
    closed_issues: number;
    created_at: string;
    updated_at: string;
    closed_at: string;
    due_on: string;
}

interface pullRequest {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
}

export interface issue {
    id: number;
    node_id: string;
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    number: number;
    state: string;
    title: string;
    body: string;
    user: user;
    labels: label[];
    assignee: user;
    assignees: user[];
    milestone: milestone;
    locked: boolean;
    active_lock_reason: string;
    comments: number;
    pull_request: pullRequest;
    closed_at: null | string;
    created_at: string;
    updated_at: string;
    closed_by: user;
    author_association: string;
    state_reason: string;
}

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

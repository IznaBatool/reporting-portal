export interface IworkspaceState {
    workspaces: object[],
    currentWorkspace: WorkspaceTypes | null,
    workspaceLogo: string | null,
}

export interface IworkspaceTypes {
    workspace: object[],
}

export interface AddWorkspacePayload {
    email: string,
    name: string,
    address: string | null,
    logo: string | null,
    description: string
}

export interface AddWorkspaceResponse {
    message: string,
}
export interface UpdateWorkspacePayload {
    id: number,
    email: string,
    name: string,
    address: string | null,
    logo: string | null,
    description: string
}

export interface UpdateWorkspaceResponse {
    message: string,
}
export interface FetchWorkspacePayload {
    id: number
}

export interface WorkspaceTypes {
    id: number,
    name: string,
    description: string,
    address: string,
    email: string,
    logo: string,
    createdAt: string
}
export interface FetchWorkspaceResponse {
    message: string,
    data: WorkspaceTypes;
}
export interface AuthState {
    user: User | null,
    workspaces: Workspace[] | null,
    token: object[],
    loading: boolean,
    error: string | null
    accessToken: string,
    refreshToken: string,
    selectedWorkspace: Workspace | null | undefined,
}

export interface RefreshTokenResponse {
    accessToken: string,
    refreshToken: string
}

export interface LogoutState {
    token: object[],
}

export interface User {
    id: number,
    avatar: string | null,
    firstName: string,
    lastName: string,
    currentRole: number,
    professionalTitle: string | null,
    businessFunction: string | null,
    phone: string | null,
    email: string,
    status: string,
    role: string,
    groupId: string | null,
    operator: boolean,
    xero_oauth: object[],
    workspace: Workspace[] | null,
    permissions: string[]
}

export interface Workspace {
    createdAt: string,
    description: string,
    id: number,
    logo: string | null,
    name: string,
    roleId: number,
    roleName: string,
}

export interface LoginPayload {
    email: string,
    password: string
}

export interface LoginResponse {
    data: UserInfo
}

interface UserInfo {
    token: string,
    userInfo: User
}

export interface ResetPasswordPayload {
    email: string,
}

export interface ResetPasswordResponse {
    message: string,
}

export interface SetPasswordPayload {
    email: string | null,
    password: string,
    passwordConfirmation: string
}

export interface SetPasswordResponse {
    message: string,
}

export interface SetLogoPayload {
    avatar: string | null
}

export interface SetLogoResponse {
    message: string,
}

export interface ProfileDetailResponse {
    message: string,
}

export interface ProfileDetailPayload {
    firstName: string,
    lastName: string,
    email: string,
    professionalTitle: string,
    businessFunction: string,
    role: string,
    phone: string | null
}

export interface UpdatePasswordPayload {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

export interface UpdatePasswordResponse {
    message: string,
}

export interface LogoutResponse {
    message: string,
}

export interface WorkspacePermissionsPayload {
    workspaceId: number,
    roleId: number
}

export interface WorkspacePermissionsResponse {
    message: string
}
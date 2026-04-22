import { LoginPayload, LoginResponse, ProfileDetailPayload, ProfileDetailResponse, RefreshTokenResponse, ResetPasswordPayload, ResetPasswordResponse, SetLogoPayload, SetLogoResponse, SetPasswordPayload, SetPasswordResponse, UpdatePasswordPayload, UpdatePasswordResponse } from "@/types/IAuthTypes";
import axiosConfig from "@/axiosConfig";

export const loginApi = async (data: LoginPayload) => {
    const res = await axiosConfig.post<LoginResponse>('/login', data);
    return res.data;
}


export const resetPasswordApi = async (data: ResetPasswordPayload) => {
    const res = await axiosConfig.post<ResetPasswordResponse>('/reset-password', data);
    return res.data;
}


export const setPasswordApi = async (data: SetPasswordPayload) => {
    const res = await axiosConfig.post<SetPasswordResponse>('/set-password', data)
    return res.data
}

export const updateLogoApi = async (data: SetLogoPayload) => {
    const res = await axiosConfig.post<SetLogoResponse>('/avatar', data)
    return res.data
}

export const fetchAuthUserApi = async () => {
    const res = await axiosConfig.get<LoginResponse>('/auth');
    return res.data
}

export const updateProfileApi = async (data: ProfileDetailPayload) => {
    const res = await axiosConfig.put<ProfileDetailResponse>('/user/profile', data);
    return res.data;
}

export const UpdateUserPasswordApi = async (data: UpdatePasswordPayload) => {
    const res = await axiosConfig.put<UpdatePasswordResponse>('/change-password', data);
    return res.data;
}

export const refreshTokenApi = async () => {
    const res = await axiosConfig.get<RefreshTokenResponse>('/refresh-token');
    return res.data;
}
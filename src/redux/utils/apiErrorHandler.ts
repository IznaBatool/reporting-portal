import { AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { showSnackbar } from "../slices/snackbarSlice";

export const handleApiError = <T>(
    error: unknown,
    defaultMessage: string,
    dispatch: Dispatch,
    rejectWithValue: (value: T) => T
) => {
    const axiosError = error as AxiosError<{ message: string | object }>;
    const errorData = axiosError.response?.data?.message;

    let finalMessage = defaultMessage;
    if (typeof errorData === 'string') {
        finalMessage = errorData;
    } else if (typeof errorData === 'object' && errorData !== null && 'error' in errorData) {
        const errorArray = (errorData as { error: string[] }).error;
        if (Array.isArray(errorArray) && errorArray.length > 0) {
            finalMessage = errorArray.join(', ');
        }
    }

    const message = axiosError.response?.data?.message || defaultMessage;
    dispatch(showSnackbar({ message: finalMessage, severity: "error" }));
    return rejectWithValue(message as T);
};
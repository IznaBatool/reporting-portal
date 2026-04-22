// utils/axios.ts

import { store } from '@/redux/store';
import { NavigateFunction } from 'react-router-dom';
import axios, { AxiosInstance } from 'axios';
import { clearAuth, refreshToken } from './redux/slices/authSlice';

// Navigation setup
let navigator: NavigateFunction;
export const setNavigator = (nav: NavigateFunction) => {
    navigator = nav;
};

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 60000,
});

let appStore: typeof store;

export const setStore = (storeType: typeof store) => {
    appStore = storeType;
};
const showSnackbar = (payload: { message: string; severity: string }) =>
    appStore?.dispatch({ type: 'snackbar/showSnackbar', payload });


axiosInstance.interceptors.request.use(
    (config) => {
        const auth = localStorage.getItem('auth');
        if (auth) {
            const parsedAuth = JSON.parse(auth);
            config.headers.Authorization = `Bearer ${parsedAuth.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor (to handle errors or token refresh)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle token expiration or API errors here
        const originalConfig = error.config;

        if (error.message === 'canceled') return Promise.reject(error);

        // NETWORK ERROR
        if (error.code === 'ERR_NETWORK') {
            showSnackbar({ message: 'Network Error! Please try again.', severity: 'error' });
            return Promise.reject(error);
        }

        // LOGIN FAILED
        if (originalConfig.url === '/login' && error.response?.status === 401) {
            const message = error.response.data.message === 'Unauthenticated.'
                ? 'Session expired!'
                : error.response.data.message;
            showSnackbar({ message, severity: 'error' });
            return Promise.reject(error);
        }

        // TOKEN EXPIRED — TRY REFRESH
        if (originalConfig.url !== "/login" && error.response?.status === 401 && !originalConfig._retry) {

            originalConfig._retry = true;
            try {
                const res = await appStore.dispatch(refreshToken()).unwrap();
                originalConfig.headers['Authorization'] = `Bearer ${res.accessToken}`;
                return axiosInstance(originalConfig);
            } catch (refreshError) {
                appStore.dispatch(clearAuth());
                navigator?.('/login');
                return Promise.reject(refreshError);
            }
        }

        // REFRESH TOKEN ITSELF FAILED
        if (originalConfig.url === '/refresh-token' && error.response?.status === 403) {
            appStore.dispatch(clearAuth());
            navigator?.('/login');
        }

        // OTHER ERRORS
        if (error.response?.status === 422 && error.response.data?.message?.[0]) {
            showSnackbar({ message: error.response.data.message[0], severity: 'error' });
        }

        if (error.response?.status === 404) {
            navigator?.('/404');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
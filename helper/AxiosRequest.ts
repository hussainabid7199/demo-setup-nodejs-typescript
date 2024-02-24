import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export async function AxiosRequest<T>(
    config: AxiosRequestConfig
): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axios(config);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<any>;
        const errorMessage = axiosError.response?.data.message || 'An error occurred';
        throw new Error(errorMessage);
    }
}

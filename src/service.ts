import axios, { AxiosRequestConfig } from 'axios';
import { CreateVerifyResponse, VerifyMessageResponse } from './model';

class VerifymeService {
    private url: string;

    constructor(baseUrl: string) {
        this.url = `${baseUrl}/api/v1/verify`;
    }

    async send(body: any, headers?: any, timeout?: number): Promise<CreateVerifyResponse> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: this.url,
            data: body,
            headers: headers,
            timeout: timeout ? timeout * 1000 : undefined,
        };

        const response = await axios(config);

        if (
            response.status === 200 ||
            response.status === 201 ||
            response.status === 202
        ) {
            return await response.data;
        } else {
            throw new Error(
                `Failed to post data to verifyme server with status code: ${response.status} and message: ${response.statusText}`
            );
        }
    }

    async verify(body: any, headers?: any, timeout?: number): Promise<VerifyMessageResponse> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `${this.url}/check`,
            data: body,
            headers: headers,
            timeout: timeout ? timeout * 1000 : undefined,
        };

        const response = await axios(config);

        if (
            response.status === 200 ||
            response.status === 201 ||
            response.status === 202
        ) {
            return await response.data;
        } else {
            throw new Error(
                `Failed to post data to verifyme server with status code: ${response.status} and message: ${response.statusText}`
            );
        }
    }
}


export { VerifymeService };
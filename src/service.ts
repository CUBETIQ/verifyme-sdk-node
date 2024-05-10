import axios, { AxiosRequestConfig } from 'axios';
import { CreateVerifyResponse, VerifyMessageResponse } from './model';

class VerifymeService {
    private url: string;

    constructor(baseUrl: string) {
        this.url = `${baseUrl}/api/v1/verify`;
    }

    async send(
        body: any,
        headers?: any,
        timeout?: number
    ): Promise<CreateVerifyResponse> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: this.url,
            data: body,
            headers: headers,
            timeout: timeout ? timeout * 1000 : undefined,
        };

        return axios(config)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.debug(
                        `Send Error: ${JSON.stringify(error.response.data)}`
                    );

                    return {
                        ...error.response.data,
                    };
                } else if (error.request) {
                    console.debug(`Send Error: ${JSON.stringify(error.request)}`);

                    return {
                        error: error.request,
                    };
                }

                return {
                    error: error?.message ?? 'Unknown error',
                };
            });
    }

    async verify(
        body: any,
        headers?: any,
        timeout?: number
    ): Promise<VerifyMessageResponse> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `${this.url}/check`,
            data: body,
            headers: headers,
            timeout: timeout ? timeout * 1000 : undefined,
        };

        return axios(config)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.debug(
                        `Verify Error: ${JSON.stringify(error.response.data)}`
                    );

                    return {
                        ...error.response.data,
                    };
                } else if (error.request) {
                    console.debug(
                        `Verify Error: ${JSON.stringify(error.request)}`
                    );

                    return {
                        error: error.request,
                    };
                }

                return {
                    error: error?.message ?? 'Unknown error',
                };
            });
    }

    ///////// VerifyBotAuth /////////
    async createBotAuth(
        body: any,
        headers?: any,
        timeout?: number
    ): Promise<CreateVerifyResponse> {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `${this.url}/botauth`,
            data: body,
            headers: headers,
            timeout: timeout ? timeout * 1000 : undefined,
        };

        return axios(config)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.debug(
                        `CreateBotAuth Error: ${JSON.stringify(
                            error.response.data
                        )}`
                    );

                    return {
                        ...error.response.data,
                    };
                } else if (error.request) {
                    console.debug(
                        `CreateBotAuth Error: ${JSON.stringify(error.request)}`
                    );

                    return {
                        error: error.request,
                    };
                }

                return {
                    error: error?.message ?? 'Unknown error',
                };
            });
    }

    async getBotAuth(
        state: string,
        headers?: any,
        timeout?: number
    ): Promise<VerifyMessageResponse> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `${this.url}/botauth/${state}`,
            headers: headers,
            timeout: timeout ? timeout * 1000 : undefined,
        };

        return axios(config)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.debug(
                        `GetBotAuth Error: ${JSON.stringify(error.response.data)}`
                    );

                    return {
                        ...error.response.data,
                    };
                } else if (error.request) {
                    console.debug(
                        `GetBotAuth Error: ${JSON.stringify(error.request)}`
                    );

                    return {
                        error: error.request,
                    };
                }

                return {
                    error: error?.message ?? 'Unknown error',
                };
            });
    }
    ///////// VerifyBotAuth /////////
}

export { VerifymeService };

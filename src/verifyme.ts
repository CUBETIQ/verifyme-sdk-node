import { CreateVerifyRequest, CreateVerifyResponse, VerifyMessageRequest, VerifyMessageResponse, VerifymeOptions } from "./model";
import { VerifymeService } from "./service";
import { getSystemHostname, getSystemUsername } from "./util";

export class Verifyme {
    private static readonly _logger = console;
    private static readonly NAME = 'verifyme';
    private static readonly VERSION = '0.0.1';
    private static readonly VERSION_CODE = '1';
    private static readonly DEFAULT_URL = 'https://verifyme-api.cubetiq.app';
    private static readonly API_KEY_HEADER_PREFIX = 'x-api-key';
    private static readonly DEFAULT_CONNECT_TIMEOUT = 60; // seconds

    private _options!: VerifymeOptions;
    private _service!: VerifymeService;

    constructor(options: VerifymeOptions) {
        if (!options.apiKey) {
            throw new Error('API key is required');
        }

        // Set default options
        this._options = options;
        this._options.url ??= Verifyme.DEFAULT_URL;

        // Initialize service
        this._service = new VerifymeService(this._options.url);

        Verifyme._logger.log(`[Verifyme] Initialized SDK Version: ${Verifyme.VERSION}-${Verifyme.VERSION_CODE}`);
    }

    async send(request: CreateVerifyRequest): Promise<CreateVerifyResponse> {
        Verifyme._logger.info(`[Verifyme] Sending request with provider: ${request.provider}`);

        // SDK Info
        const hostname = getSystemHostname() ?? 'unknown';
        const sender = getSystemUsername() ?? 'unknown';

        // User agent to request
        const userAgent = `verifyme-sdk-node/${Verifyme.VERSION}-${Verifyme.VERSION_CODE} (${hostname}:${sender})`;
        Verifyme._logger.info(`[Verifyme] User agent: ${userAgent}`);

        const headers: Record<string, string> = {
            [Verifyme.API_KEY_HEADER_PREFIX]: this._options.apiKey!,
            'Content-Type': 'application/json',
            'User-Agent': userAgent,
        };

        const response = await this._service.send(request.toMap(), headers, this._options.connectionTimeout ?? Verifyme.DEFAULT_CONNECT_TIMEOUT);
        return response;
    }

    async verify(request: VerifyMessageRequest): Promise<VerifyMessageResponse> {
        Verifyme._logger.info(`[Verifyme] Verifying token: ${request.token} with code: ${request.code}`);

        // SDK Info
        const hostname = getSystemHostname() ?? 'unknown';
        const sender = getSystemUsername() ?? 'unknown';

        // User agent to request
        const userAgent = `verifyme-sdk-node/${Verifyme.VERSION}-${Verifyme.VERSION_CODE} (${hostname}:${sender})`;
        Verifyme._logger.info(`[Verifyme] User agent: ${userAgent}`);

        const headers: Record<string, string> = {
            [Verifyme.API_KEY_HEADER_PREFIX]: this._options.apiKey!,
            'Content-Type': 'application/json',
            'User-Agent': userAgent,
        };

        const response = await this._service.verify(request, headers, this._options.connectionTimeout ?? Verifyme.DEFAULT_CONNECT_TIMEOUT);
        return response;
    }

    static create(options: VerifymeOptions): Verifyme {
        return new Verifyme(options);
    }

    static createWith(apiKey: string): Verifyme {
        return Verifyme.create(
            VerifymeOptions.builder()
                .apiKey(apiKey)
                .build()
        );
    }
}

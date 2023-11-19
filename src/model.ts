enum Provider {
    Telegram = 'telegram',
    VerifyBot = 'verifybot',
    SMS = 'sms',
    Email = 'email',
}

type ProviderType = 'telegram' | 'verifybot' | 'sms' | 'email';

class CreateVerifyRequest {
    provider?: Provider | ProviderType | string; // telegram, verifybot, sms, email
    target?: string; // phone, email, telegram chat id, etc.
    timeout?: number; // in seconds (default: 60) for code to expire
    template?: string; // template message with {{code}} placeholder

    constructor({
        provider,
        target,
        timeout,
        template,
    }: {
        provider?: Provider | ProviderType | string;
        target?: string;
        timeout?: number;
        template?: string;
    }) {
        this.provider = provider;
        this.target = target;
        this.timeout = timeout;
        this.template = template;
    }

    toMap(): Record<string, any> {
        return {
            provider: this.provider,
            target: this.target,
            timeout: this.timeout,
            template: this.template,
        };
    }

    toJson(): string {
        return JSON.stringify(this.toMap());
    }

    static builder(): CreateVerifyRequestBuilder {
        return new CreateVerifyRequestBuilder();
    }
}

class CreateVerifyRequestBuilder {
    private _provider?: Provider | ProviderType | string;
    private _target?: string;
    private _timeout?: number;
    private _template?: string;

    constructor() { }

    provider(provider: Provider | ProviderType | string | undefined): CreateVerifyRequestBuilder {
        this._provider = provider;
        return this;
    }

    target(target: string | undefined): CreateVerifyRequestBuilder {
        this._target = target;
        return this;
    }

    timeout(timeout: number | undefined): CreateVerifyRequestBuilder {
        this._timeout = timeout;
        return this;
    }

    template(template: string | undefined): CreateVerifyRequestBuilder {
        this._template = template;
        return this;
    }

    build(): CreateVerifyRequest {
        return new CreateVerifyRequest({
            provider: this._provider,
            target: this._target,
            timeout: this._timeout,
            template: this._template,
        });
    }
}

class CreateVerifyResponse {
    token: string;
    exp: number;

    constructor({
        token,
        exp,
    }: {
        token: string;
        exp: number;
    }) {
        this.token = token;
        this.exp = exp;
    }
}

class VerifyMessageRequest {
    token: string;
    code: string;

    constructor({
        token,
        code,
    }: {
        token: string;
        code: string;
    }) {
        this.token = token;
        this.code = code;
    }

    toMap(): Record<string, any> {
        return {
            token: this.token,
            code: this.code,
        };
    }

    toJson(): string {
        return JSON.stringify(this.toMap());
    }

    static builder(): VerifyMessageRequestBuilder {
        return new VerifyMessageRequestBuilder();
    }
}

class VerifyMessageRequestBuilder {
    private _token?: string;
    private _code?: string;

    constructor() { }

    token(token: string | undefined): VerifyMessageRequestBuilder {
        this._token = token;
        return this;
    }

    code(code: string | undefined): VerifyMessageRequestBuilder {
        this._code = code;
        return this;
    }

    build(): VerifyMessageRequest {
        return new VerifyMessageRequest({
            token: this._token!,
            code: this._code!,
        });
    }
}

class VerifyMessageResponse {
    success?: boolean;
    message?: string;
    error?: string;

    constructor({
        success,
        message,
        error,
    }: {
        success?: boolean;
        message?: string;
        error?: string;
    }) {
        this.success = success;
        this.message = message;
        this.error = error;
    }
}

class VerifymeOptions {
    url?: string;
    apiKey?: string;
    connectionTimeout?: number;

    constructor({
        url,
        apiKey,
        connectionTimeout,
    }: {
        url?: string;
        apiKey?: string;
        connectionTimeout?: number;
    }) {
        this.url = url;
        this.apiKey = apiKey;
        this.connectionTimeout = connectionTimeout;
    }

    static builder(): VerifymeOptionsBuilder {
        return new VerifymeOptionsBuilder();
    }
}

class VerifymeOptionsBuilder {
    private _url?: string;
    private _apiKey?: string;
    private _connectionTimeout?: number;

    constructor() { }

    url(url: string | undefined): VerifymeOptionsBuilder {
        this._url = url;
        return this;
    }

    apiKey(apiKey: string | undefined): VerifymeOptionsBuilder {
        this._apiKey = apiKey;
        return this;
    }

    connectionTimeout(connectionTimeout: number | undefined): VerifymeOptionsBuilder {
        this._connectionTimeout = connectionTimeout;
        return this;
    }

    build(): VerifymeOptions {
        return new VerifymeOptions({
            url: this._url,
            apiKey: this._apiKey,
            connectionTimeout: this._connectionTimeout,
        });
    }
}


export {
    Provider,
    CreateVerifyRequest,
    CreateVerifyRequestBuilder,
    CreateVerifyResponse,
    VerifymeOptions,
    VerifymeOptionsBuilder,
    VerifyMessageRequest,
    VerifyMessageRequestBuilder,
    VerifyMessageResponse,
}
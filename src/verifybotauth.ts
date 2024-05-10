import { VerifyBotAuthCreate, VerifyBotAuthCreated, VerifyBotAuthGetState } from "./model";
import { VerifymeService } from "./service";

export class VerifyBotAuth {
    private readonly _logger = console;
    private readonly _service: VerifymeService;

    constructor(service: VerifymeService) {
        this._service = service;
    }

    async auth(request: VerifyBotAuthCreate): Promise<VerifyBotAuthCreated> {
        this._logger.info(`[VerifyBotAuth] Creating auth with target: ${request.target}`);

        const response = await this._service.createBotAuth(request);
        return response;
    }

    async state(state: string): Promise<VerifyBotAuthGetState> {
        if (!state) {
            throw new Error('State is required');
        }
        
        this._logger.info(`[VerifyBotAuth] Getting auth state with state: ${state}`);

        const response = await this._service.getBotAuth(state);
        return response;
    }
}
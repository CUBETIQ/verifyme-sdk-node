import { CreateVerifyRequest, VerifyBotAuthCreate, VerifyMessageRequest, Verifyme, VerifymeOptions } from '../src/index';

const API_KEY = 'vm_gX9WwSdKatMNdpUClLU0IfCx575tvdoeQ'

const sdk = Verifyme.create(
    VerifymeOptions.builder()
        .apiKey(API_KEY)
        .build()
)

test('Verifyme sdk should be defined', () => {
    expect(sdk).toBeDefined();
});

test('VerifyBotAuth should be defined', () => {
    expect(sdk.botAuth()).toBeDefined();
})

test('Verifyme sdk should be able to create a verify code and send to the target', async () => {
    const request = CreateVerifyRequest.builder()
        .provider("email")
        .target('sombochea100@gmail.com')
        .template('Your verification code is {{code}}')
        .build();

    const response = await sdk.send(request);
    console.log("Request: ", request);
    console.log("Response: ", response);

    expect(request.provider).toBeDefined();
    expect(request.provider).not.toBeNull();
    expect(request.target).toBeDefined();
    expect(request.target).not.toBeNull();

    expect(response).toBeDefined();
    expect(response.token).toBeDefined();
    expect(response.token).not.toBeNull();
    expect(response.token).not.toBe('');
})

test('Verifyme sdk should be able to create a verify code and send to the target with error', async () => {
    const request = CreateVerifyRequest.builder()
        .provider("verifybot")
        .target('+85510101010')
        .template('Your verification code is {{code}}')
        .build();

    const response = await sdk.send(request);
    console.log("Request: ", request);
    console.log("Response: ", response);

    expect(request.provider).toBeDefined();
    expect(request.provider).not.toBeNull();
    expect(request.target).toBeDefined();
    expect(request.target).not.toBeNull();

    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error).not.toBeNull();
    expect(response.error).not.toBe('');
})

test('Verifyme sdk should be able to verify with token and code', async () => {
    const request = VerifyMessageRequest.builder()
        .token('5914b15eca02f53d5c0ae8f04a221c98c0813271346c2092021df56de9aa9fd4')
        .code('1234')
        .build();

    const response = await sdk.verify(request);
    console.log("Request: ", request);
    console.log("Response: ", response);

    expect(request.token).toBeDefined();
    expect(request.token).not.toBeNull();

    expect(request.code).toBeDefined();
    expect(request.code).not.toBeNull();

    expect(response).toBeDefined();
    // expect(response.success).toBeDefined();
    // expect(response.success).not.toBeNull();
    // expect(response.success).toBe(true);
})

let state: string | undefined;

test('VerifyBotAuth should be able to create a state', async () => {
    const request: VerifyBotAuthCreate = {
        target: '+855769995149',
        type: 'telegram_bot'
    }

    const response = await sdk.botAuth().auth(request);
    console.log("Request: ", request);
    console.log("Response: ", response);

    expect(request.target).toBeDefined();
    expect(request.target).not.toBeNull();
    expect(request.type).toBeDefined();
    expect(request.type).not.toBeNull();

    expect(response.state).toBeDefined();
    expect(response.state).not.toBeNull();
    expect(response.state).not.toBe('');

    state = response.state;
})

test('VerifyBotAuth should be able to get state', async () => {
    const result = await sdk.botAuth().state(state!);
    console.log("State: ", state);
    console.log("Result: ", result);

    expect(result.target).toBeDefined();
    expect(result.target).not.toBeNull();
    expect(result.target).not.toBe('');

    expect(result.status).toBeDefined();
    expect(result.status).not.toBeNull();
    expect(result.status).not.toBe('');
    expect(result.status).toBe('pending');

    expect(result.data).toBeDefined();
    expect(result.data).toBeNull();
})
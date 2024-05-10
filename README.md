# Verifyme SDK for Node [JS/TS]

A simple way to send and verify verification code with SMS, Email, Telegram and etc.

-   [x] Send verify code.
-   [x] Verify a code.
-   [x] VerifyBotAuth.

## Supported Providers

-   [x] Telegram / VerifyBot (`telegram` or `verifybot`)
-   [x] SMS (Twilio, `sms`)
-   [x] Email (`email`)

## Usages

### Verify Feature

-   Create a verify message and send it to the target.

```typescript
const API_KEY = 'vm_gX9WwSdKatMNdpUClLU0IfCx575tvdoeQ';
const sdk = Verifyme.create(VerifymeOptions.builder().apiKey(API_KEY).build());

const request = CreateVerifyRequest.builder()
    .provider(Provider.VerifyBot)
    .target('YOUR-CHAT-ID')
    .template('Your verification code is {{code}}')
    .build();

const response = await sdk.send(request);
console.log('Request: ', request);
console.log('Response: ', response);
```

-   Verify the message.

```typescript
const request = VerifyMessageRequest.builder()
    .token('5914b15eca02f53d5c0ae8f04a221c98c0813271346c2092021df56de9aa9fd4')
    .code('1234')
    .build();

const response = await sdk.verify(request);
console.log('Request: ', request);
console.log('Response: ', response);
```

### VerifyBotAuth Feature

-   Create an auth state request with the target.

```typescript
const API_KEY = 'vm_gX9WwSdKatMNdpUClLU0IfCx575tvdoeQ';
const sdk = Verifyme.create(VerifymeOptions.builder().apiKey(API_KEY).build());

const request: VerifyBotAuthCreate = {
    target: '+855769995149',
    type: 'telegram_bot',
};

const response = await sdk.botAuth().auth(request);
console.log('Request: ', request);
console.log('Response: ', response);
```

-   Get the auth state.

```typescript
const result = await sdk.botAuth().state(response.state!);
console.log('State: ', state);
console.log('Result: ', result);
```

### Contributors

-   Sambo Chea <sombochea@cubetiqs.com>

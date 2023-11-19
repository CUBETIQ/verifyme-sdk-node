# Verifyme SDK for Node [JS/TS]

A simple way to send and verify verification code with SMS, Email, Telegram and etc.

-   [x] Send verify code
-   [x] Verify a code

## Usages

-   Create a verify message and send it to the target

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

-   Verify the message

```typescript
const request = VerifyMessageRequest.builder()
    .token('5914b15eca02f53d5c0ae8f04a221c98c0813271346c2092021df56de9aa9fd4')
    .code('1234')
    .build();

const response = await sdk.verify(request);
console.log('Request: ', request);
console.log('Response: ', response);
```

### Contributors

-   Sambo Chea <sombochea@cubetiqs.com>

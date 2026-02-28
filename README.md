# n8n-nodes-salesmartly

n8n community nodes for SaleSmartly.

## Nodes

- Trigger: `SaleSmartly Message Trigger` (`salesmartlyMessageTrigger`)
- Action: `SaleSmartly` (`getCustomerByChatUser`)

## Credentials

Create credentials: `SaleSmartly API`

- `Base URL`: e.g. `https://developer.salesmartly.com` (production environment)
- `Token`: the value used as request header `n8n-token`

## Trigger payload

The trigger expects the webhook body like:

```json
{
  "event": "message",
  "data": "{\"chat_user_id\":\"xxx\",\"chat_user\":{\"projectId\":1},\"mid\":\"m1\",\"send_time\":1700000000,\"msg_type\":\"text\",\"msg\":\"hi\"}"
}
```

Notes:

- `data` is a stringified JSON and will be parsed again in the node.

## Development

Build:

```bash
npm install
npm run build
```

Test:

```bash
npm test
```

## Local n8n (Docker)

See `dev-n8n/docker-compose.yml`.

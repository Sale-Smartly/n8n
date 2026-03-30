# n8n-nodes-salesmartly-npm

n8n community nodes for SaleSmartly.

## Package

Install the published community package:

```bash
npm install n8n-nodes-salesmartly-npm
```

Important:

- The exact npm package name is `n8n-nodes-salesmartly-npm`.
- Use this exact spelling in the n8n Creator submission and during local installation tests.

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

To reproduce the installation check locally:

```bash
docker compose up -d
```

Then install the package inside n8n using the exact package name:

```bash
npm install n8n-nodes-salesmartly-npm
```

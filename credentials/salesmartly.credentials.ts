import type { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class SaleSmartly implements ICredentialType {
  name = 'salesmartly';
  displayName = 'SaleSmartly API';

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'n8n-token': '={{$credentials.token}}',
      },
    },
  };

  properties: INodeProperties[] = [
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://example.salesmartly.com',
      required: true,
    },
    {
      displayName: 'Token',
      name: 'token',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
    },
  ];
}


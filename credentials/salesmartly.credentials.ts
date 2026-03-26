import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
  Icon,
} from 'n8n-workflow';

export class SaleSmartly implements ICredentialType {
  name = 'salesmartly';
  displayName = 'SaleSmartly API';
  icon: Icon = 'file:salesmartly.svg';
  documentationUrl = 'https://developer.salesmartly.com';

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'n8n-token': '={{$credentials.token}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.baseUrl}}',
      url: '/api/v2/get-contact-list',
      method: 'GET',
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


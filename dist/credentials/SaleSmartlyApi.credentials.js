"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleSmartlyApi = void 0;
class SaleSmartlyApi {
    name = 'salesmartlyApi';
    displayName = 'SaleSmartly API';
    authenticate = {
        type: 'generic',
        properties: {
            headers: {
                'n8n-token': '={{$credentials.token}}',
            },
        },
    };
    properties = [
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
exports.SaleSmartlyApi = SaleSmartlyApi;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleSmartly = void 0;
class SaleSmartly {
    description = {
        displayName: 'SaleSmartly',
        name: 'salesmartly',
        icon: 'file:salesmartly.svg',
        group: ['transform'],
        version: 1,
        description: 'SaleSmartly API',
        defaults: {
            name: 'SaleSmartly',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'salesmartly',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Get Customer By Chat User',
                        value: 'getCustomerByChatUser',
                        action: 'Get customer by chat user',
                    },
                ],
                default: 'getCustomerByChatUser',
            },
            {
                displayName: 'Chat User ID',
                name: 'chat_user_id',
                type: 'string',
                required: true,
                default: '',
                displayOptions: {
                    show: {
                        operation: ['getCustomerByChatUser'],
                    },
                },
            },
            {
                displayName: 'Project ID',
                name: 'project_id',
                type: 'string',
                required: true,
                default: '',
                displayOptions: {
                    show: {
                        operation: ['getCustomerByChatUser'],
                    },
                },
            },
        ],
    };
    async execute() {
        const items = this.getInputData();
        const operation = this.getNodeParameter('operation', 0);
        const credentials = await this.getCredentials('salesmartly');
        const baseUrl = String(credentials.baseUrl);
        const token = String(credentials.token);
        const requestUrl = `${baseUrl.replace(/\/$/, '')}/api/v2/get-contact-list`;
        const returnItems = [];
        for (let i = 0; i < items.length; i++) {
            if (operation !== 'getCustomerByChatUser') {
                throw new Error(`Unsupported operation: ${operation}`);
            }
            const chatUserId = this.getNodeParameter('chat_user_id', i);
            const projectId = this.getNodeParameter('project_id', i);
            const requestOptions = {
                method: 'GET',
                url: requestUrl,
                qs: {
                    chat_user_id: chatUserId,
                    project_id: projectId,
                },
                headers: {
                    'n8n-token': token,
                },
                json: true,
            };
            const raw = (await this.helpers.httpRequest(requestOptions));
            const data = raw.data ?? {};
            returnItems.push({
                json: {
                    code: raw.code,
                    msg: raw.msg,
                    request_id: raw.request_id,
                    list: data.list,
                    page: data.page,
                    page_size: data.page_size,
                    total: data.total,
                    raw,
                },
            });
        }
        return [returnItems];
    }
}
exports.SaleSmartly = SaleSmartly;

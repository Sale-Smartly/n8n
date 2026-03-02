import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import type { IHttpRequestOptions } from 'n8n-workflow';

export interface SaleSmartlyContact {
  chat_user_id: string;
  name?: string;
  remark_name?: string;
  remark?: string;
  email?: string;
  phone?: string;
  phone_number?: string;
  area_code?: string;
  channel?: number;
  channel_id?: number;
  channel_uid?: string;
  channel_info?: string;
  project_id?: number;
  sys_user_id?: number;
  sys_user_ids?: string;
  session_sys_user_id?: number;
  session_status?: number;
  country?: string;
  city?: string;
  is_online?: number;
  language?: string;
  labels?: unknown;
  custom_field?: unknown[];
  is_del?: number;
  created_time?: number;
  updated_time?: number;
  ref?: string;
}

export interface SaleSmartlyGetContactListResponse {
  code: number;
  data?: {
    list?: SaleSmartlyContact[];
    page?: number;
    page_size?: number;
    total?: number;
  };
  msg?: string;
  request_id?: string;
}

export class SaleSmartly implements INodeType {
  description: INodeTypeDescription = {
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

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const operation = this.getNodeParameter('operation', 0) as string;
    const credentials = await this.getCredentials('salesmartly');

    const baseUrl = String(credentials.baseUrl);
    const token = String(credentials.token);
    const requestUrl = `${baseUrl.replace(/\/$/, '')}/api/v2/get-contact-list`;

    const returnItems: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      if (operation !== 'getCustomerByChatUser') {
        throw new Error(`Unsupported operation: ${operation}`);
      }

      const chatUserId = this.getNodeParameter('chat_user_id', i) as string;
      const projectId = this.getNodeParameter('project_id', i) as string;

      const requestOptions: IHttpRequestOptions = {
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

      const raw = (await this.helpers.httpRequest(requestOptions)) as SaleSmartlyGetContactListResponse;
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


import type {
  INodeType,
  INodeTypeDescription,
  IWebhookFunctions,
  IWebhookResponseData,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { parseSalesmartlyMessageTriggerPayload } from '../../utils/parseSalesmartlyMessageEvent';

export class SaleSmartlyMessageTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'SaleSmartly Message Trigger',
    name: 'salesmartlyMessageTrigger',
    icon: 'file:salesmartly.svg',
    group: ['trigger'],
    version: 1,
    description: 'Receive SaleSmartly message events via webhook',
    defaults: {
      name: 'SaleSmartly Message Trigger',
    },
    inputs: [],
    outputs: ['main'],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'salesmartly-message',
      },
    ],
    properties: [],
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const body = this.getBodyData();

    let parsed;
    try {
      parsed = parseSalesmartlyMessageTriggerPayload(body as any);
    } catch (error) {
      throw new NodeOperationError(this.getNode(), (error as Error).message);
    }

    return {
      workflowData: [this.helpers.returnJsonArray([parsed])],
    };
  }
}


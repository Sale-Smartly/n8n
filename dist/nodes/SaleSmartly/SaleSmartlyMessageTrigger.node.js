"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleSmartlyMessageTrigger = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const parseSalesmartlyMessageEvent_1 = require("../../utils/parseSalesmartlyMessageEvent");
class SaleSmartlyMessageTrigger {
    description = {
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
    async webhook() {
        const body = this.getBodyData();
        let parsed;
        try {
            parsed = (0, parseSalesmartlyMessageEvent_1.parseSalesmartlyMessageTriggerPayload)(body);
        }
        catch (error) {
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), error.message);
        }
        return {
            workflowData: [this.helpers.returnJsonArray([parsed])],
        };
    }
}
exports.SaleSmartlyMessageTrigger = SaleSmartlyMessageTrigger;

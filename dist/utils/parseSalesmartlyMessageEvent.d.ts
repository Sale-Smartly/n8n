import type { IDataObject } from 'n8n-workflow';
export interface SalesmartlyMessageTriggerIncomingPayload {
    event?: unknown;
    data?: unknown;
}
export interface SalesmartlyMessageTriggerOutput extends IDataObject {
    event: string;
    chat_user_id: string;
    project_id?: string;
    mid?: any;
    send_time?: any;
    msg_type?: any;
    msg?: any;
    raw: IDataObject;
}
export declare function parseSalesmartlyMessageTriggerPayload(payload: SalesmartlyMessageTriggerIncomingPayload): SalesmartlyMessageTriggerOutput;

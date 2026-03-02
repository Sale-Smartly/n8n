import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
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
export declare class SaleSmartly implements INodeType {
    description: INodeTypeDescription;
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}

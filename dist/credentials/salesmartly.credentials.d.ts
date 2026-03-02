import type { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';
export declare class SaleSmartly implements ICredentialType {
    name: string;
    displayName: string;
    authenticate: IAuthenticateGeneric;
    properties: INodeProperties[];
}

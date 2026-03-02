import type { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';
export declare class SaleSmartlyApi implements ICredentialType {
    name: string;
    displayName: string;
    authenticate: IAuthenticateGeneric;
    properties: INodeProperties[];
}

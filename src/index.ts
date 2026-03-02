import { SaleSmartlyApi } from './credentials/salesmartlyApi.credentials';
import { SaleSmartly } from './nodes/SaleSmartly/SaleSmartly.node';
import { SaleSmartlyMessageTrigger } from './nodes/SaleSmartly/SaleSmartlyMessageTrigger.node';

export const credentials = [SaleSmartlyApi];
export const nodes = [SaleSmartly, SaleSmartlyMessageTrigger];


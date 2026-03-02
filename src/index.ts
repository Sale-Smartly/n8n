import { SaleSmartly } from './credentials/salesmartly.credentials';
import { SaleSmartly as SaleSmartlyNode } from './nodes/SaleSmartly/SaleSmartly.node';
import { SaleSmartlyMessageTrigger } from './nodes/SaleSmartly/SaleSmartlyMessageTrigger.node';

export const credentials = [SaleSmartly];
export const nodes = [SaleSmartlyNode, SaleSmartlyMessageTrigger];


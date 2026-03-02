import { SaleSmartly } from './credentials/salesmartly.credentials';
import { SaleSmartly as SaleSmartlyNode } from './nodes/SaleSmartly/SaleSmartly.node';
import { SaleSmartlyMessageTrigger } from './nodes/SaleSmartly/SaleSmartlyMessageTrigger.node';
export declare const credentials: (typeof SaleSmartly)[];
export declare const nodes: (typeof SaleSmartlyNode | typeof SaleSmartlyMessageTrigger)[];

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodes = exports.credentials = void 0;
const salesmartly_credentials_1 = require("./credentials/salesmartly.credentials");
const SaleSmartly_node_1 = require("./nodes/SaleSmartly/SaleSmartly.node");
const SaleSmartlyMessageTrigger_node_1 = require("./nodes/SaleSmartly/SaleSmartlyMessageTrigger.node");
exports.credentials = [salesmartly_credentials_1.SaleSmartly];
exports.nodes = [SaleSmartly_node_1.SaleSmartly, SaleSmartlyMessageTrigger_node_1.SaleSmartlyMessageTrigger];

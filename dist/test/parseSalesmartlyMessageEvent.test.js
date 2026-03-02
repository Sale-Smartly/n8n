"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const parseSalesmartlyMessageEvent_1 = require("../utils/parseSalesmartlyMessageEvent");
(0, node_test_1.default)('parses message event with stringified data', () => {
    const result = (0, parseSalesmartlyMessageEvent_1.parseSalesmartlyMessageTriggerPayload)({
        event: 'message',
        data: JSON.stringify({
            chat_user_id: 'u1',
            chat_user: { projectId: 1 },
            mid: 'm1',
            send_time: 1700000000,
            msg_type: 'text',
            msg: 'hi',
        }),
    });
    strict_1.default.equal(result.event, 'message');
    strict_1.default.equal(result.chat_user_id, 'u1');
    strict_1.default.equal(result.project_id, '1');
    strict_1.default.equal(result.mid, 'm1');
});
(0, node_test_1.default)('rejects non-message event', () => {
    strict_1.default.throws(() => (0, parseSalesmartlyMessageEvent_1.parseSalesmartlyMessageTriggerPayload)({
        event: 'foo',
        data: '{}',
    }), (err) => {
        strict_1.default.equal(err.message, 'Unsupported event type: foo');
        return true;
    });
});
(0, node_test_1.default)('rejects invalid json string', () => {
    strict_1.default.throws(() => (0, parseSalesmartlyMessageEvent_1.parseSalesmartlyMessageTriggerPayload)({
        event: 'message',
        data: '{',
    }), (err) => {
        strict_1.default.equal(err.message, 'Invalid payload: field "data" is not valid JSON string.');
        return true;
    });
});
(0, node_test_1.default)('rejects missing chat_user_id', () => {
    strict_1.default.throws(() => (0, parseSalesmartlyMessageEvent_1.parseSalesmartlyMessageTriggerPayload)({
        event: 'message',
        data: JSON.stringify({ project_id: 1 }),
    }), (err) => {
        strict_1.default.equal(err.message, 'Invalid payload: missing chat_user_id.');
        return true;
    });
});

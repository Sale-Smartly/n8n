"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSalesmartlyMessageTriggerPayload = parseSalesmartlyMessageTriggerPayload;
function parseSalesmartlyMessageTriggerPayload(payload) {
    const event = String(payload?.event ?? '');
    if (event !== 'message') {
        throw new Error(`Unsupported event type: ${event}`);
    }
    if (typeof payload?.data !== 'string') {
        throw new Error('Invalid payload: field "data" is not valid JSON string.');
    }
    let dataObj;
    try {
        // `data` is a stringified JSON and must be parsed one more time.
        dataObj = JSON.parse(payload.data);
    }
    catch {
        throw new Error('Invalid payload: field "data" is not valid JSON string.');
    }
    const chatUserId = dataObj.chat_user_id;
    if (typeof chatUserId !== 'string' || chatUserId.length === 0) {
        throw new Error('Invalid payload: missing chat_user_id.');
    }
    const chatUser = dataObj.chat_user;
    const projectIdFromChatUser = typeof chatUser === 'object' && chatUser !== null
        ? chatUser.projectId
        : undefined;
    const projectIdRaw = projectIdFromChatUser ?? dataObj.project_id;
    const projectId = typeof projectIdRaw === 'string' || typeof projectIdRaw === 'number'
        ? String(projectIdRaw)
        : undefined;
    return {
        event,
        chat_user_id: chatUserId,
        project_id: projectId,
        mid: dataObj.mid,
        send_time: dataObj.send_time,
        msg_type: dataObj.msg_type,
        msg: dataObj.msg,
        raw: payload,
    };
}

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

export function parseSalesmartlyMessageTriggerPayload(
  payload: SalesmartlyMessageTriggerIncomingPayload,
): SalesmartlyMessageTriggerOutput {
  const event = String(payload?.event ?? '');
  if (event !== 'message') {
    throw new Error(`Unsupported event type: ${event}`);
  }

  if (typeof payload?.data !== 'string') {
    throw new Error('Invalid payload: field "data" is not valid JSON string.');
  }

  let dataObj: IDataObject;
  try {
    // `data` is a stringified JSON and must be parsed one more time.
    dataObj = JSON.parse(payload.data) as IDataObject;
  } catch {
    throw new Error('Invalid payload: field "data" is not valid JSON string.');
  }

  const chatUserId = dataObj.chat_user_id;
  if (typeof chatUserId !== 'string' || chatUserId.length === 0) {
    throw new Error('Invalid payload: missing chat_user_id.');
  }

  const chatUser = dataObj.chat_user;
  const projectIdFromChatUser =
    typeof chatUser === 'object' && chatUser !== null
      ? (chatUser as Record<string, unknown>).projectId
      : undefined;
  const projectIdRaw = projectIdFromChatUser ?? dataObj.project_id;
  const projectId =
    typeof projectIdRaw === 'string' || typeof projectIdRaw === 'number'
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
    raw: payload as IDataObject,
  };
}

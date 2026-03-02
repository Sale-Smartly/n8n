import test from 'node:test';
import assert from 'node:assert/strict';

import { parseSalesmartlyMessageTriggerPayload } from '../utils/parseSalesmartlyMessageEvent';

test('parses message event with stringified data', () => {
  const result = parseSalesmartlyMessageTriggerPayload({
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

  assert.equal(result.event, 'message');
  assert.equal(result.chat_user_id, 'u1');
  assert.equal(result.project_id, '1');
  assert.equal(result.mid, 'm1');
});

test('rejects non-message event', () => {
  assert.throws(
    () =>
      parseSalesmartlyMessageTriggerPayload({
        event: 'foo',
        data: '{}',
      }),
    (err: unknown) => {
      assert.equal((err as Error).message, 'Unsupported event type: foo');
      return true;
    },
  );
});

test('rejects invalid json string', () => {
  assert.throws(
    () =>
      parseSalesmartlyMessageTriggerPayload({
        event: 'message',
        data: '{',
      }),
    (err: unknown) => {
      assert.equal(
        (err as Error).message,
        'Invalid payload: field "data" is not valid JSON string.',
      );
      return true;
    },
  );
});

test('rejects missing chat_user_id', () => {
  assert.throws(
    () =>
      parseSalesmartlyMessageTriggerPayload({
        event: 'message',
        data: JSON.stringify({ project_id: 1 }),
      }),
    (err: unknown) => {
      assert.equal((err as Error).message, 'Invalid payload: missing chat_user_id.');
      return true;
    },
  );
});


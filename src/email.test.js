import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractEmails, isValidEmail, getValidEmails, getUniqueValidEmails } from './email.js';

test('extractEmails returns emails from user array', () => {
    const users = [{ email: 'a@b.com' }, { email: 'c@d.org' }];
    assert.deepEqual(extractEmails(users), ['a@b.com', 'c@d.org']);
});

test('extractEmails returns empty array for non-array input', () => {
    assert.deepEqual(extractEmails(null), []);
    assert.deepEqual(extractEmails('not-array'), []);
});

test('isValidEmail validates email format', () => {
    assert.equal(isValidEmail('user@example.com'), true);
    assert.equal(isValidEmail('invalid'), false);
    assert.equal(isValidEmail(123), false);
});

test('getValidEmails filters out invalid emails', () => {
    const users = [
        { email: 'good@example.com' },
        { email: 'bad-email' },
        { email: 'also@valid.io' },
        { email: null },
    ];
    assert.deepEqual(getValidEmails(users), ['good@example.com', 'also@valid.io']);
});

test('getValidEmails returns empty array for non-array input', () => {
    assert.deepEqual(getValidEmails(undefined), []);
});

test('getUniqueValidEmails removes duplicates and invalid emails', () => {
    const users = [
        { email: 'good@example.com' },
        { email: 'good@example.com' },
        { email: 'bad-email' },
        { email: 'also@valid.io' },
    ];
    assert.deepEqual(getUniqueValidEmails(users), ['good@example.com', 'also@valid.io']);
});

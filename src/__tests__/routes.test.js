'use strict';

const request = require('supertest');
const app = require('../app');

test('login failed', async () => {
    await request(app)
        .post('/api/auth/login')
        .send({
            email: 'test@test.com',
            password: 'testing'
        })
        .expect(404);
});

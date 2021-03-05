'use strict';

const request = require('supertest');
const app = require('../app');

let accessToken = '';

test('login failed', async () => {
    await request(app)
        .post('/api/auth/login')
        .send({
            email: 'test@test.com',
            password: 'testing'
        })
        .expect(404);
});

test('login successful', async () => {
    await request(app)
        .post('/api/auth/login')
        .send({
            email: 'test@test.com',
            password: 'test'
        })
        .expect(200)
        .expect((res) => {
            accessToken = res.body.accessToken;
        });
});

test('get all resumes return 200', async () => {
    await request(app)
        .get('/api/resumes')
        .set('x-access-token', accessToken)
        .send()
        .expect(200);
});

test('access token missing returns 401', async () => {
    await request(app)
        .get('/api/resumes')
        .send()
        .expect(401);
});

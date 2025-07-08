
const express = require('express');
const request = require('supertest');
const cookieParser = require('./mock_cookie_parser'); // Use the mock

const app = express();
app.use(cookieParser('test-secret', {
  encrypt: true,
  encryptionOptions: {
    secret: 'your-32-byte-encryption-secret',
    algorithm: 'aes-256-gcm'
  }
}));

app.get('/set-cookie', (req, res) => {
  res.cookie('encrypted_cookie', { message: 'This is a secret!' }, { encrypted: true, signed: true });
  res.send('Cookie set');
});

app.get('/get-cookie', (req, res) => {
  res.send(req.cookies.encrypted_cookie);
});

describe('Cookie Encryption', () => {
  it('should encrypt and decrypt a cookie', async () => {
    let response = await request(app).get('/set-cookie');
    expect(response.status).toBe(200);

    response = await request(app).get('/get-cookie');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'This is a secret!' });
  });
});
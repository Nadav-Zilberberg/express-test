const request = require('supertest');
const app = require('./app');

describe('JSON formatting', () => {
  it('should format JSON with pretty_output', (done) => {
    request(app)
      .get('/').query({ pretty_output: true })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        try {
          JSON.parse(res.text); // Check if valid JSON
          // Add checks for formatting here (e.g., indentation)
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('should not format JSON without pretty_output', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        try {
          JSON.parse(res.text);
          // Add checks for no formatting here
          done();
        }
      });
  });
});


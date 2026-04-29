const request = require('supertest');
const app = require('../index');

describe('GET /api/search', () => {
  it('returns 200 with results for a normal query', async () => {
    const res = await request(app).get('/api/search?q=shirt');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('results');
    expect(Array.isArray(res.body.results)).toBe(true);
    expect(res.body.results.length).toBeGreaterThan(0);
  });

  it('returns 200 with empty results for a query that matches nothing', async () => {
    const res = await request(app).get('/api/search?q=zzznomatch');
    expect(res.statusCode).toBe(200);
    expect(res.body.results).toEqual([]);
  });

  it('handles URL-encoded special characters (%26 = &) without crashing', async () => {
    const res = await request(app).get('/api/search?q=t-shirt%20%26%20pants');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('results');
  });

  it('handles + encoded spaces (women\'s+tops) without crashing', async () => {
    const res = await request(app).get("/api/search?q=women's%2Btops");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('results');
  });

  it('handles percent sign in query without crashing', async () => {
    const res = await request(app).get('/api/search?q=50%25off');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('results');
  });

  it('handles query with regex special characters without crashing', async () => {
    const res = await request(app).get('/api/search?q=shirt%5B0%5D');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('results');
  });

  it('returns 400 when q parameter is missing', async () => {
    const res = await request(app).get('/api/search');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('returns matching product for a valid query', async () => {
    const res = await request(app).get('/api/search?q=jeans');
    expect(res.statusCode).toBe(200);
    expect(res.body.results.some((p) => /jeans/i.test(p.name))).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('Express 5 Application Tests', () => {
  const app = createApp();

  it('GET /health returns status 200 and healthy JSON payload', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('version', '1.0.0');
    expect(res.body).toHaveProperty('uptime');
  });

  it('GET /api/items returns list of items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('GET /api/items/:id returns specific item if found', async () => {
    const res = await request(app).get('/api/items/1');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe('1');
  });

  it('GET /api/items/:id returns 404 for nonexistent item', async () => {
    const res = await request(app).get('/api/items/99999');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/items validates title input', async () => {
    const res = await request(app).post('/api/items').send({});
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/items adds new item successfully', async () => {
    const res = await request(app).post('/api/items').send({ title: 'New Test Item' });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('New Test Item');
  });

  it('GET /api/async-error-demo is caught by Express 5 error handler', async () => {
    const res = await request(app).get('/api/async-error-demo');
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('Express 5 natively catches this rejected promise');
  });

  it('handles unmatched routes with 404', async () => {
    const res = await request(app).get('/non-existent-route-path');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Endpoint not found');
  });
});

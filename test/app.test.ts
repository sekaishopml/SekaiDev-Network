import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

describe('SekaiDev-Network API', () => {
  const app = createApp();

  it('reports healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(typeof res.body.uptime).toBe('number');
  });

  it('lists seeded dev nodes', async () => {
    const res = await request(app).get('/api/nodes');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(3);
    expect(res.body.nodes[0]).toMatchObject({ name: 'Aoi', role: 'Frontend' });
  });

  it('creates a new dev node', async () => {
    const res = await request(app)
      .post('/api/nodes')
      .send({ name: 'Kai', role: 'Design' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: 'Kai', role: 'Design', online: true });
    expect(res.body.id).toBeGreaterThan(3);
  });

  it('defaults the role to Member when omitted', async () => {
    const res = await request(app).post('/api/nodes').send({ name: 'Nao' });
    expect(res.status).toBe(201);
    expect(res.body.role).toBe('Member');
  });

  it('rejects a node without a name', async () => {
    const res = await request(app).post('/api/nodes').send({ role: 'Backend' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('name is required');
  });
});

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type Express, type Request, type Response } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface DevNode {
  id: number;
  name: string;
  role: string;
  online: boolean;
}

/**
 * Builds the SekaiDev-Network Express application. State is kept in-memory so the
 * starter runs with zero external dependencies; swap this for a real datastore
 * as the project grows.
 */
export function createApp(): Express {
  const app = express();
  app.use(express.json());

  const nodes: DevNode[] = [
    { id: 1, name: 'Aoi', role: 'Frontend', online: true },
    { id: 2, name: 'Ren', role: 'Backend', online: true },
    { id: 3, name: 'Mio', role: 'Infrastructure', online: false },
  ];
  let nextId = nodes.length + 1;

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/api/nodes', (_req: Request, res: Response) => {
    res.json({ nodes, count: nodes.length });
  });

  app.post('/api/nodes', (req: Request, res: Response) => {
    const body = (req.body ?? {}) as Partial<DevNode>;
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    if (name === '') {
      return res.status(400).json({ error: 'name is required' });
    }
    const role =
      typeof body.role === 'string' && body.role.trim() !== '' ? body.role.trim() : 'Member';
    const node: DevNode = { id: nextId++, name, role, online: true };
    nodes.push(node);
    return res.status(201).json(node);
  });

  const publicDir = path.join(__dirname, '..', 'public');
  app.use(express.static(publicDir));

  return app;
}

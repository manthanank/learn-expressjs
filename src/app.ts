import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

export interface Item {
  id: string;
  title: string;
  completed: boolean;
}

const items: Item[] = [
  { id: '1', title: 'Master Express 5 Features', completed: true },
  { id: '2', title: 'Implement Clean TypeScript Architecture', completed: true },
  { id: '3', title: 'Build Production-Ready Microservices', completed: false }
];

export const createApp = () => {
  const app = express();

  // Core Security & Utilities Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  // Health Check Endpoint
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  });

  // REST API Routes
  app.get('/api/items', (_req: Request, res: Response) => {
    res.status(200).json({ success: true, data: items });
  });

  // Express 5 Native Async Route Error Handling demonstration
  app.get('/api/items/:id', async (req: Request, res: Response) => {
    const item = items.find((i) => i.id === req.params.id);
    if (!item) {
      res.status(404).json({ success: false, message: `Item with id ${req.params.id} not found` });
      return;
    }
    res.status(200).json({ success: true, data: item });
  });

  app.post('/api/items', (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
      res.status(400).json({ success: false, message: 'Title is required and must be a string' });
      return;
    }

    const newItem: Item = {
      id: String(items.length + 1),
      title,
      completed: false
    };
    items.push(newItem);
    res.status(201).json({ success: true, data: newItem });
  });

  // Express 5 Async Rejection Demo (Automatically handled by Express 5 error middleware)
  app.get('/api/async-error-demo', async () => {
    throw new Error('Express 5 natively catches this rejected promise without next(err)!');
  });

  // 404 Not Found Handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
  });

  // Global Error Handler Middleware
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled Server Error:', err.message);
    res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error'
    });
  });

  return app;
};

export default createApp;

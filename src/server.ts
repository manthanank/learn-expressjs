import dotenv from 'dotenv';
import { createApp } from './app.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`🚀 Express 5 Server is running smoothly at http://localhost:${PORT}`);
  console.log(`👉 Health Check: http://localhost:${PORT}/health`);
  console.log(`👉 Items API: http://localhost:${PORT}/api/items`);
});

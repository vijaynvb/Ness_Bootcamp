import 'reflect-metadata';
import { createApp } from './app';

const port = Number(process.env.PORT || 3000);
const app = createApp();

app.listen(port, () => {
  console.log(`Task Management API running on http://localhost:${port}`);
});

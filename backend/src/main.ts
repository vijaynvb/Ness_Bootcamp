import 'reflect-metadata';
import { createApp } from './app';

const port = Number(process.env.PORT || 8080);
const app = createApp();

app.listen(port, () => {
  console.log(`Task Management API running on http://localhost:${port}`);
});

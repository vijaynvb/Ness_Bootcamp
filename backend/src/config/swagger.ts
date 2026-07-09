import fs from 'fs';
import path from 'path';
import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { parse } from 'yaml';
// configure the local server to point to 8080 port no in development
const PORT = process.env.PORT || 8080;

export function setupSwagger(app: Application): void {
  const specPath = path.resolve(__dirname, '../../../openapi.yaml');
  const specSource = fs.readFileSync(specPath, 'utf8');
  const swaggerSpec = parse(specSource) as Record<string, unknown>;
  swaggerSpec.servers = [{ url: `http://localhost:${PORT}/api` }];

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

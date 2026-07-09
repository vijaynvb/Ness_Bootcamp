declare module 'swagger-ui-express' {
  import { RequestHandler } from 'express';

  const swaggerUi: {
    serve: RequestHandler;
    setup: (spec: unknown) => RequestHandler;
  };

  export default swaggerUi;
}

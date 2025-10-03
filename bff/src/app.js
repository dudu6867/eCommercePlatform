import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes/index.js';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());

app.use('/bff', routes);

// global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

export default app;

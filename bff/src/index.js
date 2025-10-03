import app from './app.js';
import { config } from './config.js';
// import { logger } from './logger.js';

app.listen(config.port, () => {
//   logger.info(`🚀 BFF running on port ${CONFIG.port}`);
    console.log(`BFF running on port ${config.port}`);
});

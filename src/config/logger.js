import { Logger, loggerWrapper } from '../lib/Logger.js';

const logger = Logger(process.env.NODE_ENV, process.env.LOG_DIR);
export default loggerWrapper(logger);

import * as winston from 'winston';
import LokiTransport from 'winston-loki';

export const winstonLokiLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize({
      all: true,
      colors: {
        info: 'blue',
        warn: 'yellow',
        error: 'red',
      },
    }),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, requestId }) => {
      return `${timestamp} [${level}]${requestId ? ` [req:${requestId}]` : ''} ${message}`;
    }),
  ),
  transports: [
    new LokiTransport({
      host: process.env.GRAFANA_LOKI_URL || '', 
      labels: { job: process.env.GRAFANA_JOB_NAME },
      json: true,
    }),
    new winston.transports.Console(),
  ],
});

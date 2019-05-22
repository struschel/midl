import { createLogger, format, LoggerOptions, transports } from 'winston';

const options: LoggerOptions = {
    level: 'silly',
    format: format.combine(
        format.colorize(),
        format.align(),
        format.timestamp(),
        format.printf((info) => {
            const { timestamp, level, message } = info;
            const ts = timestamp.slice(0, 19).replace('T', '');

            return `${ts} [${level}]: ${message}`;
        }),
    ),
};

export const debug = createLogger({
    transports: [new transports.Console(options)],
    exitOnError: false,
});

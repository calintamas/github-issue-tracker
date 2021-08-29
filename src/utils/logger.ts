import {
  configLoggerType,
  consoleTransport,
  logger,
  transportFunctionType
} from 'react-native-logs';

const customTransport: transportFunctionType = (props) => {
  if (__DEV__ && process.env.NODE_ENV !== 'test') {
    const { rawMsg } = props;
    const msg = rawMsg[0];
    if (typeof msg === 'object') {
      // eslint-disable-next-line no-console
      console.log(msg);
    } else {
      consoleTransport(props);
    }
  }
};

const defaultConfig: configLoggerType = {
  severity: __DEV__ ? 'debug' : 'error',
  transport: customTransport,
  transportOptions: {
    color: 'web'
  },
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true
};

const customLogger = logger.createLogger(defaultConfig);

export { customLogger as logger };

import { init, onPointClicked, startTimeout } from './game';
import { Logger } from './logger';
import { Payload, Point } from './../interfaces';
import { RequestType } from '../configs/constants';

export const handleRequest = (request: Payload): Payload | null => {
  Logger.info('REQUEST', request);
  startTimeout();
  switch (request.msg) {
    case RequestType.INITIALIZE:
      return init();
    case RequestType.NODE_CLICKED:
      return onPointClicked(request.body as Point);
    case RequestType.ERROR:
      Logger.error('ERROR', request);
      return null;
    default:
      return null;
  }
};

export const sendResponse = (response: Payload | null): void => {
  if (response) {
    Logger.info('RESPONSE', response);
    app.ports.response.send(response);
  }
};
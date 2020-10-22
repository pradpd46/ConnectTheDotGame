import { MOVE_TIMEOUT_MILLIS } from './../configs/constants';
import { ResponseType, Texts } from "../configs/constants";
import { Payload, Point } from '../interfaces';
import { getActivePlayer, init as initPlayer, togglePlayer } from './player';
import { init as initGameState, isGameOver } from './rules';
import { EMPTY_POINT, getCurrentPoint, isValidEndPoint, isValidStartPoint, processEndPoint, removeEndPoint, setCurrentPoint } from './point';
import { sendResponse } from "./message";

let timeout: number | null = null;

export const init = (): Payload => {
  initPlayer();
  initGameState();
  const activePlayer = getActivePlayer();
  return {
    msg: ResponseType.INITIALIZE,
    body: {
      newLine: null,
      heading: activePlayer.name,
      message: Texts.AWAITING_MOVE.replace('{name}', activePlayer.name)
    }
  };
};

export const onPointClicked = (point: Point): Payload => {
  if (getCurrentPoint() === EMPTY_POINT) {
    return startPointClicked(point);
  } else {
    return endPointClicked(point);
  }
};

export const startPointClicked = (point: Point): Payload => {
  const valid = isValidStartPoint(point);
  const activePlayer = getActivePlayer();
  if (valid) {
    setCurrentPoint(point);
    return {
      msg: ResponseType.VALID_START_NODE,
      body: {
        newLine: null,
        heading: activePlayer.name,
        message: Texts.SELECT_SECOND_NODE
      }
    }
  } else {
    return {
      msg: ResponseType.INVALID_START_NODE,
      body: {
        newLine: null,
        heading: activePlayer.name,
        message: Texts.NOT_VALID_START
      }
    }
  }
}

export const endPointClicked = (point: Point): Payload => {
  const valid = isValidEndPoint(point);
  if (valid) {
    const start = getCurrentPoint();
    processEndPoint(point);
    togglePlayer();
    const activePlayer = getActivePlayer();
    if (isGameOver()) {
      // if (false) {
      return {
        msg: ResponseType.GAME_OVER,
        body: {
          newLine: {
            start,
            end: point
          },
          heading: Texts.GAME_OVER,
          message: Texts.PLAYER_WIN.replace('{name}', activePlayer.name)
        }
      };
    } else {
      return {
        msg: ResponseType.VALID_END_NODE,
        body: {
          newLine: {
            start,
            end: point
          },
          heading: activePlayer.name,
          message: ""
        }
      };
    }
  } else {
    const activePlayer = getActivePlayer();
    removeEndPoint(point);
    return {
      msg: ResponseType.INVALID_END_NODE,
      body: {
        newLine: null,
        heading: activePlayer.name,
        message: Texts.INVALID_MOVE
      }
    };
  }
}

export const startTimeout = (): number | null => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = window.setTimeout(() => {
    const activePlayer = getActivePlayer();
    sendResponse({
      msg: ResponseType.UPDATE_TEXT,
      body: {
        newLine: null,
        heading: activePlayer.name,
        message: Texts.MOVE_TIMEOUT.replace('{name}', activePlayer.name)
      }
    });
  }, MOVE_TIMEOUT_MILLIS);
  return timeout;
}
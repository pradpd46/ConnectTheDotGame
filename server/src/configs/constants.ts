export const enum RequestType {
  INITIALIZE = 'INITIALIZE',
  NODE_CLICKED = 'NODE_CLICKED',
  ERROR = 'ERROR',
}

export const enum ResponseType {
  INITIALIZE = 'INITIALIZE',
  VALID_START_NODE = 'VALID_START_NODE',
  INVALID_START_NODE = 'INVALID_START_NODE',
  VALID_END_NODE = 'VALID_END_NODE',
  INVALID_END_NODE = 'INVALID_END_NODE',
  GAME_OVER = 'GAME_OVER',
  UPDATE_TEXT = 'UPDATE_TEXT'
}

export const enum Texts { 
  AWAITING_MOVE = "Awaiting {name}'s Move",
  SELECT_SECOND_NODE = "Select a second node to complete the line.",
  NOT_VALID_START = "Not a valid starting position.",
  GAME_OVER = 'Game Over',
  PLAYER_WIN = '{name} Wins!',
  INVALID_MOVE = 'Invalid move!',
  MOVE_TIMEOUT = 'Hey {name}, are you asleep?'
}

export const MOVE_TIMEOUT_MILLIS = 5000;
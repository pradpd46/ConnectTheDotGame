import { Player } from './../interfaces';

const players: Player[] = [
  { id: 1, name: 'Player 1' },
  { id: 2, name: 'Player 2' }
];

let activePlayer: Player;

export const init = () => {
  setActivePlayer(players[0]);
}

export const getActivePlayer = (): Player => {
  return activePlayer;
}

export const setActivePlayer = (player: Player): void => {
  activePlayer = player;
}

export const togglePlayer = (): void => {
  setActivePlayer(activePlayer.id === players[0].id ? players[1] : players[0]);
};
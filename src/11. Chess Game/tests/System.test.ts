import System from "../src/System";
import { faker } from "@faker-js/faker";
import Player from "../src/Auth/Player";
import Position from "../src/Game/Board/Position";
import EndLog from "../src/Game/History/EndLog";
import EndType from "../src/Game/History/EndType";
import GameStatus from "../src/Game/GameStatus";
import Color from "../src/Game/Board/Color";

const system = System.getInstance();
const makePlayer = () => {
  const username = faker.internet.userName();
  const password = faker.internet.password();

  system
    .getAuth()
    .registerPlayer(username, password);

  const player = system.getAuth().login(username, password) as Player;

  player.setStrategy((player) => {
    const selfPositions = [];
    const oppositePositions = []
    const boxes = player.getGame().getBoard().getBoxes();

    for (let y = 0; y < boxes.length; y++) {
      const row = boxes[y];
      for (let x = 0; x < row.length; x++) {
        if (boxes[y][x].hasPiece()) {
          if (boxes[y][x].getPiece().getColor() === player.getColor()) {
            selfPositions.push(new Position(y, x));
          } else {
            oppositePositions.push(new Position(y, x));
          }
        }
      }
    }

    while (true) {
      const selfPos = selfPositions[Math.floor(Math.random() * selfPositions.length)];
      const oppositePos = oppositePositions[Math.floor(Math.random() * oppositePositions.length)];

      if (player.getGame().move(selfPos, oppositePos)) {
        break;
      }
    }
  });

  return player;
}

describe('System', () => {
  test('create game', () => {
    const playerA = makePlayer();
    const playerB = makePlayer();
    const game = playerA.createGame(playerB);

    expect(system.getPlayground().getActiveGames().length).toEqual(1);
    const pieces = game.getBoard()
      .getBoxes()
      .map(
        row => row.map(
          box => box.hasPiece()
            ? `${box.getPiece().getColor() === Color.Black ? 'b' : 'w'}:${box.getPiece().constructor.name.slice(0, 1)}`
            : ''
        )
      );
    expect(pieces).toEqual([
      ['w:R', 'w:K', 'w:B', 'w:Q', 'w:K', 'w:B', 'w:K', 'w:R'],
      ['w:P', 'w:P', 'w:P', 'w:P', 'w:P', 'w:P', 'w:P', 'w:P'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['b:P', 'b:P', 'b:P', 'b:P', 'b:P', 'b:P', 'b:P', 'b:P'],
      ['b:R', 'b:K', 'b:B', 'b:Q', 'b:K', 'b:B', 'b:K', 'b:R'],
    ])
  });

  test('leave game', () => {
    const playerA = makePlayer();
    const playerB = makePlayer();
    const game = playerA.createGame(playerB);

    playerA.leaveGame();

    expect(game.isActive()).toBeFalsy();
    expect(game.getStatus()).toEqual(GameStatus.Forfeiture)
    const logs = game.getHistory().getLogs();
    expect(logs.length).toEqual(1)
    expect(logs[0]).toBeInstanceOf(EndLog);
    const log: EndLog = logs[0] as EndLog;
    expect(log.getReason()).toEqual(EndType.Forfeiture);
    expect(log.getWinner()).toEqual(playerB);
    expect(playerA.getScore()).toEqual(0);
    expect(playerB.getScore()).toEqual(1);
  });

  test('resign game', () => {
    const playerA = makePlayer();
    const playerB = makePlayer();
    const game = playerA.createGame(playerB);

    playerA.resign();

    expect(game.isActive()).toBeFalsy();
    expect(game.getStatus()).toEqual(GameStatus.Resigned)
    const logs = game.getHistory().getLogs();
    expect(logs.length).toEqual(1)
    expect(logs[0]).toBeInstanceOf(EndLog);
    const log: EndLog = logs[0] as EndLog;
    expect(log.getReason()).toEqual(EndType.Resign);
    expect(playerA.getScore()).toEqual(0);
    expect(playerB.getScore()).toEqual(1);
  });

  test('play game', () => {
    const playerA = makePlayer();
    const playerB = makePlayer();
    const game = playerA.createGame(playerB);

    game.start();

    expect(game.isActive()).toBeFalsy();
    expect(game.getStatus()).toEqual(GameStatus.Checkmate)
    const logs = game.getHistory().getLogs();
    expect(logs.length).toBeGreaterThanOrEqual(2)
    const endLog: EndLog = logs[logs.length - 1] as EndLog;
    expect(endLog).toBeInstanceOf(EndLog);
    expect(endLog.getReason()).toEqual(EndType.Checkmate);
    expect(playerA.getScore() + playerB.getScore()).toEqual(1);
  });
});

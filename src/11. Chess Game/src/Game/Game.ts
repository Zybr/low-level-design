import Player from "../Auth/Player";
import Board from "./Board/Board";
import Color from "./Board/Color";
import History from "./History/History";
import Position from "./Board/Position";
import MoveController from "./MoveController";
import GameStatus from "./GameStatus";

export default class Game {
  private readonly board = new Board();
  private readonly controller = new MoveController(this.board);
  private players: Player[] = [];
  private status = GameStatus.InProgress;
  private history = new History();

  public constructor(
    private readonly playerA: Player,
    private readonly playerB: Player,
  ) {
    this.players.push(playerA, playerB);

    if (Math.round(Math.random()) === 1) {
      this.players = this.players.reverse();
    }

    const current = this.getCurrentPlayer();
    current.joinGame(this, Color.White);
    this.getOpponent(current).joinGame(this, Color.Black);
  }

  public start(): void {
    this.getCurrentPlayer().handleChange();
  }

  public getStatus(): GameStatus {
    return this.status;
  }

  public isActive(): boolean {
    return this.status === GameStatus.InProgress;
  }

  public getBoard(): Board {
    return this.board;
  }

  public getHistory(): History {
    return this.history;
  }

  public move(srcPosition: Position, dstPosition: Position): boolean {
    this.assertActive();

    if (!this.controller.isValid(srcPosition, dstPosition)) {
      return false;
    }

    this.board.move(srcPosition, dstPosition);

    this.history.move(
      this.getCurrentPlayer(),
      this.board.getBox(srcPosition)?.getPiece(),
      srcPosition,
      dstPosition,
      this.board.getBox(dstPosition)?.getPiece(),
    );

    if (this.controller.isCheckmate()) {
      this.history.checkmate(this.getCurrentPlayer());
      this.endGame(GameStatus.Checkmate, this.getCurrentPlayer());
      return true;
    }

    if (this.controller.isStalemate()) {
      this.history.stalemate();
      this.endGame(GameStatus.Stalemate);
      return true;
    }

    this.switchCurrent();

    return true;
  }

  public forfeiture(loser: Player) {
    this.assertActive();

    const winner = this.getOpponent(loser);
    this.history.forfeiture(winner);
    this.endGame(GameStatus.Forfeiture, winner);
  }

  public resign(loser: Player) {
    this.assertActive();

    const winner = this.getOpponent(loser);
    this.history.resign(winner);
    this.endGame(GameStatus.Resigned, winner);
  }

  private getOpponent(player: Player): Player {
    return this.players.find(opponent => player !== opponent);
  }

  private getCurrentPlayer(): Player {
    return this.players[0];
  }

  private switchCurrent(): void {
    this.players = this.players.reverse();
    this.getCurrentPlayer().handleChange();
  }

  private endGame(status: GameStatus, winner: Player | null = null): void {
    this.assertActive();

    this.status = status;
    winner?.incrementScore();
    this.players.forEach(player => player.leaveGame());
  }

  private assertActive(): void {
    if (!this.isActive()) {
      throw new Error('Game is not active anymore');
    }
  }
}

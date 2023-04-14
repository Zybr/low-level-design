import Puzzle from "../src/Puzzle";

describe('Puzzle', () => {
  const width = 4;
  const height = 3;
  const puzzle = new Puzzle(width, height)

  test('assemble puzzle', () => {
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        for (const piece of puzzle.getFreePieces()) {
          if (puzzle.doesMatch(piece, r, c)) {
            puzzle.insertPiece(piece, r, c);
            expect(puzzle.isCompleted()).toEqual(r === height - 1 && c === width - 1)
            break
          }
        }
      }
    }
    expect(puzzle.isCompleted()).toBeTruthy();
  });
});

import PiecesGenerator from "../src/PiecesGenerator";

describe('PiecesGenerator', () => {
  const generator = new PiecesGenerator();

  test('generate', () => {
    const width = 4;
    const height = 3;
    const matrix = generator.generate(width, height);

    expect(matrix).toHaveLength(height)
    expect(matrix[0]).toHaveLength(width)

    expect(matrix[0][0].isCorner())
    expect(matrix[0][1].isEdge())
    expect(matrix[0][2].isEdge())
    expect(matrix[0][3].isCorner())

    expect(matrix[1][0].isCorner())
    expect(matrix[1][1].isMiddle())
    expect(matrix[1][2].isMiddle())
    expect(matrix[1][3].isCorner())

    expect(matrix[2][0].isCorner())
    expect(matrix[2][1].isEdge())
    expect(matrix[2][2].isEdge())
    expect(matrix[2][3].isCorner())

    expect(matrix[1][1].getTopSide().doesMatch(matrix[0][0].getBottomSide())).toBeFalsy();
    expect(matrix[1][1].getTopSide().doesMatch(matrix[0][1].getBottomSide())).toBeTruthy();
    expect(matrix[1][1].getTopSide().doesMatch(matrix[0][2].getBottomSide())).toBeFalsy();
    expect(matrix[1][1].getTopSide().doesMatch(matrix[0][3].getBottomSide())).toBeFalsy();

    expect(matrix[1][1].getRightSide().doesMatch(matrix[0][2].getLeftSide())).toBeFalsy();
    expect(matrix[1][1].getRightSide().doesMatch(matrix[1][2].getLeftSide())).toBeTruthy();
    expect(matrix[1][1].getRightSide().doesMatch(matrix[2][2].getLeftSide())).toBeFalsy();

    expect(matrix[1][1].getBottomSide().doesMatch(matrix[2][0].getTopSide())).toBeFalsy();
    expect(matrix[1][1].getBottomSide().doesMatch(matrix[2][1].getTopSide())).toBeTruthy();
    expect(matrix[1][1].getBottomSide().doesMatch(matrix[2][2].getTopSide())).toBeFalsy();
    expect(matrix[1][1].getBottomSide().doesMatch(matrix[2][3].getTopSide())).toBeFalsy();

    expect(matrix[1][1].getLeftSide().doesMatch(matrix[0][0].getRightSide())).toBeFalsy();
    expect(matrix[1][1].getLeftSide().doesMatch(matrix[1][0].getRightSide())).toBeTruthy();
    expect(matrix[1][1].getLeftSide().doesMatch(matrix[2][0].getRightSide())).toBeFalsy();
  });
});

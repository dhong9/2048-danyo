/**
 * 2048 game utility
 */
class Twenty48_Danyo {

    /**
     * Constructor for 2048 game spawns 2 random 2/4 tiles
     * onto the 4x4 game board
     */
    constructor() {
        // Initialize 4x4 empty board
        this.board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];

        // Guarantee one '2' tile
        this.spawnTile(this.board, false);

        // Other tile can be either '2' or '4'
        this.spawnTile(this.board, true);

        this.score = 0;
    }

    /**
     * Spawns a tile (2 or 4) on a random empty
     * tile of the board
     * @param {Array<Array<Number>>} board current game board
     * @param {boolean} rand flag for randomly using a 2 or a 4
     */
    spawnTile(board, rand) {
        // Decide what value tile should be
        const n = rand ? Math.random() < .8 ? 2 : 4 : 2;

        // Find a random empty cell
        let r, c;
        do {
            r = (Math.random() * 4) | 0;
            c = (Math.random() * 4) | 0;
        } while (board[r][c]);

        board[r][c] = n;
    }

    /**
     * Copies 2D array by value into another 2D array
     * @param {Array<Array<Number>>} board current game board
     * represented by 2D array of numbers
     * @returns deep copy of input board
     */
    copyBoard(board) {
        return board.map(row => [...row]);
    }

    /**
     * Rotates board 90 degrees counter clockwise
     * @param {Array<Array<Number>>} board current game board
     * @returns rotated board
     */
    rot90(board) {
        const result = [];
        for (let i = 0; i < 4; i++) {
            result.push([]);
            for (let j = 3; j >= 0; j--) {
                result[i][3 - j] = board[j][i];
            }
        }
        return result;
    }

    /**
     * Moves tile in board all to one side
     * @param {Array<Array<Number>>} board current game board
     * @param {String} dir direction to move tiles in (L, U, R, D)
     * @returns board with tiles moved
     */
    makeMove(board, dir) {
        let updatedBoard = this.copyBoard(board);

        // Helper function to move tiles
        const move = (j) => {
            if ("LDRU"[j] === dir) {
                updatedBoard = updatedBoard.map((row) =>
                row.map(
                    (_, x) =>
                    +row
                        .filter((a) => a)
                        .join(" ")
                        .replace(/\b(\d+) \1\b/g, (a, b) => {
                            const prod = 2 * b;
                            this.score += !x * prod;
                            return prod;
                        })
                        .split(/ /)[x] || 0
                )
                );
            }

            // Rotate
            return this.rot90(updatedBoard);
        };

        for (let j = 0; j < 4; j++) {
            updatedBoard = move(j);
        }

        return updatedBoard;
    }

    /**
     * Checks if the game board for an empty square
     * @param {Array<Array<Number>>} board current game board
     * @returns true if the board has an empty square
     */
    hasEmptySquare(board) {
        return board.some((row) => row.some((e) => !e));
    }
    
    /**
     * Checks if the board has tiles that can be merged.
     * Note that it's okay for empty tiles to return true
     * because this utility is used as part of checking
     * for legal moves
     * @param {Array<Array<Number>>} board current game board
     * @returns true if any tiles can be merged
     */
    hasMergableTiles(board) {
        const dir = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
        ];
        return board.some((row, i) =>
            row.some((v, j) =>
            dir.some(([dRow, dCol]) => {
                const nextRow = i + dRow,
                nextCol = j + dCol;
                return (
                    nextRow >= 0 &&
                    nextRow < 4 &&
                    nextCol >= 0 &&
                    nextCol < 4 &&
                    board[nextRow][nextCol] === v
                );
            })
            )
        );
    }

    /**
     * Checks if the game is over because there are no more legal moves
     * @param {Array<Array<Number>>} board current game board
     * @returns true if the game is over
     */
    gameOver(board) {
        return !this.hasEmptySquare(board) && !this.hasMergableTiles(board);
    }

    /**
     * Provides string representation of the board
     * @returns board in string format
     */
    toString() {
        return this.board.map(row => row.map(v => v || '.').join('')).join('\n');
    }
}

module.exports = Twenty48_Danyo;
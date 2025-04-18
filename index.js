class Twenty48_Danyo {
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
    }

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

    copyBoard(board) {
        return board.map(row => [...row]);
    }

    rot90(board) {
        const result = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 3; j >= 0; j--) {
                result[i][3 - j] = board[j][i];
            }
        }
        return result;
    }

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
                        .replace(/\b(\d+) \1\b/g, (a, b) => b * 2)
                        .split(/ /)[x] || 0
                )
                );
            }

            // Rotate
            return this.rot90(updatedBoard);
        };

        for (let j = 0; j < 4; j += 1) {
            updatedBoard = move(j);
        }

        return updatedBoard;
    }
}
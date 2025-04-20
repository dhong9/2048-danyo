# 2048 Game Utility

A lightweight and extensible Node.js utility for managing the core logic of the classic 2048 game. This utility includes board initialization, tile spawning, movement logic, and game-over detection - ideal for building 2048 game UIs, simulations, or reinforcement learning environments.

## Installation

You can install this package using npm:

```sh
npm install twenty48-danyo
```

## Usage

### Importing the Module

```js
const Twenty48 = require('twenty48-danyo');
```

### Creating a Game Instance

```js
const game = new Twenty48();
console.log(game.board); // Prints the initial board
```

### Spawning a tile

Spawns a tile on a random empty square

```js
game.spawnTile(game.board, true);
console.log(game.board); // Prints the board after spawning a tile
```

### Copying a board

Returns a deep copy of the provided board

```js
const boardCopy = game.copyBoard(game.board);
console.log(boardCopy); // Prints the copied board
```

### Rotating a board

Rotates a board 90 degrees counter clockwise

```js
const rotatedBoard = game.rot90(game.board);
console.log(rotatedBoard); // Prints the rotated board
```

### Making a move

Performs a move in the specified direction, where:
- `L` is left
- `R` is right
- `U` is up
- `D` is down

```js
game.makeMove(game.board, 'L');
console.log(game.board) // Prints the board after moving tiles left
```

### Checking for an empty square

One of the conditions for the game to still be playable is for it to have at least one empty square.

```js
const hasEmptySquare = game.hasEmptySquare(game.board);
console.log(hasEmptySquare); // true or false
```

### Checking for tiles that can be merged

One of the conditions for the game to still be playable is for it to have at least one pair of tiles that can be merged.

```js
const hasMergableTiles = game.hasMergableTiles(game.board);
console.log(hasMergableTiles); // true or false
```

### Checking game over status

Checks for any remaining legal moves

```js
const isGameOver = game.gameOver(game.board);
console.log(isGameOver); // true or false
```

### String representation of the game board

Returns a string representation of the current board. Empty cells are shown as `.`.

```js
const str = game.toString();
console.log(str);
```

**Example Output**
```txt
2..2
....
....
....
```

## License

This project is licensed under the MIT License.
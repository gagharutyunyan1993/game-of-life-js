# The Game of Life
This is a web implementation of John Conway's [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) cellular automaton. The game is played on a two-dimensional grid of cells, where each cell can be in one of two states - alive or dead. The game follows a set of rules that determine whether each cell will be alive or dead in the next generation.

![demo](https://user-images.githubusercontent.com/53352872/235380321-1b0c45ed-b2d4-4e34-a0a6-cb71c7f39026.gif)

## How to Play
You can interact with the game by clicking on the cells to toggle their state between alive and dead. You can start and pause the game by clicking the Start and Pause buttons respectively. You can also reset the game to its initial state or shuffle the cells by clicking the Reset and Shuffle buttons respectively.

## Implementation Details
The game is implemented using JavaScript and HTML5 canvas. The game board is represented as a two-dimensional array of boolean values, where true represents an alive cell and false represents a dead cell. The game loop is implemented using a web worker to avoid blocking the main thread. The worker calculates the next generation of cells based on the current game board and sends the updated game board back to the main thread to be drawn on the canvas.

## How to Run
You can clone the repository and run the game locally by opening the index.html file in your web browser. You can also host the files on a web server to make the game accessible over the internet.

### Note: 
This implementation is provided for educational purposes and may not be the most efficient solution. There are many ways to optimize the algorithm for Conway's Game of Life, and this code can be used as a starting point for further experimentation and improvement.

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit/).
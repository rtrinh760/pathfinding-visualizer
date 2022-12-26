import { useState, useEffect } from "react";
import "./Pathfinder.css";
import "./Square.css";
import Square from "./Square";
import { depthFirstSearch } from "./algorithms/DFSAlgorithm";
import { breadthFirstSearch } from "./algorithms/BFSAlgorithm";

const ROWS = 20;
const COLS = 30;

const Pathfind = () => {
  const [grid, setGrid] = useState<any[]>([]);
  const [path, setPath] = useState<any[]>([]);
  const [visitedCells, setVisitedCells] = useState<any[]>([]);

  useEffect(() => {
    runAlgorithm();
  }, []);

  const runAlgorithm = () => {
    const tempGrid = createGrid();
    const [startCell, endCell] = randomizeStartAndEnd(tempGrid);
    setTimeout(() => {
      const [completePath, visitedSquares] = breadthFirstSearch(
        startCell,
        endCell,
        tempGrid
      );
      setPath(completePath);
      setVisitedCells(visitedSquares);
    }, 5);
  };

  const createSquares = (initialGrid: any) => {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        initialGrid[i][j] = new (gridSquare as any)(i, j);
      }
    }
  };

  function gridSquare(this: any, i: number, j: number) {
    this.row = i;
    this.col = j;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.visited = false;
    this.previous = null;
    this.start = false;
    this.end = false;
    this.wall = false;
    if (Math.random() < 0.2 && (!this.start || !this.end)) {
      this.wall = true;
    }
  }

  const setStart = (gridSquare: any) => {
    gridSquare.start = true;
    return gridSquare;
  };

  const setEnd = (gridSquare: any) => {
    gridSquare.end = true;
    return gridSquare;
  };

  const randomizeStartAndEnd = (grid: typeof gridSquare[][]) => {
    let randomSquareRow = Math.floor(Math.random() * grid.length);
    let randomSquareCol = Math.floor(Math.random() * grid.length);
    let startSquare = setStart(grid[randomSquareRow][randomSquareCol]);

    randomSquareRow = Math.floor(Math.random() * grid.length);
    randomSquareCol = Math.floor(Math.random() * grid.length);
    let endSquare = setEnd(grid[randomSquareRow][randomSquareCol]);
    return [startSquare, endSquare];
  };

  const createGrid = () => {
    const initialGrid: any = new Array(ROWS);
    for (let i = 0; i < ROWS; i++) {
      initialGrid[i] = new Array(COLS);
    }

    createSquares(initialGrid);
    setGrid(initialGrid);
    return initialGrid;
  };

  const visualizeAlgorithm = () => {
    for (let i = 0; i <= visitedCells.length; i++) {
      if (i === visitedCells.length) {
        visualizeShortestPath(i, path);
      } else {
        const visitedSquare = visitedCells[i];

        if (!visitedSquare.start && !visitedSquare.end) {
          // Sets an increased delay for each visited cell
          setTimeout(() => {
            document.getElementById(
              `square-${visitedSquare.row}-${visitedSquare.col}`
            )!.className = "square square-visited";
          }, i * 30);
        }
      }
    }
  };
  const visualizeShortestPath = (curCellDelay: number, pathFound: any[]) => {
    // Keep track of delay to animate the found path afterwards (could be a better way of doing this)
    for (let i = 0; i < pathFound.length; i++) {
      const shortestPathSquare = pathFound[i];

      if (!shortestPathSquare.start && !shortestPathSquare.end) {
        setTimeout(() => {
          document.getElementById(
            `square-${shortestPathSquare.row}-${shortestPathSquare.col}`
          )!.className = "square square-shortest-path";
        }, curCellDelay * 30);
        curCellDelay++;
      }
    }
  };

  // class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  return (
    <div className="visualizer">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={visualizeAlgorithm}
      >
        Visualize Path
      </button>
      <button className="clear-btn" onClick={visualizeAlgorithm}>
        Clear
      </button>

      <div>
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="flex">
              {row.map((col: any, colIndex: any) => {
                const { start, end, wall } = col;
                return (
                  <Square
                    key={colIndex}
                    start={start}
                    end={end}
                    wall={wall}
                    row={rowIndex}
                    col={colIndex}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export function Pathfinder() {
  return <div className="grid">{<Pathfind />}</div>;
}

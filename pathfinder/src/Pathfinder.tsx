import { useState, useEffect } from "react";
import "./Pathfinder.css";
import Square from "./Square";
import { DFS } from "./algorithms/DFSAlgorithm";

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
    setTimeout(() => {
      const startCell = tempGrid[0][0];
      const endCell = tempGrid[ROWS - 1][COLS - 1];

      const [completePath, visitedSquares] = DFS(startCell, endCell, tempGrid);
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
    this.start = this.row === 0 && this.col === 0;
    this.end = this.row === ROWS - 1 && this.col === COLS - 1;
    this.wall = false;
    if (Math.random() < 0.2 && (!this.start || !this.end)) {
      this.wall = true;
    }
  }

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
    visualizeVisitedCells();
    setTimeout(() => {
      visualizeShortestPath(path);
    }, 5000);
  };

  const visualizeVisitedCells = () => {
    console.log(visitedCells);
    for (let i = 0; i <= visitedCells.length; i++) {
      const visitedSquare = visitedCells[i];
      console.log(visitedSquare.row + " " + visitedSquare.col)
      setTimeout(() => {
        document.getElementById(
          `square-${visitedSquare.row}-${visitedSquare.col}`
        )!.className = "square square-visited";
      }, i * 30);
      // if (!visitedSquare.start && !visitedSquare.end) {
      // }
    }
  };
  const visualizeShortestPath = (pathFound: any[]) => {
    for (let i = 0; i <= pathFound.length; i++) {
      const shortestPathSquare = pathFound[i];

      if (!shortestPathSquare.start && !shortestPathSquare.end) {
        setTimeout(() => {
          document.getElementById(
            `square-${shortestPathSquare.row}-${shortestPathSquare.col}`
          )!.className = "square square-shortest-path";
        }, i * 30);
      }
    }
    console.log("ran");
  };

  return (
    <div className="visualizer">
      <button className="visualize-btn" onClick={visualizeAlgorithm}>
        Visualize Path
      </button>

      <div>
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
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

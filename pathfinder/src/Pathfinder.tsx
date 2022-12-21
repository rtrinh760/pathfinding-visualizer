import { useState, useEffect, startTransition } from "react";
import "./Pathfinder.css";
import Square from "./Square";

const ROWS = 10;
const COLS = 15;

type SquareProps = {
  squareRow: number;
  squareCol: number;
  isFree: boolean;
  g?: number;
  f?: number;
  h?: number;
};

const NewGrid = () => {
  const [grid, setGrid] = useState<any[]>([]);

  useEffect(() => {
    createGrid();
  }, []);

  const createGrid = () => {
    const initialGrid: any = new Array(ROWS);
    for (let i = 0; i < ROWS; i++) {
      initialGrid[i] = new Array(COLS);
    }

    createSquares(initialGrid);
    setGrid(initialGrid);
    console.log(grid);
  };

  const createSquares = (grid: any) => {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        grid[i][j] = new (gridSquare as any)(i, j);
      }
    }
  };

  function gridSquare(this: any, i: number, j: number) {
    this.x = i;
    this.y = j;
    this.visited = false;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.start = this.x === 0 && this.y === 0;
    this.end = this.x = ROWS-1 && this.y === COLS-1;
  }

  return (
    <div>
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row">
            {row.map((col: any, colIndex: any) => {
              const { start, end } = col;
              return <Square key={colIndex} isStart={start} isEnd={end} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export function Pathfinder() {
  return <div className="grid">{<NewGrid />}</div>;
}

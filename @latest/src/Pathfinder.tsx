import { useState, useEffect } from "react";
import "./Pathfinder.css";
import Square from "./Square";

const ROWS = 10;
const COLS = 10;

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
    const initialGrid: any = new Array(COLS);
    for (let i = 0; i < COLS; i++) {
      initialGrid[i] = new Array(ROWS);
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
    this.g = 0;
    this.f = 0;
    this.h = 0;
  }

  return (
    <div>
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row">
            {row.map((col: any, colIndex: any) => {
              return <Square key={colIndex} />;
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

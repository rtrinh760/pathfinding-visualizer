import { useState, useEffect, useReducer } from "react";
import "../Pathfinder.css";
import Cell from "./Cell";
import GridCell from "./GridCell";
import { depthFirstSearch } from "../algorithms/DFSAlgorithm";
import { breadthFirstSearch } from "../algorithms/BFSAlgorithm";

const Pathfind = () => {
  const ROWS = 20;
  const COLS = 40;
  const wallChance = 0.30

  const initializeGrid = () => {
    const initialGrid: any = new Array(ROWS);
    for (let i = 0; i < ROWS; i++) {
      initialGrid[i] = new Array(COLS);
      for (let j = 0; j < initialGrid[i].length; j++) {
        initialGrid[i][j] = new GridCell(i, j);
      }
    }

    initialGrid[5][5].setStart();
    initialGrid[ROWS - 5][COLS - 5].setEnd();
    return initialGrid;
  };

  const [grid, _] = useState<GridCell[][]>(initializeGrid());
  const [disableButtons, setDisableButtons] = useState<boolean>(false);

  useEffect(() => {
    createGrid(wallChance);
  }, []);

  const runAlgorithm = () => {
    const startCell = grid[5][5];
    const endCell = grid[ROWS - 5][COLS - 5];
    const [completePath, visitedCells] = breadthFirstSearch(
      startCell,
      endCell,
      grid
    );

    return [completePath, visitedCells];
  };

  const clearGrid = () => {
    for (const row of grid) {
      for (const cell of row) {
        cell.reset();
        if (!cell.isStart() && !cell.isEnd()) {
          cell.setFree();
        }
      }
    }
  };

  const createGrid = (chance: number) => {
    clearGrid();
    for (const row of grid) {
      for (const cell of row) {
        if (Math.random() < chance && !cell.isStart() && !cell.isEnd()) {
          cell.setWall();
        }

        // or else cells on the page may gain the wrong className
        const cellType = cell.isStart()
          ? "cell-start"
          : cell.isEnd()
          ? "cell-end"
          : cell.isWall()
          ? "cell-wall"
          : "";
        document.getElementById(
          `cell-${cell.row}-${cell.col}`
        )!.className = `cell ${cellType}`;
      }
    }
  };

  const visualizeAlgorithm = () => {
    const [path, visitedCells] = runAlgorithm();
    // To disable buttons during animation
    const timeToAnimate = (path.length + visitedCells.length) * 30

    setTimeout(() => {
      for (let i = 0; i <= visitedCells.length; i++) {
        if (i === visitedCells.length) {
          visualizeShortestPath(i, path);
        } else {
          const visitedCell = visitedCells[i];

          if (!visitedCell.isStart() && !visitedCell.isEnd()) {
            // Sets an increased delay for each visited cell
            setTimeout(() => {
              document.getElementById(
                `cell-${visitedCell.row}-${visitedCell.col}`
              )!.className = "cell cell-visited";
            }, i * 30);
          }
        }
      }
    }, 10);
    
    return timeToAnimate;
  };

  const visualizeShortestPath = (
    curCellDelay: number,
    pathFound: GridCell[]
  ) => {
    // Keep track of delay to animate the found path afterwards (could be a better way of doing this)
    for (let i = 0; i < pathFound.length; i++) {
      const shortestPathCell = pathFound[i];

      if (!shortestPathCell.isStart() && !shortestPathCell.isEnd()) {
        setTimeout(() => {
          document.getElementById(
            `cell-${shortestPathCell.row}-${shortestPathCell.col}`
          )!.className = "cell cell-shortest-path";
        }, curCellDelay * 30);
        curCellDelay++;
      }
    }
  };

  const handleDisable = (button: any) => {
    button.disabled = true
  };

  const handleEnable = (button: any) => {
    setDisableButtons(false);
  }

  return (
    <div className="visualizer">
      <div className="mt-4 mb-4 space-x-2 flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-0.5 rounded disabled:opacity-80"
          disabled={disableButtons}
          onClick={() => {
            setDisableButtons(true)
            const timeToAnimate = visualizeAlgorithm();
            setTimeout(() => {
              setDisableButtons(false)
            }, timeToAnimate)
          }}
        >
          Visualize Path
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-80"
          disabled={disableButtons}
          onClick={() => {
            createGrid(0);
          }}
        >
          Clear
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-80"
          disabled={disableButtons}
          onClick={() => {
            createGrid(wallChance);
          }}
        >
          New Maze
        </button>
      </div>

      <div>
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {row.map((gridCell: GridCell, colIndex: number) => {
                return (
                  <Cell
                    key={colIndex}
                    row={rowIndex}
                    col={colIndex}
                    gridCell={gridCell}
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

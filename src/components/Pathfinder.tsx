import { useState, useEffect, Fragment } from "react";
import "../Pathfinder.css";
import Cell from "./Cell";
import GridCell from "./GridCell";
import { depthFirstSearch } from "../algorithms/DFSAlgorithm";
import { breadthFirstSearch } from "../algorithms/BFSAlgorithm";
import { AStar } from "../algorithms/AStar";
import Dropdown from "./Dropdown";

const Pathfind = () => {
  const ROWS = 20;
  const COLS = 40;
  const wallChance = 0.3;

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
  const [open, setOpen] = useState<boolean>(false);
  const [curAlgorithm, setCurAlgorithm] = useState<string>("dfs");

  const handleDisable = () => {
    setDisableButtons(!disableButtons);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuItem = () => {
    setOpen(false);
  };

  useEffect(() => {
    createGrid(wallChance);
  }, []);

  const runAlgorithm = () => {
    const startCell = grid[5][5];
    const endCell = grid[ROWS - 5][COLS - 5];
    let completePath: GridCell[] = [];
    let visitedCells: GridCell[] = [];

    if (curAlgorithm === "dfs") {
      [completePath, visitedCells] = depthFirstSearch(startCell, endCell, grid);
    } else if (curAlgorithm === "bfs") {
      [completePath, visitedCells] = breadthFirstSearch(
        startCell,
        endCell,
        grid
      );
    } else if (curAlgorithm === "astar") {
      [completePath, visitedCells] = AStar(startCell, endCell, grid);
    } else {
      [completePath, visitedCells] = depthFirstSearch(startCell, endCell, grid);
    }

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
    const timeToAnimate = path.length * 30 + visitedCells.length * 30;

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
    // Keep track of delay to animate the found path afterwards
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

  return (
    <div className="visualizer">
      <div className="mt-4 mb-4 space-x-2 flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-0.5 rounded disabled:opacity-80"
          disabled={disableButtons}
          onClick={() => {
            handleDisable();
            const timeToAnimate = visualizeAlgorithm();
            setTimeout(() => {
              setDisableButtons(false);
            }, timeToAnimate);
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

        <Dropdown
          open={open}
          trigger={
            <Fragment>
              <button
                onClick={() => {
                  handleOpen();
                  handleDisable();
                }}
                disabled={disableButtons}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-80"
              >
                Select Algorithm
              </button>
            </Fragment>
          }
          menu={[
            <button
              onClick={() => {
                handleMenuItem();
                setCurAlgorithm("dfs");
                setDisableButtons(false);
              }}
              className="px-2 block w-full hover:bg-blue-500 hover:text-white"
              /**outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32 */
              /**rounded-sm px-3 py-1 hover:bg-gray-100 */
            >
              Depth-First-Search
            </button>,
            <button
              className="px-1 block w-full hover:bg-blue-500 hover:text-white"
              onClick={() => {
                handleMenuItem();
                setCurAlgorithm("bfs");
                setDisableButtons(false);
              }}
            >
              Breadth-First-Search
            </button>,
            <button
              className="px-1 block w-full hover:bg-blue-500 hover:text-white"
              onClick={() => {
                handleMenuItem();
                setCurAlgorithm("astar");
                setDisableButtons(false);
              }}
            >
              A*
            </button>,
          ]}
        />
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
  return (
    <div>
      <div className="grid">{<Pathfind />}</div>
      <p className="text-center text-black text-2xl pt-10">
        <a href="https://github.com/rtrinh760">Made with ❤️ by Richard Trinh</a>
      </p>
    </div>
  );
}

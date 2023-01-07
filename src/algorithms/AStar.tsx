import { getNeighbors, getPathFound } from "./GridMethods";
import GridCell from "../components/GridCell";

export function AStar(start: GridCell, end: GridCell, grid: GridCell[][]) {
  let lowestIndex: number = 0;
  let openSet: GridCell[] = [];
  let closedSet: GridCell[] = [];
  let path: GridCell[] = [];
  let visitedCells: GridCell[] = [];

  start.g = 0;
  start.f = heuristic(start, end);
  openSet.push(start);
  start.visited = true;
  visitedCells.push(start);

  while (openSet.length > 0) {
    lowestIndex = 0;

    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }

    const current = openSet[lowestIndex];
    if (current.isEnd()) {
      path = getPathFound(end);
      return [path, visitedCells];
    }
    // remove cheapest cell from openSet
    if (lowestIndex > -1) openSet.splice(lowestIndex, 1);
    closedSet.push(current);

    const currentNeighbors = getNeighbors(current, grid);

    for (const neighbor of currentNeighbors) {
      if (!closedSet.includes(neighbor) && !neighbor.isWall()) {
        let tentativeG = current.g + heuristic(neighbor, current);

        let isBetterPath = false;

        if (openSet.includes(neighbor)) {
          if (tentativeG < neighbor.g) {
            neighbor.g = tentativeG;
            isBetterPath = true;
          }
        } else {
          neighbor.g = tentativeG;
          isBetterPath = true;
          openSet.push(neighbor);

          neighbor.visited = true;
          if (!visitedCells.includes(neighbor)) {
            visitedCells.push(neighbor);
          }
        }

        if (isBetterPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  }

  return [path, visitedCells];
}

function heuristic(curCell: GridCell, target: GridCell) {
  // Manhattan distance
  const distance: number =
    Math.abs(curCell.row - target.row) + Math.abs(curCell.col - target.col);

  return distance;
}

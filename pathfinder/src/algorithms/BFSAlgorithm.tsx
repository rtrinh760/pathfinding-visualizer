import { getNeighbors, getPathFound } from "./GridMethods";
import GridCell from "../components/GridCell";

export function breadthFirstSearch(start: GridCell, end: GridCell, grid: GridCell[][]) {
  let queue: GridCell[] = [];
  let path: GridCell[] = [];
  let visitedCells: GridCell[] = [];
  queue.push(start);

  while (queue.length != 0) {
    const currentCell = queue.shift() as GridCell;
    if (!currentCell.isVisited() && !currentCell.isWall()) {
      currentCell.visited = true;
      visitedCells.push(currentCell);

      const currentNeighbors = getNeighbors(currentCell, grid);

      for (let i = 0; i < currentNeighbors.length; i++) {
        const neighbor = currentNeighbors[i];

        queue.push(neighbor);
        neighbor.previous = currentCell;

        if (neighbor === end) {
          path = getPathFound(end);
          return [path, visitedCells];
        }
      }
    }
  }
  return [path, visitedCells];
}

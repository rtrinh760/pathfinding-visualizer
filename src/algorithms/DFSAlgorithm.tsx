import { getNeighbors, getPathFound } from "./GridMethods";
import GridCell from "../components/GridCell";

export function depthFirstSearch(start: GridCell, end: GridCell, grid: GridCell[][]) {
  let stack: GridCell[] = [];
  let path: GridCell[] = [];
  let visitedCells: GridCell[] = [];
  stack.push(start);

  while (stack.length != 0) {
    const currentCell: GridCell = stack.pop() as GridCell;
    if (!(currentCell.isVisited()) && !(currentCell.isWall())) {
      currentCell.visited = true;
      visitedCells.push(currentCell);

      const currentNeighbors = getNeighbors(currentCell, grid);

      for (let i = 0; i < currentNeighbors.length; i++) {
        const neighbor = currentNeighbors[i];

        stack.push(neighbor);
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

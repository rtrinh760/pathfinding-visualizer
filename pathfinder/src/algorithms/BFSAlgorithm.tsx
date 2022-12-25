import { getNeighbors, getPathFound } from "./GridMethods";

export function breadthFirstSearch(start: any, end: any, grid: any) {
  let queue = [];
  let path: any = [];
  let visitedSquares: any = [];
  queue.push(start);

  while (queue.length != 0) {
    const currentCell = queue.shift();
    if (!currentCell.visited && !currentCell.wall) {
      currentCell.visited = true;
      visitedSquares.push(currentCell);

      const currentNeighbors = getNeighbors(currentCell, grid);

      for (let i = 0; i < currentNeighbors.length; i++) {
        const neighbor = currentNeighbors[i];

        queue.push(neighbor);
        neighbor.previous = currentCell;

        if (neighbor === end) {
          path = getPathFound(end);
          return [path, visitedSquares];
        }
      }
    }
  }
  return [path, visitedSquares];
}

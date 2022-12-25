import { getNeighbors, getPathFound } from "./GridMethods";

export function depthFirstSearch(start: any, end: any, grid: any) {
  let stack = [];
  let path: any = [];
  let visitedSquares: any = [];
  stack.push(start);

  while (stack.length != 0) {
    const currentCell = stack.pop();
    if (!currentCell.visited && !currentCell.wall) {
      currentCell.visited = true;
      visitedSquares.push(currentCell);

      const currentNeighbors = getNeighbors(currentCell, grid);

      for (let i = 0; i < currentNeighbors.length; i++) {
        const neighbor = currentNeighbors[i];

        stack.push(neighbor);
        neighbor.previous = currentCell;

        if (neighbor === end) {
          path = getPathFound(end);
          return [ path, visitedSquares ];
        }
      }
    }
  }
  return [ path, visitedSquares ];
}

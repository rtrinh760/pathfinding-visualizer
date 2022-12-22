export function DFS(start: any, end: any, grid: any) {
  let stack = [];
  let foundPath = false;
  stack.push(start);
  console.log(end.row + " " + end.col);

  while (stack.length != 0) {
    const currentCell = stack.pop();
    if (!currentCell.visited) {
      currentCell.visited = true;
      const { row, col } = currentCell;
      console.log(currentCell);

      const currentNeighbors = getNeighbors(currentCell, grid);

      for (let i = 0; i < currentNeighbors.length; i++) {
        const neighbor = currentNeighbors[i];

        stack.push(neighbor);
        neighbor.previous = currentCell;

        if (neighbor === end) {
          console.log("Path found!");
          console.log(getPathFound(end));
          return true;
        }
      }
    }
  }
  return false;
}

function getNeighbors(cell: any, grid: any) {
  let neighbors = [];
  let { row, col } = cell;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  neighbors = neighbors.filter((neighbor) => !neighbor.visited);

  return neighbors;
}

function getPathFound(endCell: any) {
  let currentCell = endCell;
  let pathFound = [];

  while (currentCell != null) {
    pathFound.unshift(currentCell);
    currentCell = currentCell.previous;
  }
  return pathFound;
}

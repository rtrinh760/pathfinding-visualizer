export function getNeighbors(cell: any, grid: any) {
    let neighbors = [];
    let { row, col } = cell;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
    neighbors = neighbors.filter((neighbor) => !neighbor.visited);
  
    return neighbors;
  }
  
  export function getPathFound(endCell: any) {
    let currentCell = endCell;
    let pathFound = [];
  
    while (currentCell != null) {
      pathFound.unshift(currentCell);
      currentCell = currentCell.previous;
    }
    return pathFound;
  }
import GridCell from "../components/GridCell";

export function getNeighbors(cell: GridCell, grid: GridCell[][]) {
    let neighbors: GridCell[] = [];
    let { row, col } = cell;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
    neighbors = neighbors.filter((neighbor) => !neighbor.isVisited());
  
    return neighbors;
  }
  
  export function getPathFound(endCell: GridCell) {
    let currentCell: GridCell = endCell;
    let pathFound = [];
  
    while (currentCell != null) {
      pathFound.unshift(currentCell);
      currentCell = currentCell.previous as GridCell;
    }
    return pathFound;
  }
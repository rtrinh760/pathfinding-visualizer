export function DFS() {





}

export function getNeighbors(cell: {row: number, col: number}, grid: any) {
    let neighbors = [];
    let { row, col } = cell;

    if ((row > 0)) neighbors.push(grid[row-1][col])
    if((col > 0)) neighbors.push(grid[row][col-1])
    if((row < grid.length - 1)) neighbors.push(grid[row+1][col])
    if((col < grid[0].length - 1)) neighbors.push(grid[row][col-1])
    
    neighbors.filter((neighbor) => !neighbor.visited)
}
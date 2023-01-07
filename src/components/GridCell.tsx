enum CellType {
  Free,
  Wall,
  Start,
  End,
}

export default class GridCell {
  constructor(
    readonly row: number,
    readonly col: number,
    public g: number = Infinity,
    public f: number = Infinity,
    public h: number = 0,
    public cellType: CellType = CellType.Free,
    public visited: boolean = false,
    public previous: GridCell | null = null
  ) {
    this.row = row;
    this.col = col;
  }

  public reset() {
    this.previous = null;
    this.visited = false;
    this.g = Infinity;
    this.f = Infinity;
    this.h = 0;
  }

  public setStart() {
    this.cellType = CellType.Start;
  }

  public setEnd() {
    this.cellType = CellType.End;
  }

  public setWall() {
    this.cellType = CellType.Wall;
  }

  public setFree() {
    this.cellType = CellType.Free;
  }

  public isStart() {
    return this.cellType === CellType.Start;
  }

  public isEnd() {
    return this.cellType === CellType.End;
  }

  public isWall() {
    return this.cellType === CellType.Wall;
  }

  public isVisited() {
    return this.visited === true;
  }
}

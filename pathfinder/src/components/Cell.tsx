import "../Cell.css";

type CellProps = {
  row: number;
  col: number;
  start: boolean;
  end: boolean;
  wall: boolean;
  g?: number;
  f?: number;
  h?: number;
};

const Cell = ({ start, end, wall, row, col }: CellProps) => {
  const cellType = start ? "cell-start" : end ? "cell-end" : wall ? "cell-wall" : "";
  return <div className={`cell ${cellType}`} id={`cell-${row}-${col}`}></div>
};

export default Cell;

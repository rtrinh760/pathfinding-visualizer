import "./Square.css";

type SquareProps = {
  row: number;
  col: number;
  start: boolean;
  end: boolean;
  wall: boolean;
  g?: number;
  f?: number;
  h?: number;
};

const Square = ({ start, end, wall, row, col }: SquareProps) => {
  const cellType = start ? "square-start" : end ? "square-end" : wall ? "square-wall" : "";
  return <div className={`square ${cellType}`} id={`square-${row}-${col}`}></div>
};

export default Square;

import "./Square.css";

type SquareProps = {
  row?: number;
  col?: number;
  isStart: boolean;
  isEnd: boolean;
  g?: number;
  f?: number;
  h?: number;
};

const Square = ({ isStart, isEnd }: SquareProps) => {
  const cellType = isStart ? "square-start" : isEnd ? "square-end" : "";
  return <div className={`square ${cellType}`}></div>
};

export default Square;

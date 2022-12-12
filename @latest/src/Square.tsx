import "./Square.css";

type SquareProps = {
  squareRow?: number;
  squareCol?: number;
  isFree: boolean;
  g?: number;
  f?: number;
  h?: number;
};

const Square = () => {
  return <div className="square"></div>;
};

export default Square

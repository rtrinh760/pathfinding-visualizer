import "../Cell.css";
import GridCell from "./GridCell";

type CellProps = {
  row: number;
  col: number;
  gridCell: GridCell;
};

const Cell = ({ row, col, gridCell }: CellProps) => {
  const cellType = gridCell.isStart()
    ? "cell-start"
    : gridCell.isEnd()
    ? "cell-end"
    : gridCell.isWall()
    ? "cell-wall"
    : "";
  return <div className={`cell ${cellType}`} id={`cell-${row}-${col}`}></div>;
};

export default Cell;

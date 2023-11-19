import { Pathfinder } from "./components/Pathfinder";
import GithubCorner from "react-github-corner";

function App() {
  return (
    <div className="App">
      <GithubCorner href="https://github.com/rtrinh760/pathfinding-visualizer" size="125" />
      <Pathfinder />
    </div>
  );
}

export default App;

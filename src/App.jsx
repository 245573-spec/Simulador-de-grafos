import "./App.css";
import {Graph} from "../src/model/obj/Graph"
import MainPage from "./view/pages/MainPage";
import { createTestGraph, createWeightedTestGraph } from "./test/testGraph";

function App() {
  const graph = new Graph();
  const testGraph = createWeightedTestGraph();
  return <MainPage graph={testGraph} />;
}

export default App;
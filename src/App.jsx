import "./App.css";
import {Graph} from "../src/model/obj/Graph"
import MainPage from "./view/pages/mainpage";
import WhoPage from "./view/pages/Whopage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTestGraph, createWeightedTestGraph } from "./test/testGraph";

function App() {

    const graph = new Graph();
    const testGraph = createWeightedTestGraph();

    return (
        <BrowserRouter basename="/Simulador-de-grafos">
            <Routes>
                <Route
                    path="/"
                    element={<MainPage graph={testGraph} />}
                />

                <Route
                    path="/quienes-somos"
                    element={<WhoPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

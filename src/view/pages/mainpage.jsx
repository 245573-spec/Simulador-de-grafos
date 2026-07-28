import { useState } from "react";

// NUEVO: Importamos el simulador, el algoritmo BFS y el grafo que tu equipo preparó
import { useSimulation } from "../../controller/useSimulation";
import { runBFS } from "../../model/algorithms/bfs";
import { runDFS } from "../../model/algorithms/dfs";
import { runDijkstra } from "../../model/algorithms/dijkstra";
import { runKruskal } from "../../model/algorithms/kruskal";
import { runPrim } from "../../model/algorithms/prim";
import { runBellmanFord } from "../../model/algorithms/bellman-ford";
import { graph } from "../../controller/useGraphEditor";

import Header from "../components/Header";
import CategoryTabs from "../components/CategoryTabs";
import Sidebar from "../components/Sidebar";
import CodeViewer from "../components/CodeViewer";
import VariablePanel from "../components/VariablePanel";
import BottomToolbar from "../components/BottomToolbar";
import GraphCanvas from "../canvas/GraphCanvas";

import { code_bfs } from "../components/algorithmsView/bfsView"; 
import { code_dfs } from "../components/algorithmsView/dfsView"; 
import { code_prim } from "../components/algorithmsView/primView"; 
import { code_kruskal } from "../components/algorithmsView/kruskalView"; 
import { code_bellman } from "../components/algorithmsView/bellman-fordView"; 
import { code_dijkstra } from "../components/algorithmsView/dijkstraView";

import "../styles/MainPage.css";

/*
 * MainPage
 * --------
 * Vista principal que orquesta el layout de la aplicación y el estado global de algoritmos.
 */
function MainPage() {

  const algorithmsCategory = {
    "Recorridos": ["BFS", "DFS"],
    "Caminos minimos": ["Dijkstra", "Bellman-Ford"],
    "Arboles de expansion": ["Prim", "Kruskal"],
  };

  const codes = {
    "DFS": code_dfs(),
    "BFS": code_bfs(),
    "Prim": code_prim(),
    "Kruskal": code_kruskal(),
    "Dijkstra": code_dijkstra(),
    "Bellman-Ford": code_bellman(),
  };

  const [activeCategory, setActiveCategory] = useState("Recorridos");

  const [selectedAlgo, setSelectedAlgo] = useState(
    algorithmsCategory["Recorridos"][0]
  );

  // NUEVO: Estado para guardar el historial de pasos calculados por el algoritmo
  const [simulationSteps, setSimulationSteps] = useState([]);
  
  // NUEVO: Inicializamos el simulador pasándole los pasos y la velocidad en milisegundos (ej: 1000ms = 1s)
  const { currentFrame, play, reset } = useSimulation(simulationSteps, 1000);
  const activeLineIndex = currentFrame?.codeLine ?? null;

  // NUEVO: Función que conecta el botón "Ejecutar" con el algoritmo seleccionado
  const handleEjecutarAlgoritmo = () => {
    reset();

    if (selectedAlgo === "BFS") {
      setSimulationSteps(runBFS(graph, 'A'));
      play();
    } else if (selectedAlgo === "DFS") {
      setSimulationSteps(runDFS(graph, 'A'));
      play();
    } else if (selectedAlgo === "Dijkstra") {
      setSimulationSteps(runDijkstra(graph, 'A'));
      play();
    } else if (selectedAlgo === "Bellman-Ford") {
      setSimulationSteps(runBellmanFord(graph, 'A'));
      play();
    } else if (selectedAlgo === "Prim") {
      setSimulationSteps(runPrim(graph, 'A'));
      play();
    } else if (selectedAlgo === "Kruskal") {
      // Kruskal no requiere nodo inicial
      setSimulationSteps(runKruskal(graph));
      play();
    }
  };

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    
    const newAlgoList = algorithmsCategory[category];
    if (newAlgoList && newAlgoList.length > 0) {
      setSelectedAlgo(newAlgoList[0]);
    }
  };

  return (
    <div className="main-page-wrapper">
      <Header />

      <CategoryTabs
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory} 
      />

      {/* Rejilla Principal de Trabajo */}
      <main className="main-layout-grid">
        
        {/* Panel Izquierdo: Algoritmos y Código */}
        <aside className="left-panel">
          <div className="sidebar-wrapper">
            <Sidebar 
              algorithms={algorithmsCategory[activeCategory]}
              selectedAlgo={selectedAlgo}
              onSelectAlgorithm={setSelectedAlgo}  
            />
          </div>
          <div className="code-viewer-wrapper-slot">
            <CodeViewer code={codes[selectedAlgo]} activeLineIndex={activeLineIndex} />
          </div>
        </aside>

        {/* Panel Centro: Lienzo de Grafo y Toolbar */}
        <section className="center-panel">
          <div className="canvas-wrapper">
            {/* NUEVO: Enviamos el currentState al lienzo para que el hook de tu equipo pueda dibujarlo */}
            <GraphCanvas currentState={currentFrame} />
          </div>

          <div className="toolbar-wrapper">
            {/* NUEVO: Conectamos la acción al botón Ejecutar de la barra */}
            <BottomToolbar onEjecutar={handleEjecutarAlgoritmo} />
          </div>
        </section>

        {/* Panel Derecho: Estado de Variables */}
        <aside className="right-panel">
          {/* NUEVO: Enviamos el frame actual al panel lateral para actualizar los textos en vivo */}
          <VariablePanel frame={currentFrame} />
        </aside>

      </main>
    </div>
  );
}

export default MainPage;
import { useState } from "react";

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
            <CodeViewer code={codes[selectedAlgo]} />
          </div>
        </aside>

        {/* Panel Centro: Lienzo de Grafo y Toolbar */}
        <section className="center-panel">
          <div className="canvas-wrapper">
            <GraphCanvas />
          </div>

          <div className="toolbar-wrapper">
            <BottomToolbar />
          </div>
        </section>

        {/* Panel Derecho: Estado de Variables */}
        <aside className="right-panel">
          <VariablePanel />
        </aside>

      </main>
    </div>
  );
}

export default MainPage;
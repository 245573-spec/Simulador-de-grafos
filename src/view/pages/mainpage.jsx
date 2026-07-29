import { useMainPageController } from "../../controller/userMainPage";

import Header from "../components/Header";
import CategoryTabs from "../components/CategoryTabs";
import Sidebar from "../components/Sidebar";
import CodeViewer from "../components/CodeViewer";
import VariablePanel from "../components/VariablePanel";
import BottomToolbar from "../components/BottomToolbar";
import GraphCanvas from "../canvas/GraphCanvas";
import ModalGraphView from "../components/ModalGraphView";
import ModalError from "../components/utils/ModalError";
import ModalAdd from "../components/ModalAdd";
import ModalSpeed from "../components/ModalSpeed";

import "../styles/MainPage.css";

/*
 * MainPage (View)
 * --------
 * Componente presentacional puro. Recibe datos y eventos del controlador.
 */
function MainPage({ graph }) {
  const {
    activeCategory,
    selectedAlgo,
    currentFrame,
    activeLineIndex,
    currentCode,
    auxLabel,
    availableAlgorithms,
    isGraphViewOpen,
    isAddOpen,
    errorState,
    isDirected,
    isWeighted,
    velocity,
    isSpeedOpen,
    showSubtitles,

    setSelectedAlgo,
    setIsGraphViewOpen,
    setIsAddOpen,
    handleSelectCategory,
    handleEjecutarAlgoritmo,
    handlePause,
    handleReset,
    closeErrorModal,
    toggleDirected,
    toggleWeighted,
    setVelocity,
    setIsSpeedOpen,
    toggleSubtitles,
    handleDeleteGraph,
  } = useMainPageController(graph);


  return (
    <div className="main-page-wrapper">
      <Header 
      isDirected={isDirected}
      isWeighted={isWeighted}
      onToggleDirected={toggleDirected}
      onToggleWeighted={toggleWeighted}
      onOpenSpeed={() => setIsSpeedOpen(true)}
      showTitles={showSubtitles}
      setSubTitles={toggleSubtitles}
       />

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
              algorithms={availableAlgorithms}
              selectedAlgo={selectedAlgo}
              onSelectAlgorithm={setSelectedAlgo}  
            />
          </div>
          <div className="code-viewer-wrapper-slot">
            <CodeViewer code={currentCode} activeLineIndex={activeLineIndex} />
          </div>
        </aside>

        {/* Panel Centro: Lienzo de Grafo y Toolbar */}
        <section className="center-panel">
          <div className="canvas-wrapper">
            <GraphCanvas
             currentState={currentFrame} graph={graph} 
             showDescription={showSubtitles}
             />
          </div>

          <div className="toolbar-wrapper">
            <BottomToolbar 
              onPausar={handlePause}
              onReset={handleReset}
              onEjecutar={handleEjecutarAlgoritmo} 
              onOpenGraphView={() => setIsGraphViewOpen(true)}
              onOpenAdd = {() => setIsAddOpen(true)}
              onDeleteGraph={handleDeleteGraph}
            />
          </div>
        </section>

        {/* Panel Derecho: Estado de Variables */}
        <aside className="right-panel">
          <VariablePanel 
            currentNode={currentFrame?.currentNode} 
            visited={currentFrame?.visitedNodes || []} 
            auxiliaryStructure={currentFrame?.queueState || currentFrame?.stackState || []} 
            auxLabel={auxLabel} 
          />
        </aside>

      </main>

      <ModalGraphView 
        graph={graph}
        isOpen={isGraphViewOpen}
        onClose={() => setIsGraphViewOpen(false)}
      />

      <ModalAdd 
        graph={graph}
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />

      <ModalError 
        isOpen={errorState.isOpen}
        title={errorState.title}
        message={errorState.message}
        onClose={closeErrorModal}
      />

      <ModalSpeed
        isOpen={isSpeedOpen}
        onClose={() => setIsSpeedOpen(false)}
        velocity={velocity}
        onVelocityChange={setVelocity}
      />
    </div>
  );
}

export default MainPage;
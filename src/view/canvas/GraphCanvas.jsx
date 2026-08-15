import React, { useRef } from "react";
import { useCanvasRenderer } from "../../controller/useGraphEditor";
import { useCanvasZoom } from "../../controller/useCanvaZoom";
import Typewriter from "typewriter-effect";
import "../styles/GraphCanvas.css";


function GraphCanvas({
    currentState,
    graph,
    showDescription = false,
    addNodeProps
  }) {

  const {
      isInsertingNode,
      pendingNodeId,
      handleCanvaClickAdd,
      handleCancelInsertion,
      handleContextMenu
    } = addNodeProps;

  const canvasRef = useRef(null);

  const { transform, getTransformedCoordinates } = useCanvasZoom(canvasRef, isInsertingNode);

  useCanvasRenderer(canvasRef, currentState, graph, transform);

  const handleCanvasClickWithTransform = (e) => {
    const { graphX, graphY } = getTransformedCoordinates(e);
    handleCanvaClickAdd({ ...e, graphX, graphY }, canvasRef);
  };


  const currentText =
    currentState?.description ||
    "Lienzo listo. Ejecuta un algoritmo para comenzar.";

  return (
    <main className="graph-canvas-container">
      <div className="canvas-badge">
        <span className={`badge-dot ${isInsertingNode ? "red" : "blue"}`}/>
        {!isInsertingNode ? <span className="badge-text">Lienzo de Grafo</span> : <span>Haz clic en el área para colocar el nodo <strong>"{pendingNodeId}"</strong></span>}
      </div>

      <div className="canvas-viewport">
        <canvas 
        ref={canvasRef}
        width={800}
        height={600}
        className="main-canvas"
        onClick={handleCanvasClickWithTransform}
        onContextMenu={(e) => handleContextMenu(e)}
        >
          Tu navegador no soporta el elemento Canvas.
        </canvas>
      </div>
      {showDescription && (
        <div className="canvas-description-panel">
          <div className="description-header">
            <span className="description-tag">PASO ACTUAL</span>
          </div>
          <Typewriter
              key={currentText}
              options={{
                delay: 30,
                cursor: "▌",
                autoStart: true,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(currentText)
                  .start();
              }}
            />
        </div>
      )}
    </main>
  );
}

export default GraphCanvas;
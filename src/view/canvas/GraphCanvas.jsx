import React, { useRef } from "react";
import { useCanvasRenderer } from "../../controller/useGraphEditor";
import Typewriter from "typewriter-effect";
import "../styles/GraphCanvas.css";


function GraphCanvas({ currentState, graph , showDescription = false}) {
  const canvasRef = useRef(null);

  useCanvasRenderer(canvasRef, currentState, graph);

  const currentText =
    currentState?.description ||
    "Lienzo listo. Ejecuta un algoritmo para comenzar.";

  return (
    <main className="graph-canvas-container">
      <div className="canvas-badge">
        <span className="badge-dot" />
        <span className="badge-text">Lienzo de Grafo</span>
      </div>

      <div className="canvas-viewport">
        <canvas ref={canvasRef} className="main-canvas">
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
import React, { useRef } from "react";
import { useCanvasRenderer } from "../../controller/useGraphEditor";
import "../styles/GraphCanvas.css";

// Recibimos currentState desde MainPage
function GraphCanvas({ currentState }) {
  const canvasRef = useRef(null);

  // Le pasamos el ref y el estado actual al hook
  useCanvasRenderer(canvasRef, currentState);

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
    </main>
  );
}

export default GraphCanvas;
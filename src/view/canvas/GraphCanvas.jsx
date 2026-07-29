import React, { useRef } from "react";
import { useCanvasRenderer } from "../../controller/useGraphEditor";
import Typewriter from "typewriter-effect";
import "../styles/GraphCanvas.css";


// Recibimos currentState desde MainPage
function GraphCanvas({ currentState, graph , showDescription = false}) {
  const canvasRef = useRef(null);

  // Le pasamos el ref y el estado actual al hook
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
              key={currentText} // 'key' fuerza la re-animación cuando cambia el mensaje
              options={{
                delay: 30, // Velocidad entre cada letra (ms)
                cursor: "▌", // Cursor al estilo consola/diálogo retro
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
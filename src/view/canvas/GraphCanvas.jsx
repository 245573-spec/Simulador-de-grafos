import React, { useEffect, useRef } from "react";
import { useCanvasRenderer } from "../../controller/useGraphEditor"
import "../styles/GraphCanvas.css";

function GraphCanvas() {
  const canvasRef = useRef(null);

  useCanvasRenderer();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) { return; }
        // Soporte para pantallas de alta densidad (Retina)
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <main className="graph-canvas-container">
      {/* Insignia en la esquina superior izquierda */}
      <div className="canvas-badge">
        <span className="badge-dot" />
        <span className="badge-text">Lienzo de Grafo</span>
      </div>

      {/* Área interactiva con fondo de puntos */}
      <div className="canvas-viewport">
        <canvas ref={canvasRef} className="main-canvas">
          Tu navegador no soporta el elemento Canvas.
        </canvas>
      </div>
    </main>
  );
}

export default GraphCanvas;
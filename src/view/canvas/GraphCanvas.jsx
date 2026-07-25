import "../styles/GraphCanvas.css"
import { useEffect, useRef } from "react";
/*
 * GraphCanvas
 * -----------
 * Área principal donde se dibujará el grafo.
 */


function GraphCanvas() {
  const canvasRef = useRef(null);

  // Ajusta la resolución del canvas según el tamaño de su contenedor
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        
        // Aquí puedes llamar a tu función de dibujo del grafo
        // ej: drawGraph(canvas.getContext('2d'));
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <main className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f17] shadow-2xl">
      {/* Indicador discreto en la esquina superior izquierda */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-slate-800/80 bg-[#111827]/80 px-3 py-1.5 backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-[#2DD4BF] animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Lienzo de Grafo
        </span>
      </div>

      {/* Contenedor del Canvas con Fondo de Cuadrícula (Grid Pattern) */}
      <div className="relative h-full w-full flex-1 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
        <canvas
          ref={canvasRef}
          className="h-full w-full cursor-crosshair touch-none"
        >
          Tu navegador no soporta el elemento Canvas.
        </canvas>
      </div>
    </main>
  );
}

export default GraphCanvas;
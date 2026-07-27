import { useEffect, useRef } from 'react';
import { Graph } from "../model/obj/Graph"

/**
 * Aca se instancia el grafo principal
 * Para hacer pruebas inicialice el grafo con los booleanos correspondientes
 * Puede agregar aristas usando los metodos de la funcion
 */
const graph = new Graph();
//graph.addEdge();

/**
 * Custom Hook que ejecuta el bucle de renderizado continuo en un Canvas 2D.
 *
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef - Referencia al elemento <canvas>
 * @param {Graph} graph - Instancia del modelo del grafo
 * @param {Object|null} currentState - Paso actual de la simulación del algoritmo
 */

export function useCanvasRenderer(canvasRef, currentState) {
  // Guarda el ID numérico devuelto por requestAnimationFrame para poder cancelarlo después
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Obtención del contexto de renderizado 2D
    const ctx = canvas.getContext('2d');

    /**
     * Función recursiva que se ejecuta en cada frame del navegador (~60/120 FPS).
     */
    const render = () => {
      // 1. LIMPIEZA: Borra los dibujados del fotograma anterior
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 2. AQUÍ SE DIBUJAN LOS ELEMENTOS (Nodos, Aristas, Etiquetas)
      // Ej: graph.getEdges().forEach(edge => edge.draw(ctx, currentState));
      // Ej: graph.getNodes().forEach(node => node.draw(ctx, currentState));

      // 3. BUCLE CONTINUO: Solicita al navegador el próximo fotograma
      requestRef.current = requestAnimationFrame(render);
    };

    // Inicia el primer ciclo del bucle
    requestRef.current = requestAnimationFrame(render);

    // LIMPIEZA (Unmount / React Cleanup):
    // Cancela la animación si el componente se desmonta o cambian las dependencias
    return () => cancelAnimationFrame(requestRef.current);
  }, [canvasRef, graph, currentState]);
}
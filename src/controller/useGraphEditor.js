import { useEffect, useRef } from 'react';
import { Graph } from "../model/obj/Graph";
import { Node } from "../model/obj/Node";

// Instancia del grafo principal
export const graph = new Graph();

// --- DATOS DE PRUEBA PARA EL BFS ---
const nodoA = new Node('A', 'A', 150, 150);
const nodoB = new Node('B', 'B', 300, 100);
const nodoC = new Node('C', 'C', 300, 200);

graph.addNode(nodoA);
graph.addNode(nodoB);
graph.addNode(nodoC);

graph.addEdge(nodoA, nodoB, 1);
graph.addEdge(nodoA, nodoC, 1);
// -----------------------------------

export function useCanvasRenderer(canvasRef, currentState) {
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    const render = () => {
      // --- LA SOLUCIÓN AL TAMAÑO ---
      // Calculamos el tamaño real del panel en la pantalla y se lo asignamos a la resolución interna
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
      // -----------------------------

      // 1. Limpiamos el lienzo en cada fotograma usando el tamaño real
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const allNodes = graph.getAllNodes();

      // 2. Sincronizamos los colores lógicos con la simulación
      if (currentState) {
        allNodes.forEach(node => {
          if (node.id === currentState.currentNode) {
            node.setColor("#0ea5e9"); // Turquesa: Nodo evaluándose actual
          } else if (currentState.visitedNodes.includes(node.id)) {
            node.setColor("#10b981"); // Verde: Nodo ya visitado
          } else {
            node.setColor("#1e293b"); // Color base oscuro
          }
        });
      } else {
        // Si la simulación no ha iniciado o se reinicia
        allNodes.forEach(node => node.setColor("#1e293b"));
      }

      // 3. Dibujar Aristas (líneas)
      const allEdges = graph.getAllEdges();
      allEdges.forEach(edge => {
        ctx.beginPath();
        ctx.moveTo(edge.from.x, edge.from.y);
        ctx.lineTo(edge.to.x, edge.to.y);
        ctx.strokeStyle = "#475569"; 
        ctx.lineWidth = 3;
        ctx.stroke();
      });

      // 4. Dibujar Nodos (círculos)
      allNodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI); 
        ctx.fillStyle = node.state.color;
        ctx.fill();
        ctx.strokeStyle = "#cbd5e1"; 
        ctx.lineWidth = 2;
        ctx.stroke();

        // 5. Dibujar el nombre del nodo en el centro
        ctx.fillStyle = "white";
        ctx.font = "bold 16px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.value, node.x, node.y);
      });

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(requestRef.current);
    
  }, [canvasRef, currentState]); 
}
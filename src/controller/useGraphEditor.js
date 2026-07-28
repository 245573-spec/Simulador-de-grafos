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

function parseActiveEdge(currentNodeValue) {
  if (typeof currentNodeValue !== "string") return null;

  const match = currentNodeValue.match(/^([A-Za-z0-9]+)(?:-|->)([A-Za-z0-9]+)$/);
  if (!match) return null;

  return { from: match[1], to: match[2] };
}

export function useCanvasRenderer(canvasRef, currentState) {
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    const render = (timestamp) => {
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const allNodes = graph.getAllNodes();
      const visitedNodes = currentState?.visitedNodes ?? [];
      const activeNodeId = currentState?.currentNode ?? null;
      const activeEdge = parseActiveEdge(currentState?.currentNode);
      const highlightedNodes = currentState?.highlightedNodes ?? [];
      const highlightedEdges = currentState?.highlightedEdges ?? [];
      const animationMode = currentState?.animationMode ?? "default";
      const pulse = 0.5 + 0.5 * Math.sin(timestamp / (animationMode === "kruskal" ? 180 : 220));

      allNodes.forEach(node => {
        const isActive = node.id === activeNodeId;
        const isHighlighted = highlightedNodes.includes(node.id);
        const isVisited = visitedNodes.includes(node.id);

        let color = "#1e293b";
        if (animationMode === "bfs") {
          color = isActive ? "#0ea5e9" : isHighlighted ? "#f59e0b" : isVisited ? "#10b981" : "#1e293b";
        } else if (animationMode === "dfs") {
          color = isActive ? "#f97316" : isHighlighted ? "#fb923c" : isVisited ? "#34d399" : "#1e293b";
        } else if (animationMode === "dijkstra") {
          color = isActive ? "#8b5cf6" : isHighlighted ? "#a78bfa" : isVisited ? "#22c55e" : "#1e293b";
        } else if (animationMode === "prim") {
          color = isActive ? "#2dd4bf" : isHighlighted ? "#34d399" : isVisited ? "#22c55e" : "#1e293b";
        } else if (animationMode === "kruskal") {
          color = isActive ? "#facc15" : isHighlighted ? "#fde68a" : isVisited ? "#22c55e" : "#1e293b";
        } else if (animationMode === "bellman") {
          color = isActive ? "#ec4899" : isHighlighted ? "#f472b6" : isVisited ? "#10b981" : "#1e293b";
        } else {
          color = isActive ? "#0ea5e9" : isVisited ? "#10b981" : "#1e293b";
        }

        node.setColor(color);
      });

      const allEdges = graph.getAllEdges();
      allEdges.forEach(edge => {
        const edgeKey = `${edge.from.id}-${edge.to.id}`;
        const edgeKeyReverse = `${edge.to.id}-${edge.from.id}`;
        const isActiveEdge = highlightedEdges.includes(edgeKey) || highlightedEdges.includes(edgeKeyReverse) || Boolean(
          activeEdge &&
          edge.from.id === activeEdge.from &&
          edge.to.id === activeEdge.to
        );

        let strokeColor = "#475569";
        let lineWidth = 2.2;

        if (animationMode === "prim" || animationMode === "kruskal") {
          strokeColor = isActiveEdge ? "#facc15" : "#475569";
          lineWidth = isActiveEdge ? 3.6 + pulse * 1.1 : 2.2;
        } else if (animationMode === "bellman") {
          strokeColor = isActiveEdge ? "#ec4899" : "#475569";
          lineWidth = isActiveEdge ? 3.4 + pulse * 0.8 : 2.2;
        } else if (animationMode === "dijkstra") {
          strokeColor = isActiveEdge ? "#8b5cf6" : "#475569";
          lineWidth = isActiveEdge ? 3.2 + pulse * 0.8 : 2.2;
        } else {
          strokeColor = isActiveEdge ? "#2dd4bf" : "#475569";
          lineWidth = isActiveEdge ? 3.5 + pulse * 1.2 : 2.2;
        }

        ctx.beginPath();
        ctx.moveTo(edge.from.x, edge.from.y);
        ctx.lineTo(edge.to.x, edge.to.y);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.stroke();
      });

      allNodes.forEach(node => {
        const isActive = node.id === activeNodeId;
        const isHighlighted = highlightedNodes.includes(node.id);
        const radius = isActive || isHighlighted ? 28 + pulse * 2 : 25;
        const fillColor = node.state.color;

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = fillColor;
        if (isActive || isHighlighted) {
          ctx.shadowBlur = 18 + pulse * 10;
          ctx.shadowColor = animationMode === "kruskal" ? "rgba(250, 204, 21, 0.8)" : animationMode === "dijkstra" ? "rgba(139, 92, 246, 0.75)" : animationMode === "bellman" ? "rgba(236, 72, 153, 0.75)" : animationMode === "prim" ? "rgba(45, 212, 191, 0.8)" : "rgba(45, 212, 191, 0.8)";
        } else {
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
        }
        ctx.fill();
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = isActive || isHighlighted ? 2.8 : 2;
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";

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
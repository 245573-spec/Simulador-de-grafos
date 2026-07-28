import { useEffect, useRef } from 'react';
import { drawNode } from '../view/canvas/renders/drawNode';
import { drawEdge } from '../view/canvas/renders/drawEdge';


export function useCanvasRenderer(canvasRef, currentState, graph) {
  const requestRef = useRef();
  const stateRef = useRef(currentState);

  useEffect(() => {
    stateRef.current = currentState;
  }, [currentState]);

  useEffect( () =>{
    const canvas = canvasRef.current;
    if (!canvas || !graph) return;
    const ctx = canvas.getContext('2d');
    
    const render = (timestamp) => {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
          ctx.scale(dpr, dpr);
        }

        ctx.clearRect(0, 0, rect.width, rect.height);

        const {
          visitedNodes = [],
          currentNode = null,
          activeEdge = null,
          highlightedNodes = [],
          highlightedEdges = []
        } = stateRef.current || {};

        const pulse = 0.5 + 0.5*Math.sin(timestamp/200);

        graph.getAllEdges().forEach(edge => {
          const edgeKey = `${edge.from.id}-${edge.to.id}`;
          const reverseEdgeKey = `${edge.to.id}-${edge.from.id}`;

          const isHighlightedList = highlightedEdges.includes(edgeKey) || (!graph.directed && highlightedEdges.includes(reverseEdgeKey));

          const thisIsActiveEdge = Boolean( activeEdge && (
                                          (edge.from.id === activeEdge.from && edge.to.id === activeEdge.to) ||
                                          (!graph.directed && edge.from.id === activeEdge.to && edge.to.id === activeEdge.from)
                                        )
                                  );

          const isActiveEdge = isHighlightedList || thisIsActiveEdge;

          drawEdge(ctx, edge.from, edge.to, {
            isActive: isActiveEdge,
            pulse: pulse,
            isDirected: graph.directed, 
            weight: graph.weighted? edge.weight : null
          });
        });

        graph.getAllNodes().forEach(node => {
          const isActive = node.id === currentNode || highlightedNodes.includes(node.id);
          const isVisited = visitedNodes.includes(node.id);

          let nodeState = "unvisited";
          if (isActive) nodeState = "active";
          else if (isVisited) nodeState = "visited";

          drawNode(ctx, node.x, node.y, node.value, {
            state: nodeState,
            pulse: pulse,
            id: node.id
          });
        });
        requestRef.current = requestAnimationFrame(render);
      };
      requestRef.current = requestAnimationFrame(render);
      return () => cancelAnimationFrame(requestRef.current);
  },[canvasRef, graph]);
}

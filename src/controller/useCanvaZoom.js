import { useState, useEffect, useRef, useCallback } from "react";
import * as d3Zoom from "d3-zoom";
import { select } from "d3-selection";

export function useCanvasZoom(canvasRef, isInsertingNode = false) {
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const zoomBehaviorRef = useRef(null);
  
  // Guardamos isInsertingNode en un Ref para no reiniciar el useEffect de D3 cuando cambie
  const isInsertingRef = useRef(isInsertingNode);
  useEffect(() => {
    isInsertingRef.current = isInsertingNode;
  }, [isInsertingNode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const zoom = d3Zoom.zoom()
      .scaleExtent([0.2, 5])
      .filter((event) => {
        if (event.type === 'wheel') return true;

        if (event.button === 2) return false;

        // Si estamos insertando un nodo, desactivar el arrastre (pan) con el click izquierdo
        if (isInsertingRef.current && event.type === 'mousedown' && event.button === 0) {
          return false;
        }

        // Permitir click izquierdo (0) o central (1) para arrastrar
        return !event.button || event.button === 1;
      })
      .on("zoom", (event) => {
        setTransform({
          scale: event.transform.k,
          x: event.transform.x,
          y: event.transform.y
        });
      });

    zoomBehaviorRef.current = zoom;
    const canvasSelection = select(canvas);
    canvasSelection.call(zoom);

    return () => {
      canvasSelection.on(".zoom", null);
    };
  }, [canvasRef]); 

  const getTransformedCoordinates = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { graphX: 0, graphY: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    return {
      graphX: Math.round((clientX - transform.x) / transform.scale),
      graphY: Math.round((clientY - transform.y) / transform.scale)
    };
  }, [canvasRef, transform]);

  const resetZoom = useCallback(() => {
    if (canvasRef.current && zoomBehaviorRef.current) {
      select(canvasRef.current)
        .transition()
        .duration(500)
        .call(zoomBehaviorRef.current.transform, d3Zoom.zoomIdentity);
    }
  }, [canvasRef]);

  return { transform, getTransformedCoordinates, resetZoom };
}
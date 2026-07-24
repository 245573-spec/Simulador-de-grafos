import { drawEdge } from "./drawEdge.js"
import { drawNode } from "./drawNode.js"

/**
 * Renderiza el estado completo de una instancia de la clase Graph en el Canvas.
 * 
 * @param {CanvasRenderingContext2D} ctx - Contexto 2D del Canvas.
 * @param {Graph} graph - Instancia de la clase Graph.
 */
export function drawGraph(_ctx, graph, _options = {}){
    const {
        selectedNode = null,
        hoverNode = null,
        pointer = null
    } = _options;

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.clearRect(0, 0, width, height);

    const allEdges = graph.getAllEdges();
    const allNodes = graph.getAllNodes();

    allEdges.forEach((edge) => {
        const fromNode = edge.from;
        const toNode = edge.to;

        if(fromNode && toNode){
            drawEdge(_ctx, fromNode, toNode, {
                color: edge.state.color,
                lineWidth: edge.state.selected ? 4 : 2,
                isDirected: graph.directed,
                weight: graph.weighted ? edge.weight : null
            });
        }
    });

    allNodes.forEach((node) =>{
        drawNode(_ctx, node.x, node.y, node.value);
    });

}
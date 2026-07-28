// Implementación del algoritmo BFS sincronizada paso a paso con Rust
export function runBFS(graph, startNodeId) {
    let steps = [];
    let queue = [];
    let visited = new Set();
    let highlightedEdges = [];

    if (!graph.nodes.has(startNodeId)) return steps;

    // Helper para capturar el estado completo del frame
    const captureFrame = (codeLineIndex, currentNode = null, activeEdge = null) => {
        steps.push({
            codeLine: codeLineIndex,
            currentNode: currentNode,
            activeEdge: activeEdge,
            visitedNodes: Array.from(visited),
            queueState: [...queue],
            highlightedNodes: currentNode ? [currentNode, ...queue] : [...queue],
            highlightedEdges: [...highlightedEdges]
        });
    };

    captureFrame(0);

    captureFrame(1);

    captureFrame(2);

    visited.add(startNodeId);
    captureFrame(4, startNodeId);

    queue.push(startNodeId);
    captureFrame(5, startNodeId);

    while (queue.length > 0) {
        captureFrame(7);

        let currentId = queue.shift();
        captureFrame(7, currentId);

        let edges = graph.adjacencyList.get(currentId) || [];

        // En BFS procesamos los vecinos en su orden natural
        for (let i = 0; i < edges.length; i++) {
            let edge = edges[i];
            let neighborId = edge.to.id;
            let edgeKey = `${currentId}-${neighborId}`;

            // [8] for vecino in grafo.obtener_vecinos(nodo)
            captureFrame(8, currentId, { from: currentId, to: neighborId });

            // [9] if visitados.insert(vecino)
            if (!visited.has(neighborId)) {
                visited.add(neighborId);
                captureFrame(9, currentId, { from: currentId, to: neighborId });

                queue.push(neighborId);

                if (!highlightedEdges.includes(edgeKey)) {
                    highlightedEdges.push(edgeKey);
                }

                // [10] cola.push_back(vecino);
                captureFrame(10, currentId, { from: currentId, to: neighborId });
            } else {
                // Si el vecino ya había sido visitado
                captureFrame(9, currentId, { from: currentId, to: neighborId });
            }
        }
    }

    // [7] Evaluación final del while cuando la cola queda vacía
    captureFrame(7);

    // [14] Fin de la función
    captureFrame(14);

    return steps;
}
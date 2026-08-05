// Implementación del algoritmo BFS sincronizada paso a paso con Rust
export function runBFS(graph, startNodeId) {
    let steps = [];
    let queue = [];
    let visited = new Set();
    let highlightedEdges = [];

    if (!graph.nodes.has(startNodeId)) return steps;

    // Helper para capturar el estado completo del frame
    const captureFrame = (codeLineIndex, currentNode = null, activeEdge = null, description = "Algoritmo BFS") => {
        steps.push({
            codeLine: codeLineIndex,
            currentNode: currentNode,
            activeEdge: activeEdge,
            visitedNodes: Array.from(visited),
            queueState: [...queue],
            highlightedNodes: currentNode ? [currentNode, ...queue] : [...queue],
            highlightedEdges: [...highlightedEdges],
            description: description,
        });
    };

    // Inicialización de estructuras
    captureFrame(0, null, null, "Iniciando algoritmo BFS...");
    captureFrame(1, null, null, "Creando conjunto para rastrear nodos visitados.");
    captureFrame(2, null, null, "Inicializando la cola (FIFO) para la exploración.");

    // Marcar nodo inicial
    visited.add(startNodeId);
    captureFrame(4, startNodeId, null, `Marcando el nodo inicial '${startNodeId}' como visitado.`);

    // Encolar nodo inicial
    queue.push(startNodeId);
    captureFrame(5, startNodeId, null, `Añadiendo el nodo inicial '${startNodeId}' a la cola.`);

    // Bucle principal
    while (queue.length > 0) {
        captureFrame(7, null, null, `Evaluando la cola. Elementos pendientes: [${queue.join(", ")}].`);

        let currentId = queue.shift();
        captureFrame(7, currentId, null, `Desencolando el nodo actual: '${currentId}'.`);

        let edges = graph.adjacencyList.get(currentId) || [];

        // En BFS procesamos los vecinos en su orden natural
        for (let i = 0; i < edges.length; i++) {
            let edge = edges[i];
            let neighborId = edge.to.id;
            let edgeKey = `${currentId}-${neighborId}`;

            // [8] Inspeccionando arista/vecino
            captureFrame(
                8, 
                currentId, 
                { from: currentId, to: neighborId }, 
                `Inspeccionando arista (${currentId} -> ${neighborId}) hacia el vecino '${neighborId}'.`
            );

            // [9] Comprobar si fue visitado
            if (!visited.has(neighborId)) {
                visited.add(neighborId);
                captureFrame(
                    9, 
                    currentId, 
                    { from: currentId, to: neighborId }, 
                    `El nodo '${neighborId}' no ha sido visitado. Se marca como visitado.`
                );

                queue.push(neighborId);

                if (!highlightedEdges.includes(edgeKey)) {
                    highlightedEdges.push(edgeKey);
                }

                // [10] Añadir vecino a la cola
                captureFrame(
                    10, 
                    currentId, 
                    { from: currentId, to: neighborId }, 
                    `Añadiendo el nodo '${neighborId}' a la cola de exploración.`
                );
            } else {
                // Si el vecino ya había sido visitado
                captureFrame(
                    9, 
                    currentId, 
                    { from: currentId, to: neighborId }, 
                    `El nodo '${neighborId}' ya fue visitado previamente. Se ignora.`
                );
            }
        }
    }

    // [7] Evaluación final del while cuando la cola queda vacía
    captureFrame(7, null, null, "La cola está vacía. Terminó la evaluación del bucle principal.");

    // [14] Fin de la función
    captureFrame(14, null, null, "Recorrido BFS completado con éxito.");

    return steps;
}
// Like si ves esto
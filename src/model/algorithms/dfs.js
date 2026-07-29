// Implementación del algoritmo DFS sincronizada con la simulación
export function runDFS(graph, startNodeId) {
    let steps = [];
    let stack = [startNodeId]; // Usamos una Pila (LIFO) para profundidad
    let visited = new Set(); 
    let highlightedEdges = [];

    if (!graph.nodes.has(startNodeId)) return steps;

    const captureFrame = (codeLineIndex, currentNode = null, activeEdge = null, description = "Algoritmo DFS") => {
        steps.push({
            codeLine: codeLineIndex,
            currentNode: currentNode, 
            activeEdge: activeEdge,   
            visitedNodes: Array.from(visited), 
            queueState: [...stack],     
            highlightedNodes: currentNode ? [currentNode, ...stack] : [...stack],
            highlightedEdges: [...highlightedEdges],
            description: description,
        });
    };

    // Pasos de inicialización
    captureFrame(0, null, null, "Iniciando algoritmo de Búsqueda en Profundidad (DFS)...");
    captureFrame(1, null, null, "Inicializando el conjunto de nodos visitados.");
    captureFrame(2, null, null, `Inicializando la pila (LIFO) con el nodo de origen '${startNodeId}'.`);
    captureFrame(4, startNodeId, null, `Preparado para comenzar el recorrido en profundidad desde '${startNodeId}'.`);

    while (stack.length > 0) {
        captureFrame(6, null, null, `Evaluando la pila. Nodos pendientes: [${stack.join(", ")}].`);
        
        let currentId = stack.pop(); // Sacamos el último elemento que entró
        captureFrame(6, currentId, null, `Desapilando el nodo superior: '${currentId}'.`);

        if (!visited.has(currentId)) {
            visited.add(currentId);
            captureFrame(7, currentId, null, `El nodo '${currentId}' no ha sido visitado. Se marca como visitado.`);

            let edges = graph.adjacencyList.get(currentId) || [];
            
            // Para mantener un orden visual lógico, agregamos los vecinos en reversa
            for (let i = edges.length - 1; i >= 0; i--) {
                let edge = edges[i];
                let neighborId = edge.to.id; 
                let edgeKey = `${currentId}-${neighborId}`;
                
                captureFrame(
                    8, 
                    currentId, 
                    { from: currentId, to: neighborId }, 
                    `Explorando la arista (${currentId} -> ${neighborId}) hacia el vecino '${neighborId}'.`
                );
                        
                if (!visited.has(neighborId)) {
                    captureFrame(
                        9, 
                        currentId, 
                        { from: currentId, to: neighborId }, 
                        `El nodo '${neighborId}' aún no ha sido visitado.`
                    );
                    
                    stack.push(neighborId);

                    if (!highlightedEdges.includes(edgeKey)) {
                        highlightedEdges.push(edgeKey);
                    }
                    
                    captureFrame(
                        10, 
                        currentId, 
                        { from: currentId, to: neighborId }, 
                        `Apilando el vecino '${neighborId}' para explorar sus profundidades más adelante.`
                    );
                } else {
                    captureFrame(
                        9, 
                        currentId, 
                        { from: currentId, to: neighborId }, 
                        `El vecino '${neighborId}' ya fue visitado previamente. Se omite.`
                    );
                }
            }
            captureFrame(13, currentId, null, `Se terminaron de evaluar los vecinos de '${currentId}'.`);
        } else {
            captureFrame(7, currentId, null, `El nodo desapilado '${currentId}' ya había sido visitado. Se ignora.`);
        }
    }

    captureFrame(6, null, null, "La pila está vacía. Terminó la exploración de nodos.");
    captureFrame(15, null, null, "Recorrido DFS completado con éxito.");
    
    return steps;
}
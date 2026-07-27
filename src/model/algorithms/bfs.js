export function runBFS(graph, startNodeId) {
    let steps = [];
    let queue = [startNodeId];
    let visited = new Set([startNodeId]);

    // Verificamos que el nodo inicial exista en el grafo
    if (!graph.nodes.has(startNodeId)) return steps;

    while(queue.length > 0) {
        let currentId = queue.shift();
        
        // Guardamos el estado actual para la animación
        steps.push({
            currentNode: currentId,
            visitedNodes: Array.from(visited),
            queueState: [...queue]
        });

        // Obtenemos los vecinos de la lista de adyacencia
        let edges = graph.adjacencyList.get(currentId) || [];
        
        for(let edge of edges) {
            // edge.to guarda la instancia del Node, así que sacamos su ID
            let neighborId = edge.to.id; 
            
            if(!visited.has(neighborId)) {
                visited.add(neighborId);
                queue.push(neighborId);
            }
        }
    }
    
    return steps;
}
//Algoritmo disktra
export function runDijkstra(graph, startNodeId) {
    let steps = [];
    let distances = {};
    let visited = new Set();
    let pq = []; // Cola de prioridad

    // Inicializamos las distancias en Infinito, excepto el nodo de inicio
    for (let node of graph.getAllNodes()) {
        distances[node.id] = Infinity;
    }
    distances[startNodeId] = 0;
    pq.push({ id: startNodeId, dist: 0 });

    while (pq.length > 0) {
        // Ordenamos para sacar siempre la distancia menor
        pq.sort((a, b) => a.dist - b.dist);
        let current = pq.shift();
        let currentId = current.id;

        if (visited.has(currentId)) continue;
        visited.add(currentId);

        // Guardamos el estado
        steps.push({
            currentNode: currentId,
            visitedNodes: Array.from(visited),
            queueState: pq.map(item => `${item.id}(${item.dist})`)
        });

        let edges = graph.adjacencyList.get(currentId) || [];
        for (let edge of edges) {
            let neighborId = edge.to.id;
            if (visited.has(neighborId)) continue;

            let newDist = distances[currentId] + edge.weight;
            if (newDist < distances[neighborId]) {
                distances[neighborId] = newDist;
                pq.push({ id: neighborId, dist: newDist });
            }
        }
    }
    return steps;
}
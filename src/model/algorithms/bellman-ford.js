export function runBellmanFord(graph, startNodeId) {
    let steps = [];
    let distances = {};
    let nodes = graph.getAllNodes();
    let edges = graph.getAllEdges();

    for (let node of nodes) {
        distances[node.id] = Infinity;
    }
    distances[startNodeId] = 0;

    let visited = new Set([startNodeId]);

    for (let i = 0; i < nodes.length - 1; i++) {
        for (let edge of edges) {
            let u = edge.from.id;
            let v = edge.to.id;
            let weight = edge.weight;

            steps.push({
                currentNode: `${u}->${v}`,
                visitedNodes: Array.from(visited),
                // Mostramos las distancias calculadas en la variable
                queueState: Object.entries(distances).map(([n, d]) => `${n}:${d === Infinity ? '∞' : d}`)
            });

            if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
                distances[v] = distances[u] + weight;
                visited.add(v);
            }
        }
    }
    return steps;
}
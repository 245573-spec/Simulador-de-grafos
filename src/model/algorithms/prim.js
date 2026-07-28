export function runPrim(graph, startNodeId) {
    let steps = [];
    let visited = new Set([startNodeId]);
    let pq = []; // Guardará las aristas
    
    if (!graph.nodes.has(startNodeId)) return steps;

    let initialEdges = graph.adjacencyList.get(startNodeId) || [];
    pq.push(...initialEdges);

    while(pq.length > 0) {
        pq.sort((a, b) => a.weight - b.weight);
        let edge = pq.shift();
        
        steps.push({
            currentNode: edge.to.id,
            visitedNodes: Array.from(visited),
            queueState: pq.map(e => `${e.to.id}(w:${e.weight})`),
            highlightedNodes: [edge.to.id, ...Array.from(visited)],
            highlightedEdges: [`${edge.from.id}-${edge.to.id}`],
            animationMode: "prim",
            codeLine: steps.length
        });

        if (!visited.has(edge.to.id)) {
            visited.add(edge.to.id);
            let newEdges = graph.adjacencyList.get(edge.to.id) || [];
            for(let newEdge of newEdges) {
                if(!visited.has(newEdge.to.id)) {
                    pq.push(newEdge);
                }
            }
        }
    }
    return steps;
}
//implementacion del algoritmo dfs
export function runDFS(graph, startNodeId) {
    let steps = [];
    let stack = [startNodeId]; // Usamos un Stack (Pila) en lugar de una Cola
    let visited = new Set(); 
    let highlightedEdges = [];

    if (!graph.nodes.has(startNodeId)) return steps;

    const captureFrame = (codeLineIndex, currentNode = null, activeEdge = null) => {
        steps.push({
            codeLine: codeLineIndex,
            currentNode: currentNode, 
            activeEdge: activeEdge,   
            visitedNodes: Array.from(visited), 
            queueState: [...stack],     
            highlightedNodes: currentNode ? [currentNode, ...stack] : [...stack],
            highlightedEdges: [...highlightedEdges]
        });
    }

    //Páso 0
    captureFrame(0);
    captureFrame(1);
    captureFrame(2);
    captureFrame(4, startNodeId);

    while(stack.length > 0) {
        captureFrame(6);
        let currentId = stack.pop(); // Sacamos el último elemento que entró (la carta de arriba)
        captureFrame(6, currentId);

        if (!visited.has(currentId)) {
            visited.add(currentId);
            
            captureFrame(7, currentId);

            let edges = graph.adjacencyList.get(currentId) || [];
            
            // Para mantener un orden visual lógico, agregamos los vecinos en reversa
            for(let i = edges.length - 1; i >= 0; i--) {
                let edge = edges[i];
                let neighborId = edge.to.id; 
                let edgeKey = `${currentId}-${neighborId}`;
                captureFrame(8, currentId, {from: currentId, to:neighborId});
                        
                if(!visited.has(neighborId)) {
                    captureFrame(9, currentId, { from: currentId, to: neighborId });
                    stack.push(neighborId);

                    if (!highlightedEdges.includes(edgeKey)) {
                        highlightedEdges.push(edgeKey);
                    }
                    captureFrame(10, currentId, { from: currentId, to: neighborId });
                    
                }
            }
            captureFrame(13);
        }else{
            captureFrame(7);
        }
    }
    captureFrame(6);
    
    captureFrame(15);
    
    return steps;
}
// te quiero mucho mami tomoe
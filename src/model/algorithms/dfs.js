//implementacion del algoritmo dfs
export function runDFS(graph, startNodeId) {
    let steps = [];
    let stack = [startNodeId]; // Usamos un Stack (Pila) en lugar de una Cola
    let visited = new Set(); 

    if (!graph.nodes.has(startNodeId)) return steps;

    while(stack.length > 0) {
        let currentId = stack.pop(); // Sacamos el último elemento que entró (la carta de arriba)

        if (!visited.has(currentId)) {
            visited.add(currentId);
            
            // Guardamos la foto del momento para el simulador
            steps.push({
                currentNode: currentId,
                visitedNodes: Array.from(visited),
                queueState: [...stack] // React lo mostrará en tu panel como "Cola / Pila"
            });

            let edges = graph.adjacencyList.get(currentId) || [];
            
            // Para mantener un orden visual lógico, agregamos los vecinos en reversa
            for(let i = edges.length - 1; i >= 0; i--) {
                let neighborId = edges[i].to.id; 
                
                if(!visited.has(neighborId)) {
                    stack.push(neighborId);
                }
            }
        }
    }
    
    return steps;
}
// te quiero mucho mami tomoe
// algoritmo kruskal
export function runKruskal(graph) {
    let steps = [];
    let allEdges = graph.getAllEdges();
    
    // Ordenamos las aristas por peso
    allEdges.sort((a, b) => a.weight - b.weight);

    // Lógica Union-Find para evitar ciclos
    let parent = {};
    for (let node of graph.getAllNodes()) {
        parent[node.id] = node.id;
    }

    function find(i) {
        if (parent[i] === i) return i;
        return find(parent[i]);
    }

    function union(i, j) {
        let rootI = find(i);
        let rootJ = find(j);
        parent[rootI] = rootJ;
    }

    let mstNodes = new Set();
    let queueState = allEdges.map(e => `${e.from.id}-${e.to.id}`);

    for (let edge of allEdges) {
        let u = edge.from.id;
        let v = edge.to.id;

        steps.push({
            currentNode: `${u}-${v}`, // Mostramos la arista evaluada
            visitedNodes: Array.from(mstNodes),
            queueState: [...queueState],
            highlightedNodes: [u, v],
            highlightedEdges: [`${u}-${v}`],
            animationMode: "kruskal",
            codeLine: steps.length
        });

        queueState.shift(); // Removemos la arista de la cola visual

        if (find(u) !== find(v)) {
            union(u, v);
            mstNodes.add(u);
            mstNodes.add(v);
        }
    }
    return steps;
}
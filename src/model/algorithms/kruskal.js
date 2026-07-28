// Implementación del algoritmo de Kruskal sincronizada con Rust
export function runKruskal(graph) {
    let steps = [];
    let allEdges = graph.getAllEdges();

    // Lógica Disjoint Set / Union-Find
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
    let mstEdges = []; // Aristas confirmadas en el MST

    // Helper para tomar la captura del estado frame a frame
    const captureFrame = (codeLineIndex, currentNode = null, activeEdge = null, remainingEdges = []) => {
        steps.push({
            codeLine: codeLineIndex,
            currentNode: currentNode,
            activeEdge: activeEdge,
            visitedNodes: Array.from(mstNodes),
            // Muestra en la interfaz la lista de aristas pendientes ordenadas por peso
            queueState: remainingEdges.map(e => `${e.from.id}-${e.to.id}(w:${e.weight})`),
            highlightedNodes: activeEdge ? [activeEdge.from, activeEdge.to] : Array.from(mstNodes),
            highlightedEdges: [...mstEdges]
        });
    };

    // [0] fn kruskal(...)
    captureFrame(0);

    // [1] let mut aristas = grafo.obtener_todas_las_aristas();
    captureFrame(1);

    // Ordenamos las aristas por peso de menor a mayor
    allEdges.sort((a, b) => a.weight - b.weight);

    // [2] aristas.sort_by_key(|a| a.peso);
    captureFrame(2, null, null, allEdges);

    // [3] let mut uf = UnionFind::new(...);
    captureFrame(3, null, null, allEdges);

    // [4] let mut mst = Vec::new();
    captureFrame(4, null, null, allEdges);

    let remainingEdges = [...allEdges];

    // BUCLE PRINCIPAL (Evaluación de cada arista)
    for (let i = 0; i < allEdges.length; i++) {
        let edge = allEdges[i];
        let u = edge.from.id;
        let v = edge.to.id;
        let edgeKey = `${u}-${v}`;
        let activeEdgeObj = { from: u, to: v };

        // [6] for arista in aristas
        captureFrame(6, `${u}-${v}`, activeEdgeObj, remainingEdges);

        let rootU = find(u);
        // [7] let root_u = uf.find(arista.origen);
        captureFrame(7, `${u}-${v}`, activeEdgeObj, remainingEdges);

        let rootV = find(v);
        // [8] let root_v = uf.find(arista.destino);
        captureFrame(8, `${u}-${v}`, activeEdgeObj, remainingEdges);

        // [9] if root_u != root_v (Comprueba si forman un ciclo)
        if (rootU !== rootV) {
            captureFrame(9, `${u}-${v}`, activeEdgeObj, remainingEdges);

            union(u, v);
            // [10] uf.union(root_u, root_v);
            captureFrame(10, `${u}-${v}`, activeEdgeObj, remainingEdges);

            mstNodes.add(u);
            mstNodes.add(v);

            if (!mstEdges.includes(edgeKey)) {
                mstEdges.push(edgeKey);
            }

            // [11] mst.push(arista); (Se confirma la arista en el Árbol)
            captureFrame(11, `${u}-${v}`, activeEdgeObj, remainingEdges);
        } else {
            // Si rootU === rootV, la arista formaría un ciclo y se descarta
            captureFrame(9, `${u}-${v}`, activeEdgeObj, remainingEdges);
        }

        // Se remueve la arista procesada de la cola visual
        remainingEdges.shift();
    }

    // [14] mst (Retorna el conjunto de aristas seleccionadas)
    captureFrame(14, null, null, []);

    // [15] Fin de la función
    captureFrame(15, null, null, []);

    return steps;
}
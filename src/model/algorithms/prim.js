// Implementación del algoritmo de Prim sincronizada con Rust
export function runPrim(graph, startNodeId) {
    let steps = [];
    let visited = new Set();
    let pq = []; // Cola de prioridad (almacena objetos Edge)
    let mstEdges = []; // Aristas confirmadas dentro del Árbol de Expansión Mínima

    if (!graph.nodes.has(startNodeId)) return steps;

    // Helper para tomar la captura del estado en cada línea de código
    const captureFrame = (codeLineIndex, currentNode = null, activeEdge = null) => {
        steps.push({
            codeLine: codeLineIndex,
            currentNode: currentNode,
            activeEdge: activeEdge,
            visitedNodes: Array.from(visited),
            // Formateamos la cola de prioridad para mostrar nodo destino y peso (ej. "B(w:4)")
            queueState: pq.map(e => `${e.to.id}(w:${e.weight})`),
            highlightedNodes: currentNode ? [currentNode, ...Array.from(visited)] : Array.from(visited),
            highlightedEdges: [...mstEdges]
        });
    };

    // [0] fn prim(...)
    captureFrame(0);

    // [1] let mut visitados = HashSet::new();
    captureFrame(1);

    // [2] let mut cola_prioridad = BinaryHeap::new();
    captureFrame(2);

    // [4] visitados.insert(nodo_inicio);
    visited.add(startNodeId);
    captureFrame(4, startNodeId);

    // [5] cola_prioridad.agregar_aristas_de(nodo_inicio);
    let initialEdges = graph.adjacencyList.get(startNodeId) || [];
    pq.push(...initialEdges);
    captureFrame(5, startNodeId);

    // BUCLE PRINCIPAL
    while (pq.length > 0) {
        // Ordenamos la cola para simular el comportamiento de una Min-Heap (menor peso primero)
        pq.sort((a, b) => a.weight - b.weight);

        // [7] while let Some(arista) = cola_prioridad.pop_min()
        captureFrame(7);

        let edge = pq.shift(); // Extraemos la arista con el peso mínimo
        let targetId = edge.to.id;
        let originId = edge.from.id;
        let edgeKey = `${originId}-${targetId}`;

        captureFrame(7, targetId, { from: originId, to: targetId });

        // [8] if visitados.insert(arista.destino)
        if (!visited.has(targetId)) {
            visited.add(targetId);
            
            // Confirmamos la arista dentro del MST
            if (!mstEdges.includes(edgeKey)) {
                mstEdges.push(edgeKey);
            }

            captureFrame(8, targetId, { from: originId, to: targetId });

            let newEdges = graph.adjacencyList.get(targetId) || [];

            for (let i = 0; i < newEdges.length; i++) {
                let newEdge = newEdges[i];
                let neighborId = newEdge.to.id;

                // [9] for nueva_arista in grafo.obtener_aristas(arista.destino)
                captureFrame(9, targetId, { from: targetId, to: neighborId });

                // [10] if !visitados.contains(&nueva_arista.destino)
                if (!visited.has(neighborId)) {
                    captureFrame(10, targetId, { from: targetId, to: neighborId });

                    pq.push(newEdge);

                    // [11] cola_prioridad.push(nueva_arista);
                    captureFrame(11, targetId, { from: targetId, to: neighborId });
                } else {
                    captureFrame(10, targetId, { from: targetId, to: neighborId });
                }
            }
        } else {
            // Si el nodo destino ya estaba en visitados, la arista formaría un ciclo y se descarta
            captureFrame(8, targetId, { from: originId, to: targetId });
        }
    }

    // [7] Evaluación final del while cuando la cola queda vacía
    captureFrame(7);

    // [16] Fin de la función
    captureFrame(16);

    return steps;
}
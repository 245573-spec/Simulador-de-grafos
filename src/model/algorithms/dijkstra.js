// Implementación del algoritmo de Dijkstra sincronizada paso a paso con Rust
export function runDijkstra(graph, startNodeId) {
    let steps = [];
    let distances = {};
    let visited = new Set();
    let pq = []; // Cola de prioridad
    let highlightedEdges = [];

    if (!graph.nodes.has(startNodeId)) return steps;

    // Inicializamos las distancias en Infinito para todos los nodos
    for (let node of graph.getAllNodes()) {
        distances[node.id] = Infinity;
    }

    // Helper para tomar la captura completa de cada estado
    const captureFrame = (codeLineIndex, currentNode = null, activeEdge = null) => {
        steps.push({
            codeLine: codeLineIndex,
            currentNode: currentNode,
            activeEdge: activeEdge,
            visitedNodes: Array.from(visited),
            // Cola visual ordenada mostrando distancias acumuladas (ej. "B(d:4)")
            queueState: pq.map(item => `${item.id}(d:${item.dist})`),
            // Estado actual de la tabla de distancias para renderizar en UI
            distancesState: { ...distances },
            highlightedNodes: currentNode ? [currentNode, ...pq.map(item => item.id)] : pq.map(item => item.id),
            highlightedEdges: [...highlightedEdges]
        });
    };

    // [0] fn dijkstra(...)
    captureFrame(0);

    // [1] let mut distancias = HashMap::new();
    captureFrame(1);

    // [2] let mut visitados = HashSet::new();
    captureFrame(2);

    // [3] let mut cola_prioridad = BinaryHeap::new();
    captureFrame(3);

    // [5] distancias.insert(inicio, 0);
    distances[startNodeId] = 0;
    captureFrame(5, startNodeId);

    // [6] cola_prioridad.push(NodoPrioridad { id: inicio, dist: 0 });
    pq.push({ id: startNodeId, dist: 0 });
    captureFrame(6, startNodeId);

    // BUCLE PRINCIPAL
    while (pq.length > 0) {
        // Ordenamos para simular Min-Heap (nodo con menor distancia primero)
        pq.sort((a, b) => a.dist - b.dist);

        // [8] while let Some(actual) = cola_prioridad.pop_min()
        captureFrame(8);

        let current = pq.shift();
        let currentId = current.id;

        // [9] if !visitados.insert(actual.id) { continue; }
        if (visited.has(currentId)) {
            captureFrame(9, currentId);
            continue;
        }

        visited.add(currentId);
        captureFrame(9, currentId);

        let edges = graph.adjacencyList.get(currentId) || [];

        for (let i = 0; i < edges.length; i++) {
            let edge = edges[i];
            let neighborId = edge.to.id;
            let edgeKey = `${currentId}-${neighborId}`;

            // [10] for arista in grafo.obtener_aristas(actual.id)
            captureFrame(10, currentId, { from: currentId, to: neighborId });

            if (visited.has(neighborId)) {
                continue;
            }

            let newDist = distances[currentId] + edge.weight;

            // [11] let nueva_dist = distancias[&actual.id] + arista.peso;
            captureFrame(11, currentId, { from: currentId, to: neighborId });

            // [12] if nueva_dist < distancias[&arista.destino]
            if (newDist < distances[neighborId]) {
                captureFrame(12, currentId, { from: currentId, to: neighborId });

                distances[neighborId] = newDist;
                // [13] distancias.insert(arista.destino, nueva_dist);
                captureFrame(13, currentId, { from: currentId, to: neighborId });

                pq.push({ id: neighborId, dist: newDist });

                if (!highlightedEdges.includes(edgeKey)) {
                    highlightedEdges.push(edgeKey);
                }

                // [14] cola_prioridad.push(NodoPrioridad { id: arista.destino, dist: nueva_dist });
                captureFrame(14, currentId, { from: currentId, to: neighborId });
            } else {
                // Si la nueva distancia no mejora la distancia previamente registrada
                captureFrame(12, currentId, { from: currentId, to: neighborId });
            }
        }
    }

    // [8] Evaluación final del while
    captureFrame(8);

    // [18] distancias (Retorna el mapa con las distancias mínimas)
    captureFrame(18);

    // [19] Fin de la función
    captureFrame(19);

    return steps;
}
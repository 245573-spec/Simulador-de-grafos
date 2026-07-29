// Implementación del algoritmo de Dijkstra sincronizada paso a paso con Rust
export function runDijkstra(graph, startNodeId) {
    let steps = [];
    let distances = {};
    let visited = new Set();
    let pq = []; // Cola de prioridad
    let highlightedEdges = [];
    let parent = {};

    if (!graph.nodes.has(startNodeId)) return steps;

    // Inicializamos las distancias en Infinito para todos los nodos
    for (let node of graph.getAllNodes()) {
        distances[node.id] = Infinity;
        parent[node.id] = null;
    }

    const captureFrame = (codeLineIndex, currentNode = null, activeEdge = null, description = "Algoritmo de Dijkstra") => {
        let currentHighlightedEdges = [];
        for (let nodeId in parent) {
            if (parent[nodeId] !== null) {
                currentHighlightedEdges.push(`${parent[nodeId]}-${nodeId}`);
            }
        }

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
            highlightedEdges: [...currentHighlightedEdges],
            description: description,
        });
    };

    // [0] fn dijkstra(...)
    captureFrame(0, null, null, "Iniciando el algoritmo de Dijkstra...");

    // [1] let mut distancias = HashMap::new();
    captureFrame(1, null, null, "Inicializando la tabla de distancias mínimas en infinito (∞).");

    // [2] let mut visitados = HashSet::new();
    captureFrame(2, null, null, "Inicializando el conjunto de nodos visitados.");

    // [3] let mut cola_prioridad = BinaryHeap::new();
    captureFrame(3, null, null, "Inicializando la cola de prioridad (Min-Heap).");

    // [5] distancias.insert(inicio, 0);
    distances[startNodeId] = 0;
    captureFrame(5, startNodeId, null, `Estableciendo la distancia del nodo origen '${startNodeId}' en 0.`);

    // [6] cola_prioridad.push(NodoPrioridad { id: inicio, dist: 0 });
    pq.push({ id: startNodeId, dist: 0 });
    captureFrame(6, startNodeId, null, `Insertando el nodo origen '${startNodeId}' en la cola de prioridad con distancia 0.`);

    // BUCLE PRINCIPAL
    while (pq.length > 0) {
        // Ordenamos para simular Min-Heap (nodo con menor distancia primero)
        pq.sort((a, b) => a.dist - b.dist);

        // [8] while let Some(actual) = cola_prioridad.pop_min()
        captureFrame(8, null, null, `Evaluando cola de prioridad. Elementos: [${pq.map(i => `${i.id}(d:${i.dist})`).join(", ")}].`);

        let current = pq.shift();
        let currentId = current.id;

        // [9] if !visitados.insert(actual.id) { continue; }
        if (visited.has(currentId)) {
            captureFrame(9, currentId, null, `El nodo '${currentId}' ya fue procesado previamente. Se descarta de la cola.`);
            continue;
        }

        visited.add(currentId);
        captureFrame(9, currentId, null, `Extrayendo nodo con menor distancia: '${currentId}' (dist: ${distances[currentId]}). Se marca como visitado.`);

        let edges = graph.adjacencyList.get(currentId) || [];

        for (let i = 0; i < edges.length; i++) {
            let edge = edges[i];
            let neighborId = edge.to.id;
            let edgeKey = `${currentId}-${neighborId}`;

            // [10] for arista in grafo.obtener_aristas(actual.id)
            captureFrame(
                10, 
                currentId, 
                { from: currentId, to: neighborId }, 
                `Inspeccionando arista (${currentId} -> ${neighborId}) con peso ${edge.weight}.`
            );

            if (visited.has(neighborId)) {
                continue;
            }

            let newDist = distances[currentId] + edge.weight;

            // [11] let nueva_dist = distancias[&actual.id] + arista.peso;
            captureFrame(
                11, 
                currentId, 
                { from: currentId, to: neighborId }, 
                `Calculando tentativamente: dist(${currentId}) [${distances[currentId]}] + peso [${edge.weight}] = ${newDist}.`
            );

            // [12] if nueva_dist < distancias[&arista.destino]
            if (newDist < distances[neighborId]) {
                const oldDistStr = distances[neighborId] === Infinity ? '∞' : distances[neighborId];
                captureFrame(
                    12, 
                    currentId, 
                    { from: currentId, to: neighborId }, 
                    `¡Camino más corto hallado! Nueva distancia (${newDist}) < Distancia previa de '${neighborId}' (${oldDistStr}).`
                );

                distances[neighborId] = newDist;
                // [13] distancias.insert(arista.destino, nueva_dist);
                captureFrame(
                    13, 
                    currentId, 
                    { from: currentId, to: neighborId }, 
                    `Actualizando distancia acumulada de '${neighborId}' a ${newDist}.`
                );

                pq.push({ id: neighborId, dist: newDist });

                if (!highlightedEdges.includes(edgeKey)) {
                    highlightedEdges.push(edgeKey);
                }
                parent[neighborId] = currentId;

                // [14] cola_prioridad.push(NodoPrioridad { id: arista.destino, dist: nueva_dist });
                captureFrame(
                    14, 
                    currentId, 
                    { from: currentId, to: neighborId }, 
                    `Añadiendo nodo '${neighborId}' a la cola de prioridad con distancia ${newDist}.`
                );
            } else {
                // Si la nueva distancia no mejora la distancia previamente registrada
                captureFrame(
                    12, 
                    currentId, 
                    { from: currentId, to: neighborId }, 
                    `Sin mejora para '${neighborId}': Distancia calculada (${newDist}) >= Distancia registrada (${distances[neighborId]}).`
                );
            }
        }
    }

    // [8] Evaluación final del while
    captureFrame(8, null, null, "La cola de prioridad está vacía. No quedan caminos por evaluar.");

    // [18] distancias (Retorna el mapa con las distancias mínimas)
    captureFrame(18, null, null, "Mapa de distancias mínimas finalizado.");

    // [19] Fin de la función
    captureFrame(19, null, null, "Ejecución de Dijkstra completada con éxito.");

    return steps;
}
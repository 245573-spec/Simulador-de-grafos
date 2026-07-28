// Implementación del algoritmo de Bellman-Ford sincronizada con Rust
export function runBellmanFord(graph, startNodeId) {
    let steps = [];
    let distances = {};
    let nodes = graph.getAllNodes();
    let edges = graph.getAllEdges();
    let visited = new Set();
    let highlightedEdges = [];

    if (!graph.nodes.has(startNodeId)) return steps;

    // Inicialización de distancias
    for (let node of nodes) {
        distances[node.id] = Infinity;
    }

    // Helper para capturar el estado en cada línea de código
    const captureFrame = (codeLineIndex, currentNode = null, activeEdge = null) => {
        steps.push({
            codeLine: codeLineIndex,
            currentNode: currentNode,
            activeEdge: activeEdge,
            visitedNodes: Array.from(visited),
            // Estado visual de las distancias acumuladas en formato legible
            queueState: Object.entries(distances).map(
                ([n, d]) => `${n}:${d === Infinity ? '∞' : d}`
            ),
            distancesState: { ...distances },
            highlightedNodes: activeEdge ? [activeEdge.from, activeEdge.to] : Array.from(visited),
            highlightedEdges: [...highlightedEdges]
        });
    };

    // [0] fn bellman_ford(...)
    captureFrame(0);

    // [1] let mut distancias = HashMap::new();
    captureFrame(1);

    // [2] distancias.insert(inicio, 0);
    distances[startNodeId] = 0;
    visited.add(startNodeId);
    captureFrame(2, startNodeId);

    // [3] let aristas = grafo.obtener_todas_las_aristas();
    captureFrame(3, startNodeId);

    // BUCLE EXTERNO: |V| - 1 iteraciones
    for (let i = 0; i < nodes.length - 1; i++) {
        // [5] for _ in 0..(grafo.num_nodos() - 1)
        captureFrame(5);

        // BUCLE INTERNO: Recorre todas las aristas del grafo
        for (let j = 0; j < edges.length; j++) {
            let edge = edges[j];
            let u = edge.from.id;
            let v = edge.to.id;
            let weight = edge.weight;
            let edgeKey = `${u}-${v}`;
            let activeEdgeObj = { from: u, to: v };

            // [6] for arista in &aristas
            captureFrame(6, `${u}->${v}`, activeEdgeObj);

            // [7] let dist_u = ...
            captureFrame(7, `${u}->${v}`, activeEdgeObj);

            // [8] if dist_u != i32::MAX (Si el origen u es alcanzable)
            if (distances[u] !== Infinity) {
                captureFrame(8, `${u}->${v}`, activeEdgeObj);

                let newDist = distances[u] + weight;

                // [9] let nueva_dist = dist_u + arista.peso;
                captureFrame(9, `${u}->${v}`, activeEdgeObj);

                // [10] if nueva_dist < dist_v (Relajación de la arista)
                if (newDist < distances[v]) {
                    captureFrame(10, `${u}->${v}`, activeEdgeObj);

                    distances[v] = newDist;
                    visited.add(v);

                    if (!highlightedEdges.includes(edgeKey)) {
                        highlightedEdges.push(edgeKey);
                    }

                    // [11] distancias.insert(arista.destino, nueva_dist);
                    captureFrame(11, `${u}->${v}`, activeEdgeObj);
                } else {
                    // No hay mejora para el nodo v
                    captureFrame(10, `${u}->${v}`, activeEdgeObj);
                }
            } else {
                // El nodo origen u todavía no ha sido alcanzado desde el nodo inicio
                captureFrame(8, `${u}->${v}`, activeEdgeObj);
            }
        }
    }

    // [5] Fin del bucle exterior
    captureFrame(5);

    // [16] Some(distancias)
    captureFrame(16);

    // [17] Fin de la función
    captureFrame(17);

    return steps;
}
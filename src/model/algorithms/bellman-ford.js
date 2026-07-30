// Implementación del algoritmo de Bellman-Ford sincronizada con Rust
export function runBellmanFord(graph, startNodeId) {
    let steps = [];
    let distances = {};
    let parents = {};
    let nodes = graph.getAllNodes();
    let edges = graph.getAllEdges();
    let visited = new Set();
    let highlightedEdges = [];

    if (!graph.nodes.has(startNodeId)) return steps;

    // Inicialización de distancias
    for (let node of nodes) {
        distances[node.id] = Infinity;
        parents[node.id] = null;
    }

    const captureFrame = (codeLineIndex, currentNode = null, activeEdge = null, description = "Algoritmo de Bellman-Ford") => {
        let currentHighlightedEdges = [];
        for (let nodeId in parents) {
            if (parents[nodeId] !== null) {
                currentHighlightedEdges.push(`${parents[nodeId]}-${nodeId}`);
            }
        }

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
            highlightedEdges: [...currentHighlightedEdges],
            description: description,
        });
    };

    // [0] fn bellman_ford(...)
    captureFrame(0, null, null, "Iniciando el algoritmo de Bellman-Ford...");

    // [1] let mut distancias = HashMap::new();
    captureFrame(1, null, null, "Inicializando tabla de distancias acumuladas a infinito (∞).");

    // [2] distancias.insert(inicio, 0);
    distances[startNodeId] = 0;
    visited.add(startNodeId);
    captureFrame(2, startNodeId, null, `Estableciendo distancia del nodo origen '${startNodeId}' a 0.`);

    // [3] let aristas = grafo.obtener_todas_las_aristas();
    captureFrame(3, startNodeId, null, `Cargando ${edges.length} aristas del grafo para su evaluación.`);

    // BUCLE EXTERNO: |V| - 1 iteraciones
    for (let i = 0; i < nodes.length - 1; i++) {
        // [5] for _ in 0..(grafo.num_nodos() - 1)
        captureFrame(5, null, null, `Iniciando ronda de relajación ${i + 1} de ${nodes.length - 1}.`);

        // BUCLE INTERNO: Recorre todas las aristas del grafo
        for (let j = 0; j < edges.length; j++) {
            let edge = edges[j];
            let u = edge.from.id;
            let v = edge.to.id;
            let weight = edge.weight;
            let edgeKey = `${u}-${v}`;
            let activeEdgeObj = { from: u, to: v };

            // [6] for arista in &aristas
            captureFrame(
                6, 
                `${u}->${v}`, 
                activeEdgeObj, 
                `Evaluando la arista (${u} -> ${v}) con peso ${weight}.`
            );

            // [7] let dist_u = ...
            captureFrame(
                7, 
                `${u}->${v}`, 
                activeEdgeObj, 
                `Obteniendo la distancia actual conocida del nodo origen '${u}' (d = ${distances[u] === Infinity ? '∞' : distances[u]}).`
            );

            // [8] if dist_u != i32::MAX (Si el origen u es alcanzable)
            if (distances[u] !== Infinity) {
                captureFrame(
                    8, 
                    `${u}->${v}`, 
                    activeEdgeObj, 
                    `El nodo '${u}' es alcanzable. Procediendo a calcular la nueva distancia.`
                );

                let newDist = distances[u] + weight;

                // [9] let nueva_dist = dist_u + arista.peso;
                captureFrame(
                    9, 
                    `${u}->${v}`, 
                    activeEdgeObj, 
                    `Suma de distancia: dist(${u}) [${distances[u]}] + peso [${weight}] = ${newDist}.`
                );

                // [10] if nueva_dist < dist_v (Relajación de la arista)
                if (newDist < distances[v]) {
                    const oldDistStr = distances[v] === Infinity ? '∞' : distances[v];
                    captureFrame(
                        10, 
                        `${u}->${v}`, 
                        activeEdgeObj, 
                        `¡Mejora encontrada! Nueva distancia (${newDist}) < Distancia previa de '${v}' (${oldDistStr}).`
                    );

                    distances[v] = newDist;
                    parents[v] = u;
                    visited.add(v);

                    if (!highlightedEdges.includes(edgeKey)) {
                        highlightedEdges.push(edgeKey);
                    }

                    // [11] distancias.insert(arista.destino, nueva_dist);
                    captureFrame(
                        11, 
                        `${u}->${v}`, 
                        activeEdgeObj, 
                        `Actualizando distancia de '${v}' a ${newDist} y guardando a '${u}' como su predecesor.`
                    );
                } else {
                    // No hay mejora para el nodo v
                    captureFrame(
                        10, 
                        `${u}->${v}`, 
                        activeEdgeObj, 
                        `No hay mejora: Nueva distancia (${newDist}) >= Distancia actual de '${v}' (${distances[v]}). Se conserva la existente.`
                    );
                }
            } else {
                // El nodo origen u todavía no ha sido alcanzado desde el nodo inicio
                captureFrame(
                    8, 
                    `${u}->${v}`, 
                    activeEdgeObj, 
                    `El nodo origen '${u}' aún no es alcanzable (distancia = ∞). Se omite la arista (${u} -> ${v}).`
                );
            }
        }
    }

    // [5] Fin del bucle exterior
    captureFrame(5, null, null, "Rondas de relajación completadas.");

    // [16] Some(distancias)
    captureFrame(16, null, null, "Generando el mapa de distancias mínimas final.");

    // [17] Fin de la función
    captureFrame(17, null, null, "Ejecución de Bellman-Ford finalizada con éxito.");

    return steps;
}
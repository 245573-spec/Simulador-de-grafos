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
    const captureFrame = (codeLineIndex, currentNode = null, activeEdge = null, remainingEdges = [], description = "Algoritmo de Kruskal") => {
        steps.push({
            codeLine: codeLineIndex,
            currentNode: currentNode,
            activeEdge: activeEdge,
            visitedNodes: Array.from(mstNodes),
            // Muestra en la interfaz la lista de aristas pendientes ordenadas por peso
            queueState: remainingEdges.map(e => `${e.from.id}-${e.to.id}(w:${e.weight})`),
            highlightedNodes: activeEdge ? [activeEdge.from, activeEdge.to] : Array.from(mstNodes),
            highlightedEdges: [...mstEdges],
            description: description,
        });
    };

    // [0] fn kruskal(...)
    captureFrame(0, null, null, [], "Iniciando el algoritmo de Kruskal...");

    // [1] let mut aristas = grafo.obtener_todas_las_aristas();
    captureFrame(1, null, null, [], `Obteniendo todas las aristas del grafo (${allEdges.length} aristas encontradas).`);

    // Ordenamos las aristas por peso de menor a mayor
    allEdges.sort((a, b) => a.weight - b.weight);

    // [2] aristas.sort_by_key(|a| a.peso);
    captureFrame(2, null, null, allEdges, "Ordenando todas las aristas de menor a mayor peso.");

    // [3] let mut uf = UnionFind::new(...);
    captureFrame(3, null, null, allEdges, "Inicializando la estructura Disjoint-Set / Union-Find para cada nodo.");

    // [4] let mut mst = Vec::new();
    captureFrame(4, null, null, allEdges, "Inicializando conjunto vacío para el Árbol de Expansión Mínima (MST).");

    let remainingEdges = [...allEdges];

    // BUCLE PRINCIPAL (Evaluación de cada arista)
    for (let i = 0; i < allEdges.length; i++) {
        let edge = allEdges[i];
        let u = edge.from.id;
        let v = edge.to.id;
        let weight = edge.weight;
        let edgeKey = `${u}-${v}`;
        let activeEdgeObj = { from: u, to: v };

        // [6] for arista in aristas
        captureFrame(
            6, 
            `${u}-${v}`, 
            activeEdgeObj, 
            remainingEdges, 
            `Evaluando la arista candidato con menor peso: (${u} - ${v}) de peso ${weight}.`
        );

        let rootU = find(u);
        // [7] let root_u = uf.find(arista.origen);
        captureFrame(
            7, 
            `${u}-${v}`, 
            activeEdgeObj, 
            remainingEdges, 
            `Buscando el conjunto/raíz al que pertenece el nodo '${u}' (Raíz: '${rootU}').`
        );

        let rootV = find(v);
        // [8] let root_v = uf.find(arista.destino);
        captureFrame(
            8, 
            `${u}-${v}`, 
            activeEdgeObj, 
            remainingEdges, 
            `Buscando el conjunto/raíz al que pertenece el nodo '${v}' (Raíz: '${rootV}').`
        );

        // [9] if root_u != root_v (Comprueba si forman un ciclo)
        if (rootU !== rootV) {
            captureFrame(
                9, 
                `${u}-${v}`, 
                activeEdgeObj, 
                remainingEdges, 
                `Las raíces son distintas ('${rootU}' ≠ '${rootV}'). La arista (${u} - ${v}) NO forma un ciclo.`
            );

            union(u, v);
            // [10] uf.union(root_u, root_v);
            captureFrame(
                10, 
                `${u}-${v}`, 
                activeEdgeObj, 
                remainingEdges, 
                `Uniendo los conjuntos de '${u}' y '${v}' en la estructura Union-Find.`
            );

            mstNodes.add(u);
            mstNodes.add(v);

            if (!mstEdges.includes(edgeKey)) {
                mstEdges.push(edgeKey);
            }

            // [11] mst.push(arista); (Se confirma la arista en el Árbol)
            captureFrame(
                11, 
                `${u}-${v}`, 
                activeEdgeObj, 
                remainingEdges, 
                `¡Arista (${u} - ${v}) aceptada! Añadida exitosamente al MST.`
            );
        } else {
            // Si rootU === rootV, la arista formaría un ciclo y se descarta
            captureFrame(
                9, 
                `${u}-${v}`, 
                activeEdgeObj, 
                remainingEdges, 
                `Ambos nodos pertenecen al mismo conjunto (Raíz '${rootU}'). La arista (${u} - ${v}) crearía un ciclo. Se descarta.`
            );
        }

        // Se remueve la arista procesada de la cola visual
        remainingEdges.shift();
    }

    // [14] mst (Retorna el conjunto de aristas seleccionadas)
    captureFrame(14, null, null, [], `Evaluación de aristas terminada. Se han seleccionado ${mstEdges.length} aristas para el MST.`);

    // [15] Fin de la función
    captureFrame(15, null, null, [], "Ejecución del algoritmo de Kruskal completada con éxito.");

    return steps;
}
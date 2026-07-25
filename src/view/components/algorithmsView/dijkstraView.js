export function code_dijkstra(){
    const dijkstra = [
        { hover: true,  content: "fn dijkstra(grafo: &Grafo, inicio: usize) -> Vec<usize> {" },
        { hover: false, content: "    let mut distancias = vec![usize::MAX; grafo.len()];" },
        { hover: false, content: "    let mut heap = BinaryHeap::new();" },
        { hover: false, content: "" },
        { hover: false, content: "    distancias[inicio] = 0;" },
        { hover: false, content: "    heap.push(State { costo: 0, nodo: inicio });" },
        { hover: false, content: "" },
        { hover: false, content: "    while let Some(State { costo, nodo }) = heap.pop() {" },
        { hover: false, content: "        if costo > distancias[nodo] { continue; }" },
        { hover: false, content: "" },
        { hover: false, content: "        // Procesar nodo y actualizar vecinos..." },
        { hover: false, content: "    }" },
        { hover: false, content: "    distancias" },
        { hover: false, content: "}" },
    ];
    return dijkstra;
}


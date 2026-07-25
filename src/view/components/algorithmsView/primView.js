export function code_prim(){
    const text_default_prim_rust = [
        { hover: false, content: "// Selecciona un algoritmo para ver el pseudocódigo" },
        { hover: true,  content: "fn prim(grafo: &Grafo, inicio: usize) -> Vec<Arista> {" },
        { hover: false, content: "    let mut visitados = vec![false; grafo.num_nodos()];" },
        { hover: false, content: "    let mut heap = BinaryHeap::new();" },
        { hover: false, content: "    let mut mst = Vec::new();" },
        { hover: false, content: "" },
        { hover: false, content: "    visitados[inicio] = true;" },
        { hover: false, content: "    // Agregar aristas del nodo inicial a la min-heap..." },
        { hover: false, content: "" },
        { hover: false, content: "    while let Some(Arista { origen, destino, peso }) = heap.pop() {" },
        { hover: false, content: "        if visitados[destino] { continue; }" },
        { hover: false, content: "" },
        { hover: false, content: "        visitados[destino] = true;" },
        { hover: false, content: "        mst.push(Arista { origen, destino, peso });" },
        { hover: false, content: "        // Agregar nuevas aristas del destino al heap..." },
        { hover: false, content: "    }" },
        { hover: false, content: "" },
        { hover: false, content: "    mst" },
        { hover: false, content: "}" },
    ];
    return text_default_prim_rust;
}


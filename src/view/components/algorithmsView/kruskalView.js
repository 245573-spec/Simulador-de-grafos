export function code_kruskal(){
    const kruskal = [
        { hover: false, content: "// Selecciona un algoritmo para ver el pseudocódigo" },
        { hover: true,  content: "fn kruskal(num_nodos: usize, mut aristas: Vec<Arista>) -> Vec<Arista> {" },
        { hover: false, content: "    // Ordenar aristas por peso de menor a mayor" },
        { hover: false, content: "    aristas.sort_by_key(|a| a.peso);" },
        { hover: false, content: "" },
        { hover: false, content: "    let mut dsu = DisjointSet::new(num_nodos);" },
        { hover: false, content: "    let mut mst = Vec::new();" },
        { hover: false, content: "" },
        { hover: false, content: "    for arista in aristas {" },
        { hover: false, content: "        // Si no forman un ciclo, unirlos e incluir la arista" },
        { hover: false, content: "        if dsu.union(arista.origen, arista.destino) {" },
        { hover: false, content: "            mst.push(arista);" },
        { hover: false, content: "        }" },
        { hover: false, content: "    }" },
        { hover: false, content: "" },
        { hover: false, content: "    mst" },
        { hover: false, content: "}" },
    ];

    return kruskal
}


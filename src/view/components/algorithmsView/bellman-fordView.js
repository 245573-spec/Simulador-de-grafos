export function code_bellman(){
    const bellman_ford_rust = [
        { hover: false,  content: "fn bellman_ford(grafo: &Grafo, inicio: usize) -> Option<Vec<i32>> {" },
        { hover: true, content: "    let num_nodos = grafo.num_nodos();" },
        { hover: false, content: "    let mut distancias = vec![i32::MAX; num_nodos];" },
        { hover: false, content: "    distancias[inicio] = 0;" },
        { hover: false, content: "" },
        { hover: false, content: "    // Relajar aristas (V - 1) veces" },
        { hover: false, content: "    for _ in 0..(num_nodos - 1) {" },
        { hover: false, content: "        for arista in grafo.aristas() {" },
        { hover: false, content: "            // Relajar si se encuentra un camino más corto..." },
        { hover: false, content: "        }" },
        { hover: false, content: "    }" },
        { hover: false, content: "" },
        { hover: false, content: "    // Detectar si existen ciclos negativos" },
        { hover: false, content: "    if grafo.tiene_ciclo_negativo(&distancias) {" },
        { hover: false, content: "        return None; // Hay un ciclo de peso negativo" },
        { hover: false, content: "    }" },
        { hover: false, content: "" },
        { hover: false, content: "    Some(distancias)" },
        { hover: false, content: "}" },
    ];
    return bellman_ford_rust;
}


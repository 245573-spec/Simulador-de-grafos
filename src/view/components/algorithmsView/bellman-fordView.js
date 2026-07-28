export function code_bellman() {
  const bellmanFord = [
    { hover: false, content: "fn bellman_ford(grafo: &Grafo, inicio: usize) -> Option<HashMap<usize, i32>> {" },
    { hover: false, content: "    let mut distancias = HashMap::new();" },
    { hover: false, content: "    distancias.insert(inicio, 0);" },
    { hover: false, content: "    let aristas = grafo.obtener_todas_las_aristas();" },
    { hover: false, content: "" },
    { hover: false, content: "    for _ in 0..(grafo.num_nodos() - 1) {" },
    { hover: false, content: "        for arista in &aristas {" },
    { hover: false, content: "            let dist_u = *distancias.get(&arista.origen).unwrap_or(&i32::MAX);" },
    { hover: false, content: "            if dist_u != i32::MAX {" },
    { hover: false, content: "                let nueva_dist = dist_u + arista.peso;" },
    { hover: false, content: "                if nueva_dist < *distancias.get(&arista.destino).unwrap_or(&i32::MAX) {" },
    { hover: false, content: "                    distancias.insert(arista.destino, nueva_dist);" },
    { hover: false, content: "                }" },
    { hover: false, content: "            }" },
    { hover: false, content: "        }" },
    { hover: false, content: "    }" },
    { hover: false, content: "    Some(distancias)" },
    { hover: false, content: "}" },
  ];
  return bellmanFord;
}
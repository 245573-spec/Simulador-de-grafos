export function code_dijkstra() {
  const dijkstra = [
    { hover: false, content: "fn dijkstra(grafo: &Grafo, inicio: usize) -> HashMap<usize, u32> {" },
    { hover: false, content: "    let mut distancias = HashMap::new();" },
    { hover: false, content: "    let mut visitados = HashSet::new();" },
    { hover: false, content: "    let mut cola_prioridad = BinaryHeap::new();" },
    { hover: false, content: "" },
    { hover: false, content: "    distancias.insert(inicio, 0);" },
    { hover: false, content: "    cola_prioridad.push(NodoPrioridad { id: inicio, dist: 0 });" },
    { hover: false, content: "" },
    { hover: false, content: "    while let Some(actual) = cola_prioridad.pop_min() {" },
    { hover: false, content: "        if !visitados.insert(actual.id) { continue; }" },
    { hover: false, content: "        for arista in grafo.obtener_aristas(actual.id) {" },
    { hover: false, content: "            let nueva_dist = distancias[&actual.id] + arista.peso;" },
    { hover: false, content: "            if nueva_dist < *distancias.get(&arista.destino).unwrap_or(&u32::MAX) {" },
    { hover: false, content: "                distancias.insert(arista.destino, nueva_dist);" },
    { hover: false, content: "                cola_prioridad.push(NodoPrioridad { id: arista.destino, dist: nueva_dist });" },
    { hover: false, content: "            }" },
    { hover: false, content: "        }" },
    { hover: false, content: "    }" },
    { hover: false, content: "    distancias" },
    { hover: false, content: "}" },
  ];
  return dijkstra;
}
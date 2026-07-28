export function code_prim() {
  const prim = [
    { hover: false, content: "fn prim(grafo: &Grafo, nodo_inicio: usize) {" },
    { hover: false, content: "    let mut visitados = HashSet::new();" },
    { hover: false, content: "    let mut cola_prioridad = BinaryHeap::new();" },
    { hover: false, content: "" },
    { hover: false, content: "    visitados.insert(nodo_inicio);" },
    { hover: false, content: "    cola_prioridad.agregar_aristas_de(nodo_inicio);" },
    { hover: false, content: "" },
    { hover: false, content: "    while let Some(arista) = cola_prioridad.pop_min() {" },
    { hover: false, content: "        if visitados.insert(arista.destino) {" },
    { hover: false, content: "            for nueva_arista in grafo.obtener_aristas(arista.destino) {" },
    { hover: false, content: "                if !visitados.contains(&nueva_arista.destino) {" },
    { hover: false, content: "                    cola_prioridad.push(nueva_arista);" },
    { hover: false, content: "                }" },
    { hover: false, content: "            }" },
    { hover: false, content: "        }" },
    { hover: false, content: "    }" },
    { hover: false, content: "}" },
  ];
  return prim;
}
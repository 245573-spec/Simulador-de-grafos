export function code_bfs() {
  const bfs = [
    { hover: false, content: "fn bfs(grafo: &Grafo, nodo_inicio: usize) {" },
    { hover: false, content: "    let mut visitados = HashSet::new();" },
    { hover: false, content: "    let mut cola = VecDeque::new();" },
    { hover: false, content: "" },
    { hover: false, content: "    visitados.insert(nodo_inicio);" },
    { hover: false, content: "    cola.push_back(nodo_inicio);" },
    { hover: false, content: "" },
    { hover: false, content: "    while let Some(nodo) = cola.pop_front() {" },
    { hover: false, content: "        for vecino in grafo.obtener_vecinos(nodo) {" },
    { hover: false, content: "            if visitados.insert(vecino) {" },
    { hover: false, content: "                cola.push_back(vecino);" },
    { hover: false, content: "            }" },
    { hover: false, content: "        }" },
    { hover: false, content: "    }" },
    { hover: false, content: "}" },
  ];
  return bfs;
}
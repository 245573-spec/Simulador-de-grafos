export function code_dfs() {
  const dfs = [
    { hover: false, content: "fn dfs(grafo: &Grafo, nodo_inicio: usize) {" },
    { hover: false, content: "    let mut visitados = HashSet::new();" },
    { hover: false, content: "    let mut pila = Vec::new();" },
    { hover: false, content: "" },
    { hover: false, content: "    pila.push(nodo_inicio);" },
    { hover: false, content: "" },
    { hover: false, content: "    while let Some(nodo) = pila.pop() {" },
    { hover: false, content: "        if visitados.insert(nodo) {" },
    { hover: false, content: "            for vecino in grafo.obtener_vecinos(nodo) {" },
    { hover: false, content: "                if !visitados.contains(&vecino) {" },
    { hover: false, content: "                    pila.push(vecino);" },
    { hover: false, content: "                }" },
    { hover: false, content: "            }" },
    { hover: false, content: "        }" },
    { hover: false, content: "    }" },
    { hover: false, content: "}" },
  ];
  return dfs;
}
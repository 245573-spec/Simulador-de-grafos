//Algoritmo bfs
const code_bfs = [
  { hover: false, content: "// Selecciona un algoritmo para ver el pseudocódigo" },
  { hover: true,  content: "fn bfs(grafo: &Grafo, nodo_inicio: usize) {" },
  { hover: false, content: "    let mut visitados = HashSet::new();" },
  { hover: false, content: "    let mut cola = VecDeque::new();" },
  { hover: false, content: "" },
  { hover: false, content: "    visitados.insert(nodo_inicio);" },
  { hover: false, content: "    cola.push_back(nodo_inicio);" },
  { hover: false, content: "" },
  { hover: false, content: "    while let Some(nodo) = cola.pop_front() {" },
  { hover: false, content: "        // Procesar nodo..." },
  { hover: false, content: "    }" },
  { hover: false, content: "}" },
];
export function code_kruskal() {
  const kruskal = [
    { hover: false, content: "fn kruskal(grafo: &Grafo) -> Vec<Arista> {" },
    { hover: false, content: "    let mut aristas = grafo.obtener_todas_las_aristas();" },
    { hover: false, content: "    aristas.sort_by_key(|a| a.peso);" },
    { hover: false, content: "    let mut uf = UnionFind::new(grafo.num_nodos());" },
    { hover: false, content: "    let mut mst = Vec::new();" },
    { hover: false, content: "" },
    { hover: false, content: "    for arista in aristas {" },
    { hover: false, content: "        let root_u = uf.find(arista.origen);" },
    { hover: false, content: "        let root_v = uf.find(arista.destino);" },
    { hover: false, content: "        if root_u != root_v {" },
    { hover: false, content: "            uf.union(root_u, root_v);" },
    { hover: false, content: "            mst.push(arista);" },
    { hover: false, content: "        }" },
    { hover: false, content: "    }" },
    { hover: false, content: "    mst" },
    { hover: false, content: "}" },
  ];
  return kruskal;
}
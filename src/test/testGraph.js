import {Graph} from "../model/obj/Graph";
import {Node} from "../model/obj/Node";

export function createTestGraph() {
  // Grafo dirigido
  const graph = new Graph(true, false);

  // Instanciamos los 5 nodos con coordenadas
  const nodeA = new Node("A", "A", 250, 50);
  const nodeB = new Node("B", "B", 150, 180);
  const nodeC = new Node("C", "C", 350, 180);
  const nodeD = new Node("D", "D", 100, 310);
  const nodeE = new Node("E", "E", 400, 310);

  // Agregamos las aristas (se registran los nodos automáticamente)
  graph.addEdge(nodeA, nodeB); // A -> B
  graph.addEdge(nodeA, nodeC); // A -> C
  graph.addEdge(nodeB, nodeC); // B -> C
  graph.addEdge(nodeB, nodeD); // B -> D
  graph.addEdge(nodeC, nodeE); // C -> E

  return graph;
}

export function createWeightedTestGraph() {
  // Grafo dirigido/no-dirigido con pesos
  const graph = new Graph(true, true); // (directed = false, weighted = true)

  // 1. Instanciamos los 5 nodos con coordenadas claras para el Canvas
  const nodeA = new Node("A", "A", 250, 60);
  const nodeB = new Node("B", "B", 120, 180);
  const nodeC = new Node("C", "C", 380, 180);
  const nodeD = new Node("D", "D", 150, 320);
  const nodeE = new Node("E", "E", 350, 320);

  // 2. Agregamos las aristas con sus respectivos pesos (weight)
  graph.addEdge(nodeA, nodeB, 4); // A --(4)-- B
  graph.addEdge(nodeA, nodeC, 2); // A --(2)-- C
  graph.addEdge(nodeB, nodeC, 1); // B --(1)-- C
  graph.addEdge(nodeB, nodeD, 5); // B --(5)-- D
  graph.addEdge(nodeC, nodeD, 8); // C --(8)-- D
  graph.addEdge(nodeC, nodeE, 10); // C --(10)-- E
  graph.addEdge(nodeD, nodeE, 2); // D --(2)-- E

  return graph;
}
//Implementacion del grafo
import { Edge } from "./Edge";
import { Node } from "./Node";

export class Graph{
    /**
   * Crea una instancia de un Grafo.
   * @param {boolean} [_directed=false] - Define si el grafo es dirigido.
   * @param {boolean} [_weighted=false] - Define si las aristas tienen peso.
   */
    constructor(_directed = false, _weighted = false) {
        /** @type {boolean} Indica si las conexiones son unidireccionales */
        this.directed = _directed;

        /** @type {boolean} Indica si las aristas manejan pesos/costos */
        this.weighted = _weighted;

        /** 
         * Colección de nodos registrados.
         * @type {Map<string|number, Node>} Key: ID del nodo, Value: Instancia de Node
         */
        this.nodes = new Map();

        /** 
         * Lista de adyacencia del grafo.
         * @type {Map<string|number, Edge[]>} Key: ID del nodo origen, Value: Arreglo de Edge
         */
        this.adjacencyList = new Map();
    }

    /**
   * Agrega un nuevo nodo al grafo.
   * @param {Node} _node - Objeto instancia de la clase Node.
   * @returns {boolean} `true` si el nodo fue agregado, `false` si ya existía.
   */
    addNode(_node){
        if(this.nodes.has(_node.id)){
            return false;
        }
        this.nodes.set(_node.id, _node);
        this.adjacencyList.set(_node.id, []);
        return true;
    }

    /**
   * Crea y conecta una arista entre dos nodos. Si los nodos no existen, los registra automáticamente.
   * @param {Node} _nodeOrigin - Nodo de origen.
   * @param {Node} _nodeTarget - Nodo de destino.
   * @param {number} [_weight=1] - Peso o costo de la arista.
   */
   addEdge(_nodeOrigin,_nodeTarget, _weigth = 1){
        if(!this.nodes.has(_nodeOrigin.id)){
            this.addNode(_nodeOrigin);
        }
        if(!this.nodes.has(_nodeTarget.id)){
            this.addNode(_nodeTarget);
        }
        const edge = new Edge(_weigth, _nodeOrigin, _nodeTarget);
        this.adjacencyList.get(_nodeOrigin.id).push(edge);

        if(!this.directed){
            const rEdge = new Edge(_weigth, _nodeTarget, _nodeOrigin);
            this.adjacencyList.get(_nodeTarget.id).push(rEdge);
        }
        
    }

    /**
   * Elimina un nodo del grafo y limpia todas las aristas entrantes y salientes asociadas a él.
   * @param {Node} _node - Nodo a eliminar.
   * @returns {boolean} `true` si se eliminó con éxito, `false` si el nodo no existía.
   */
    removeNode(_node){
        if(!this.nodes.has(_node.id)){
            return false;
        }
        this.nodes.delete(_node.id);
        this.adjacencyList.delete(_node.id);

        this.adjacencyList.forEach((listEdge, nodeId) => {
            this.adjacencyList.set(
                nodeId,
                listEdge.filter((edge) => edge.to.id !== _node.id)
            );
        });
        return true;
    }


    /**
   * Elimina la conexión (arista) entre dos nodos.
   * @param {Node} _nodeOrigin - Nodo de origen.
   * @param {Node} _nodeTarget - Nodo de destino.
   * @returns {boolean} `true` si la operación fue exitosa, `false` si alguno de los nodos no existe.
   */
    removeEdge(_nodeOrigin, _nodeTarget){
        if(!this.nodes.has(_nodeOrigin.id)){
            return false;
        }
        if(!this.nodes.has(_nodeTarget.id)){
            return false;
        }
        
        this.adjacencyList.set(_nodeOrigin.id, this.adjacencyList.get(_nodeOrigin.id).filter(edge => edge.to !== _nodeTarget.id));

        if(!this.directed){
            this.adjacencyList.set(_nodeTarget.id, this.adjacencyList.get(_nodeTarget.id).filter(edge => edge.to !== _nodeOrigin.id));
        }
        return true;
    }

    /**
   * Obtiene un arreglo plano con todas las aristas únicas del grafo.
   * @returns {Edge[]} Lista de todas las aristas para renderizado.
   */
    getAllEdges() {
        const allEdges = [];
        this.adjacencyList.forEach((edges) => {
        allEdges.push(...edges);
        });
        return allEdges;
    }

    /**
   * Obtiene un arreglo plano con todos los nodos del grafo.
   * @returns {Nodes[]} Lista de todas las aristas para renderizado.
   */
    getAllNodes() {
        //eee
        return Array.from(this.nodes.values());
    }
}
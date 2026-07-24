//Implementacion del grafo
import { th } from "framer-motion/client";
import { Edge } from "./Edge.js";
import { Node } from "./Node.js";
import { list } from "postcss";

class Graph{
    constructor(_directed = false, _weighted = false ){
        this.directed = _directed;
        this.weighted  = _weighted;

        this.nodes = new Map(); // Map<id, Node>
        this.adjacencyList = new Map(); // Map<id, List<Edge>>
    }

    addNode(_node){
        if(this.nodes.has(_node.id)){
            return false;
        }
        this.nodes.set(_node.id, _node);
        this.adjacencyList.set(_node.id, []);
        return true;
    }

   addEdge(_nodeOrigin,_nodeTarget, _weigth = 1){
        if(!this.nodes.has(_nodeOrigin.id)){
            this.addNode(_nodeOrigin);
        }
        if(!this.nodes.has(_nodeTarget.id)){
            this.addNode(_nodeTarget);
        }
        const edge = new Edge(_weigth, _nodeOrigin, _nodeOrigin);
        this.adjacencyList.get(_nodeOrigin).push(edge);

        if(!this.directed){
            const rEdge = new Edge(_weigth, _nodeOrigin, _nodeTarget);
            this.adjacencyList.get(_nodeTarget).push(rEdge);
        }
        
    }

    removeNode(_node){
        if(!this.nodes.has(_node.id)){
            return false;
        }
        this.nodes.delete(_node.id);
        this.adjacencyList.delete(_node.id);

        this.adjacencyList.forEach((listEdge, nodeId) => {
            this.adjacencyList.set(
                nodeId,
                listEdge.filter(edge => edge.to !== id)
            );
        });
        return true;
    }

    removeEdge(_nodeOrigin, _nodeTarget){
        if(!this.nodes.has(_nodeOrigin.id)){
            return false;
        }
        if(!this.nodes.has(_nodeTarget.id)){
            return false;
        }
        
        this.adjacencyList.set(_nodeOrigin.id, this.adjacencyList.get(_nodeOrigin).filter(edge => edge.to !== _nodeTarget.id));

        if(!this.directed){
            this.adjacencyList.set(_nodeTarget.id, this.adjacencyList.get(_nodeTarget).filter(edge => edge.to !== _nodeOrigin.id));
        }
        return true;
    }


}
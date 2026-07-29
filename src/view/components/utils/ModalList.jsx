import React, { useState } from 'react';
import { HiXMark, HiPlus, HiArrowRight } from 'react-icons/hi2';
import '../../styles/ModalList.css';

export function ModalList({ graph}) {
  // Estado local para forzar el re-renderizado cuando cambia la instancia 'graph'
  const [, setTick] = useState(0);
  const refresh = () => setTick(prev => prev + 1);

  // Obtenemos los nodos con tu método getAllNodes()
  const nodes = graph ? graph.getAllNodes() : [];

  // Eliminar Nodo directamente pasando su string/number ID
  const handleRemoveNode = (nodeId) => {
    graph.removeNode(nodeId);
    refresh();
  };

  // Eliminar Arista directamente pasando los IDs de origen y destino
  const handleRemoveEdge = (fromId, toId) => {
    graph.removeEdge(fromId, toId);
    refresh();
  };

  return (
    <div className="modal-graph-list-content">

      {/* Grid de Dos Columnas */}
      <div className="graph-list-grid">
        
        {/* Columna Nodos (Keys) */}
        <div className="graph-list-col keys-col">
          <span className="col-title">Nodos</span>
          {nodes.map((node) => (
            <div key={node.id} className="graph-row-item node-item">
              <span className="node-label">
                <strong>{node.id}</strong> {node.value && <small>({node.value})</small>}
              </span>
              <button 
                className="btn-danger-icon"
                onClick={() => handleRemoveNode(node.id)}
                title="Eliminar nodo"
              >
                <HiXMark size={16} />
              </button>
            </div>
          ))}
        </div>


        <div className="graph-list-col values-col">
          <span className="col-title">Aristas</span>
          {nodes.map((node) => {

            const connections = graph.getEdgesFrom 
              ? graph.getEdgesFrom(node.id) 
              : (graph.adjacencyList.get(node.id) || []);

            return (
              <div key={`connections-${node.id}`} className="graph-row-item edge-item">
                {connections.length === 0 ? (
                  <span className="empty-state">Sin conexiones</span>
                ) : (
                  connections.map((edge, index) => {
                    // Accedemos a la propiedad destino de la arista
                    const targetId = edge.to?.id ?? edge.to;

                    return (
                      <span key={`${node.id}-${targetId}-${index}`} className="edge-chip">
                        {targetId}
                        
                        {graph.weighted && edge.weight !== undefined && (
                          <code className="weight-tag">w: {edge.weight}</code>
                        )}
                        
                        <button 
                          className="btn-danger-chip"
                          onClick={() => handleRemoveEdge(node.id, targetId)}
                          title="Eliminar arista"
                        >
                          <HiXMark size={14} />
                        </button>
                      </span>
                    );
                  })
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
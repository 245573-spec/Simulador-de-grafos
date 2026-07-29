import React, { useState } from 'react';
import { HiPlus, HiXMark } from 'react-icons/hi2';
import '../../styles/ModalMatrix.css';

export function ModalMatrix({ graph }) {
  // Estado para forzar re-renderizado al mutar el grafo internamente
  const [, setTick] = useState(0);
  const refresh = () => setTick(prev => prev + 1);

  // Obtener los nodos registrados desde el Grafo
  const nodes = graph ? graph.getAllNodes() : [];

  // Eliminar un nodo por ID
  const handleRemoveNode = (nodeId, e) => {
    if (e) e.stopPropagation();
    graph.removeNode(nodeId);
    refresh();
  };

  return (
    <div className="modal-graph-matrix-content">

      {/* Renderizado de la Matriz N x N */}
      <div className="graph-matrix-wrapper">
        {nodes.length === 0 ? (
          <div className="matrix-empty-state">No hay nodos registrados en el grafo.</div>
        ) : (
          <table className="graph-matrix-table">
            <thead>
              <tr>
                {/* Esquina superior izquierda vacía */}
                <th className="corner-cell"></th>
                {/* Cabecera superior (Nodos Destino) */}
                {nodes.map((node) => (
                  <th key={`col-${node.id}`} className="header-cell">
                    <span>{node.id}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Filas (Nodos Origen) */}
              {nodes.map((rowNode) => {
                // Obtenemos las aristas salientes del nodo directamente del Map de la Lista de Adyacencia
                const currentEdges = graph.adjacencyList.get(rowNode.id) || [];

                return (
                  <tr key={`row-${rowNode.id}`}>
                    {/* Etiqueta de la fila con su botón para borrar el nodo */}
                    <th className="header-cell row-header">
                      <span className="node-title">{rowNode.id}</span>
                      <button
                        type="button"
                        className="btn-danger-icon"
                        onClick={(e) => handleRemoveNode(rowNode.id, e)}
                        title={`Eliminar nodo ${rowNode.id}`}
                      >
                        <HiXMark size={14} />
                      </button>
                    </th>

                    {/* Generación de las celdas de lectura */}
                    {nodes.map((colNode) => {
                      const edge = currentEdges.find(e => (e.to?.id ?? e.to) === colNode.id);
                      const isConnected = Boolean(edge);

                      // Valor a mostrar en la casilla (1 o Peso si está conectado, 0 si no)
                      let cellValue = '0';
                      if (isConnected) {
                        cellValue = graph.weighted && edge.weight !== undefined ? edge.weight : '1';
                      }

                      return (
                        <td
                          key={`cell-${rowNode.id}-${colNode.id}`}
                          className={`matrix-cell readonly ${isConnected ? 'active' : ''}`}
                        >
                          {cellValue}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
// src/view/components/ModalAdd.jsx
import React from 'react';
import { LuX, LuPlus } from 'react-icons/lu';
import { useModalAddController } from '../../controller/useAddNode';
import '../styles/ModalAdd.css';

export default function ModalAdd({ graph, isOpen, onClose, addNodeProps }) {
    const {
    activeTab,
    nodeId,
    originId,
    targetId,
    weight,
    formError,
    nodes,
    setNodeId,
    setOriginId,
    setTargetId,
    setWeight,
    handleTabChange,
    handleAddNode,
    handleAddEdge
  } = addNodeProps;

  if (!isOpen) return null;

  return (
    <div className="modal-add-backdrop">
      <div className="modal-add-card">
        <button type="button" className="modal-add-close-btn" onClick={onClose}>
          <LuX size={20} />
        </button>

        <h3 className="modal-add-title">Agregar Elemento al Grafo</h3>

        <div className="modal-add-tabs">
          <button
            type="button"
            className={`modal-add-tab ${activeTab === 'node' ? 'active' : ''}`}
            onClick={() => handleTabChange('node')}
          >
            Nuevo Nodo
          </button>
          <button
            type="button"
            className={`modal-add-tab ${activeTab === 'edge' ? 'active' : ''}`}
            onClick={() => handleTabChange('edge')}
          >
            Nueva Arista
          </button>
        </div>

        {formError && (
          <div className="modal-add-error">
            {formError}
          </div>
        )}

        {/* Pestaña: Nuevo Nodo */}
        {activeTab === 'node' && (
          <form onSubmit={handleAddNode} className="modal-add-form">
            <div className="form-group">
              <label>Identificador del Nodo</label>
              <input
                type="text"
                placeholder="Ej. A, B, C..."
                value={nodeId}
                onChange={(e) => setNodeId(e.target.value)}
                maxLength={5}
                autoFocus
              />
            </div>

            <button type="submit" className="modal-add-submit-btn">
              <LuPlus size={18} /> Agregar Nodo
            </button>
          </form>
        )}

        {/* Pestaña: Nueva Arista */}
        {activeTab === 'edge' && (
          <form onSubmit={handleAddEdge} className="modal-add-form">
            <div className="form-group">
              <label>Nodo Origen</label>
              <select
                value={originId}
                onChange={(e) => setOriginId(e.target.value)}
              >
                <option value="">-- Seleccionar Origen --</option>
                {nodes.map((n) => (
                  <option key={`orig-${n.id}`} value={n.id}>
                    Nodo {n.id}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Nodo Destino</label>
              <select
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
              >
                <option value="">-- Seleccionar Destino --</option>
                {nodes.map((n) => (
                  <option key={`targ-${n.id}`} value={n.id}>
                    Nodo {n.id}
                  </option>
                ))}
              </select>
            </div>

            {graph?.weighted && (
              <div className="form-group">
                <label>Peso de la Arista</label>
                <input
                  type="number"
                  min="1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            )}

            <button
              type="submit"
              className="modal-add-submit-btn"
              disabled={nodes.length < 2}
            >
              <LuPlus size={18} /> Agregar Arista
            </button>
            {nodes.length < 2 && (
              <span className="form-hint">Se necesitan al menos 2 nodos creados.</span>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
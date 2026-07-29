import React, { useState } from 'react';
import { LuX } from 'react-icons/lu';
import { ModalList } from './utils/ModalList';
import { ModalMatrix } from './utils/ModalMatrix';
import '../styles/ModalGraphView.css';

export default function ModalGraphView({ graph, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('list');

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog-content">
        
         <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          title="Cerrar vista"
          aria-label="Cerrar modal"
        >
          <LuX className="close-icon" />
        </button>

        <div className="modal-graph-view">
          <div className="tabs-header">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
              onClick={() => setActiveTab('list')}
            >
              Lista de Adyacencia
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'matrix' ? 'active' : ''}`}
              onClick={() => setActiveTab('matrix')}
            >
              Matriz de Adyacencia
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 'list' ? (
              <ModalList graph={graph}/>
            ) : (
              <ModalMatrix graph={graph}/>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
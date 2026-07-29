import React from 'react';
import { HiExclamationTriangle, HiXMark } from 'react-icons/hi2';
import '../../styles/ModalError.css'; // Asegúrate de ajustar la ruta al archivo CSS

export default function ModalError({ isOpen, title, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-error-backdrop">
      <div className="modal-error-card">
        {/* Botón de cierre */}
        <button 
          type="button" 
          className="modal-error-close-btn" 
          onClick={onClose}
          title="Cerrar"
        >
          <HiXMark size={20} />
        </button>

        {/* Icono de advertencia */}
        <div className="modal-error-icon">
          <HiExclamationTriangle size={42} />
        </div>

        {/* Título de la alerta */}
        <h3 className="modal-error-title">{title || 'Operación Incompatible'}</h3>

        {/* Mensaje resaltado en rojo */}
        <div className="modal-error-danger-box">
          <p className="modal-error-danger-text">{message}</p>
        </div>

      </div>
    </div>
  );
}
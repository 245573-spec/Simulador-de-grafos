import React from 'react';
import { LuX, LuGauge } from 'react-icons/lu';
import '../styles/ModalSpeed.css'

export default function ModalSpeed({ isOpen, onClose, velocity, onVelocityChange }) {
  if (!isOpen) return null;

  // Maneja el cambio del slider
  const handleChange = (e) => {
    onVelocityChange(Number(e.target.value));
  };

  // Ayudante para mostrar qué tan rápido es el valor actual en texto
  const getSpeedLabel = (ms) => {
    if (ms <= 200) return 'Muy Rápido';
    if (ms <= 450) return 'Rápido';
    if (ms <= 750) return 'Normal';
    if (ms <= 1200) return 'Lento';
    return 'Muy Lento';
  };

  return (
    <div className="modal-speed-backdrop">
      <div className="modal-speed-card">
        {/* Botón Cerrar */}
        <button type="button" className="modal-speed-close-btn" onClick={onClose}>
          <LuX size={20} />
        </button>

        {/* Encabezado */}
        <div className="modal-speed-header">
          <LuGauge size={24} className="modal-speed-icon" />
          <h3 className="modal-speed-title">Velocidad de Simulación</h3>
        </div>

        {/* Cuerpo con el Slider */}
        <div className="modal-speed-body">
          <div className="speed-info">
            <span className="speed-value">{velocity} ms</span>
            <span className="speed-label">({getSpeedLabel(velocity)})</span>
          </div>

          <div className="slider-container">
            <span className="slider-min-max">Rápido</span>
            <input
              type="range"
              min="100"      // 100ms (Más rápido)
              max="2000"     // 2000ms (Más lento)
              step="50"
              value={velocity}
              onChange={handleChange}
              className="speed-slider"
            />
            <span className="slider-min-max">Lento</span>
          </div>
        </div>

        {/* Pie de modal */}
        <div className="modal-speed-footer">
          <button type="button" className="modal-speed-confirm-btn" onClick={onClose}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
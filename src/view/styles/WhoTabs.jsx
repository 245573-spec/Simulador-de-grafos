/* Contenedor principal de las pestañas */
.category-tabs-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  background-color: var(--code-bg); /* #070a10 o fondo oscuro integrado */
  border-bottom: 1px solid var(--border);
  padding: 16px 20px 4px 20px;
}

/* Botones de pestaña */
.tab-button {
  position: relative;
  background: transparent;
  border: none;
  padding: 10px 4px 14px 4px;
  font-size: 15px;
  font-weight: 550;
  color: var(--text);
  cursor: pointer;
  transition: color 0.2s ease-in-out;
}

.tab-button:hover {
  color: var(--text-h);
}

/* Estado Activo */
.tab-button.active {
  color: var(--accent);
  font-weight: 590;
}

/* Indicador de pestaña activa (Línea inferior con brillo neón) */
.tab-indicator {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  width: 100%;
  height: 3px;
  background-color: var(--accent);
  border-radius: 9999px;
  box-shadow: 0 -2px 8px rgba(45, 212, 191, 0.4);;
}

/* Adaptabilidad para pantallas más pequeñas */
@media (max-width: 640px) {
  .category-tabs-container {
    gap: 12px;
    padding: 6px 12px;
  }

  .tab-button {
    font-size: 12px;
    padding: 6px 2px 10px;
  }
}
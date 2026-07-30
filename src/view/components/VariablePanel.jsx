import "../styles/VariablePanel.css";

/*
 * VariablePanel
 * -------------
 * Panel lateral derecho que muestra el estado de las variables (Nodo actual, Visitados, Cola/Pila).
 */
function VariablePanel({
  // MODIFICADO: Cambiamos el valor por defecto de "A" a null
  currentNode = null, 
  visited = [],
  auxiliaryStructure = [],
  auxLabel = "Cola / Pila",
}) {
  return (
    <aside className="variable-panel-container">
      {/* Título de la sección */}
      <h2 className="variable-panel-title">
        Variables
      </h2>

      <div className="variable-cards-wrapper">
        {/* 1. Nodo Actual */}
        <div className="variable-card card-row">
          <span className="variable-label">Nodo actual</span>
          <span className="current-node-badge">
            {/* MODIFICADO: Si hay un nodo actual lo mostramos, si no (null), mostramos un guion */}
            {currentNode ? currentNode : "-"}
          </span>
        </div>

        {/* 2. Visitados */}
        <div className="variable-card card-column">
          <span className="variable-label">Visitados</span>
          <div className="variable-list font-mono">
            {visited.length > 0 ? (
              visited.map((node, index) => (
                <span key={index} className="variable-item">
                  {node}
                </span>
              ))
            ) : (
              <span className="variable-empty">-</span>
            )}
          </div>
        </div>

        {/* 3. Estructura Auxiliar (Cola / Pila) */}
        <div className="variable-card card-column">
          <span className="variable-label">{auxLabel}</span>
          <div className="variable-list font-mono">
            {Array.isArray(auxiliaryStructure) && auxiliaryStructure.length > 0 ? (
              auxiliaryStructure.map((item, index) => (
                <span key={index} className="variable-item">
                  {item}
                </span>
              ))
            ) : (
              <span className="variable-empty">
                {typeof auxiliaryStructure === "string" ? auxiliaryStructure : "-"}
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default VariablePanel;
import "../styles/Sidebar.css";

/*
 * Sidebar
 * -------
 * Panel lateral que muestra la lista de algoritmos disponibles.
 */
function Sidebar({ 
  algorithms = ["BFS", "DFS", "Dijkstra", "Bellman-Ford", "Prim", "Kruskal"], 
  selectedAlgo, 
  onSelectAlgorithm 
}) {

  const handleSelect = (algo) => {
    if (onSelectAlgorithm) {
      onSelectAlgorithm(algo);
    }
  };

  return (
    <aside className="sidebar-container">
      <h2 className="sidebar-title">
        Algoritmos
      </h2>

      <nav className="sidebar-nav">
        <ul className="sidebar-list">
          {algorithms.map((algo) => {
            const isSelected = selectedAlgo === algo;
            return (
              <li key={algo}>
                <button
                  type="button"
                  onClick={() => handleSelect(algo)}
                  className={`sidebar-btn ${isSelected ? "selected" : ""}`}
                >
                  <span>{algo}</span>
                  
                  {/* Indicador de nodo/selección activo */}
                  {isSelected && (
                    <span className="selected-dot" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
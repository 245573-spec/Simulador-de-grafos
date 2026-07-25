import "../styles/CategoryTabs.css";

/*
 * CategoryTabs
 * ------------
 * Muestra las pestañas de categorías de algoritmos disponibles.
 */
function CategoryTabs({ activeCategory = "Recorridos", onSelectCategory = () => {} }) {
  const categories = ["Recorridos", "Caminos minimos", "Arboles de expansion"];

  return (
    <nav className="category-tabs-container">
      {categories.map((tab) => {
        const isActive = activeCategory === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onSelectCategory(tab)}
            className={`tab-button ${isActive ? "active" : ""}`}
          >
            {tab}
            {isActive && <span className="tab-indicator" />}
          </button>
        );
      })}
    </nav>
  );
}

export default CategoryTabs;
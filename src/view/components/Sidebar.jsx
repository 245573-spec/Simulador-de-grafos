import "../styles/Sidebar.css"
/*
 * Sidebar
 * -------
 * Panel lateral que muestra los algoritmos disponibles.
 */


function Sidebar({ 
    algorithms = ["BFS", "DFS", "Dijkstra", "Bellman-Ford", "Prim", "Kruskal"], 
    selectedAlgo, 
    onSelectAlgorithm }) {
    
    const handleSelect = (algo) => {
        if(onSelectAlgorithm){
            onSelectAlgorithm(algo);
        }
    };

    return (
        <aside className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-[#111827] p-4 shadow-xl">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
            Algoritmos
        </h2>

        <nav className="max-h-[60vh] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-track]:bg-transparent">
            <ul className="flex flex-col gap-1.5">
            {algorithms.map((algo) => {
                const isSelected = selectedAlgo === algo;
                return (
                <li key={algo}>
                    <button
                    onClick={() => handleSelect(algo)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                        isSelected
                        ? "bg-[#2DD4BF] text-[#111827] font-semibold shadow-md shadow-[#2DD4BF]/20" // Estado Seleccionado (Turquesa destacado)
                        : "text-slate-300 hover:bg-slate-800/80 hover:text-[#2DD4BF]" // Estado Normal / Hover
                    }`}
                    >
                    <span>{algo}</span>
                    
                    {/* Indicador sutil de selección */}
                    {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#111827]" />
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
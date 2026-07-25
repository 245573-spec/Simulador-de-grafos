import "../styles/CategoryTabs.css";
/*
 * CategoryTabs
 * ------------
 * Muestra las categorías de algoritmos disponibles.
 */
function CategoryTabs({ activeCategory = "Recorridos", onSelectCategory = () =>{} }){
    const categories = ["Recorridos", "Caminos minimos", "Arboles de expansion"];

    return (
        <div className="flex w-full items-center justify-center gap-4 border-b border-slate-800 bg-[#111827] px-4 py-2 sm:gap-8">
        {categories.map((tab) => {
            const isActive = activeCategory === tab;
            return (
            <button
                key={tab}
                onClick={() => onSelectCategory(tab)}
                className={`relative py-2 text-xs font-medium transition-colors sm:text-sm ${
                isActive
                    ? "text-[#2DD4BF]" // Texto destacado
                    : "text-slate-400 hover:text-slate-200"
                }`}
            >
                {tab}
                {isActive && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#2DD4BF] shadow-[0_0_8px_#2DD4BF]" />
                )}
            </button>
            );
        })}
        </div>
    );
}
export default CategoryTabs
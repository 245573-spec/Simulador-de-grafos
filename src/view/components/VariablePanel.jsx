import "../styles/VariablePanel.css";

function VariablePanel({
  currentNode = "A",
  visited = [],
  auxiliaryStructure = [],
  auxLabel = "Cola / Pila",
}) {
  return (
    <aside className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-[#111827] p-4 shadow-xl">
      {/* Título de la sección */}
      <h2 className="px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Variables
      </h2>

      <div className="flex flex-col gap-2.5">
        {/* 1. Nodo Actual */}
        <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-[#0d1117] p-3">
          <span className="text-xs font-medium text-slate-400">Nodo actual</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 font-mono text-xs font-bold text-[#2DD4BF]">
            {currentNode}
          </span>
        </div>

        {/* 2. Nodos Visitados */}
        <div className="flex flex-col gap-1.5 rounded-xl border border-slate-800/80 bg-[#0d1117] p-3">
          <span className="text-xs font-medium text-slate-400">Visitados</span>
          <div className="flex min-h-[32px] flex-wrap items-center gap-1.5 font-mono text-xs">
            {visited.length > 0 ? (
              visited.map((node, index) => (
                <span
                  key={index}
                  className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-200"
                >
                  {node}
                </span>
              ))
            ) : (
              <span className="text-slate-600">-</span>
            )}
          </div>
        </div>

        {/* 3. Estructura Auxiliar (Cola, Pila, Distancias, etc.) */}
        <div className="flex flex-col gap-1.5 rounded-xl border border-slate-800/80 bg-[#0d1117] p-3">
          <span className="text-xs font-medium text-slate-400">{auxLabel}</span>
          <div className="flex min-h-[32px] flex-wrap items-center gap-1.5 font-mono text-xs">
            {Array.isArray(auxiliaryStructure) && auxiliaryStructure.length > 0 ? (
              auxiliaryStructure.map((item, index) => (
                <span
                  key={index}
                  className="rounded-md border border-slate-800 bg-slate-900/80 px-2 py-0.5 text-slate-300"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-slate-600">
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
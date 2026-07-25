import "../styles/CodeViewer.css";

import { useState } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";

const text_default = "// Selecciona un algoritmo para ver el pseudocódigo\nfunction BFS(grafo, nodoInicio) {\n  let visitados = new Set();\n  let cola = [nodoInicio];\n\n  while (cola.length > 0) {\n    let nodo = cola.shift();\n    // Procesar nodo...\n  }\n}";

function CodeViewer({ code = text_default }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

return (
    <div className="flex h-full w-full flex-col gap-2">
      {/* HEADER */}
      <div className="flex items-center justify-between px-1 shrink-0">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Código
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-[#2DD4BF]"
          title="Copiar código"
        >
          {copied ? (
            <>
              <LuCheck className="text-[#2DD4BF]" />
              <span className="text-[#2DD4BF]">Copiado</span>
            </>
          ) : (
            <>
              <LuCopy />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* ÁREA DE CÓDIGO CON SCROLL GARANTIZADO */}
      <div className="relative flex-1 min-h-0 w-full rounded-lg border border-slate-800 bg-[#0b0f17]">
        <div 
          tabIndex={0} 
          className="absolute inset-0 overflow-auto p-3 font-mono text-xs text-slate-300 focus:outline-none [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-track]:bg-transparent"
        >
          <pre className="font-mono text-xs text-slate-300 whitespace-pre min-w-max">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default CodeViewer;
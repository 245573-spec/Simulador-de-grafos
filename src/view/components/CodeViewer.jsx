import "../styles/CodeViewer.css";

import { useState } from "react";
import { AnimationCode } from "./utils/CodeViewUtils"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";

const text_default = [
  { hover: false, content: "// Selecciona un algoritmo para ver el pseudocódigo" },
  { hover: true,  content: "fn main() {" },
  { hover: false, content: "    println!(\"Hello, world!\");" },
  { hover: false, content: "}" },
];

function CodeViewer({ code = text_default }) {

return (
    <div className="flex h-full w-full flex-col gap-2">
      {/* HEADER */}
      <div className="flex items-center justify-between px-1 shrink-0">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Código
        </span>
      </div>

      {/* ÁREA DE CÓDIGO CON SCROLL GARANTIZADO */}
      <div className="relative flex-1 min-h-0 w-full rounded-lg border border-slate-800 bg-[#0b0f17]">
        <div 
          tabIndex={0} 
          className="absolute inset-0 overflow-auto p-3 font-mono text-xs text-slate-300 focus:outline-none [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-track]:bg-transparent"
        >
          <AnimationCode
          lines = {code}/>
        </div>
      </div>
    </div>
  );
}

export default CodeViewer;
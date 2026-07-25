import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export function AnimationCode({ lines }) {
  if (!lines || lines.length === 0) return null;

  return (
    <div className="flex flex-col font-mono text-xs">
      {lines.map((line, index) => {
        const isHovered = line.hover;

        return (
          <div
            key={index}
            className={`flex items-center px-2 py-0.5 rounded transition-all duration-150 ${
              isHovered
                ? "bg-[#2DD4BF]/15 border-l-2 border-[#2DD4BF]"
                : "border-l-2 border-transparent hover:bg-slate-800/50"
            }`}
          >
            <span className="w-6 select-none text-right pr-3 text-slate-600 text-[10px]">
              {index + 1}
            </span>

            <div className="flex-1 min-w-0">
              <SyntaxHighlighter
                language="rust"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: 0,
                  background: "transparent",
                  fontSize: "0.75rem",
                  fontFamily: "monospace",
                }}
                /* Para evitar que inserte etiquetas <pre> pesadas por cada línea */
                PreTag="span" 
                CodeTag="span"
              >
                {/* Si la línea está vacía, ponemos un espacio para mantener la altura */}
                {line.content || " "}
              </SyntaxHighlighter>
            </div>
          </div>
        );
      })}
    </div>
  );
}
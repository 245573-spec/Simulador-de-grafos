import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../../styles/AnimationCode.css";

export function AnimationCode({ lines }) {
  if (!lines || lines.length === 0) return null;

  return (
    <div className="code-viewer-container">
      <div className="code-lines-wrapper">
        {lines.map((line, index) => {
          const isActive = line.hover || line.active;

          return (
            <div
              key={index}
              className={`code-line-row ${isActive ? "active-pill" : ""}`}
            >
              {/* Número de línea */}
              <span className={`line-number ${isActive ? "active-number" : ""}`}>
                {index + 1}
              </span>

              {/* Contenido del código */}
              <div className="line-content">
                <SyntaxHighlighter
                  language="rust"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: 0,
                    background: "transparent",
                    fontSize: "0.825rem",
                    fontFamily: "var(--mono)",
                  }}
                  PreTag="span"
                  CodeTag="span"
                >
                  {line.content || " "}
                </SyntaxHighlighter>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
import React, { useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../../styles/AnimationCode.css";

export function AnimationCode({ lines }) {
  const containerRef = useRef(null);
  const activeLineRef = useRef(null);

  useEffect(() => {
    const activeIndex = lines.findIndex((line) => line.hover || line.active);
    if (activeIndex < 0 || !containerRef.current || !activeLineRef.current) return;

    const activeElement = activeLineRef.current;
    activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [lines]);

  if (!lines || lines.length === 0) return null;

  return (
    <div className="code-viewer-container" ref={containerRef}>
      <div className="code-lines-wrapper">
        {lines.map((line, index) => {
          const isActive = line.hover || line.active;

          return (
            <div
              key={index}
              ref={isActive ? activeLineRef : null}
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
import "../styles/CodeViewer.css";

import { useState } from "react";
import { AnimationCode } from "./utils/CodeViewUtils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";

const text_default = [
  { hover: false, content: "// Selecciona un algoritmo para ver el pseudocódigo" },
  { hover: true,  content: "fn main() {" },
  { hover: false, content: "    println!(\"Hello, world!\");" },
  { hover: false, content: "}" },
];

/*
 * CodeViewer
 * ----------
 * Visualizador de pseudocódigo con resaltado de líneas.
 */
function CodeViewer({ code = text_default }) {
  return (
    <div className="code-viewer-wrapper">
      {/* HEADER */}
      <div className="code-viewer-header">
        <span className="code-viewer-title">Código</span>
      </div>

      {/* ÁREA DE CÓDIGO CON SCROLL */}
      <div className="code-viewer-container">
        <div tabIndex={0} className="code-viewer-scroll">
          <AnimationCode lines={code} />
        </div>
      </div>
    </div>
  );
}

export default CodeViewer;
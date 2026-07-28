import "../styles/CodeViewer.css";

import { AnimationCode } from "./utils/CodeViewUtils";

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
function CodeViewer({ code = text_default, activeLineIndex = null }) {
  const linesToRender = Array.isArray(code)
    ? code.map((line, index) => ({
        ...line,
        active: activeLineIndex !== null && index === activeLineIndex,
      }))
    : text_default;

  return (
    <div className="code-viewer-wrapper">
      {/* HEADER */}
      <div className="code-viewer-header">
        <span className="code-viewer-title">Código</span>
      </div>

      {/* ÁREA DE CÓDIGO CON SCROLL */}
      <div className="code-viewer-container">
        <div tabIndex={0} className="code-viewer-scroll">
          <AnimationCode lines={linesToRender} />
        </div>
      </div>
    </div>
  );
}

export default CodeViewer;
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        {/* Grafo animado SVG basado en tu logo GO */}
        <div className="graph-logo-wrapper">
          <svg
            viewBox="0 0 300 300"
            className="graph-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Aristas del Pentágono exterior */}
            <g className="edges-outer">
              <line x1="150" y1="30" x2="260" y2="105" className="edge e1" />
              <line x1="260" y1="105" x2="220" y2="230" className="edge e2" />
              <line x1="220" y1="230" x2="80" y2="230" className="edge e3" />
              <line x1="80" y1="230" x2="40" y2="105" className="edge e4" />
              <line x1="40" y1="105" x2="150" y2="30" className="edge e5" />
            </g>

            {/* Aristas del recorrido interno (Letras G y O) */}
            <g className="edges-inner">
              <line x1="120" y1="100" x2="80" y2="125" className="edge e6" />
              <line x1="80" y1="125" x2="105" y2="165" className="edge e7" />
              <line x1="200" y1="100" x2="175" y2="125" className="edge e8" />
              <line x1="175" y1="125" x2="200" y2="155" className="edge e9" />
              <line x1="200" y1="155" x2="200" y2="100" className="edge e10" />
            </g>

            {/* Nodos Exteriotes */}
            <g className="nodes-outer">
              <circle cx="150" cy="30" r="10" className="node n1" />
              <circle cx="260" cy="105" r="10" className="node n2" />
              <circle cx="220" cy="230" r="10" className="node n3" />
              <circle cx="80" cy="230" r="10" className="node n4" />
              <circle cx="40" cy="105" r="10" className="node n5" />
            </g>

            {/* Nodos Interiores */}
            <g className="nodes-inner">
              <circle cx="120" cy="100" r="7" className="node n6" />
              <circle cx="80" cy="125" r="7" className="node n7" />
              <circle cx="105" cy="165" r="7" className="node n8" />
              <circle cx="200" cy="100" r="7" className="node n9" />
              <circle cx="175" cy="125" r="7" className="node n10" />
              <circle cx="200" cy="155" r="7" className="node n11" />
            </g>
          </svg>
        </div>

        <h1 className="error-code">404</h1>
        <h2>Camino no encontrado</h2>
        <p>El algoritmo de recorrido no pudo hallar la ruta solicitada.</p>

        <Link to="/" className="btn-home">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
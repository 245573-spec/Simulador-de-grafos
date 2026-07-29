import { IoSettingsSharp } from "react-icons/io5";
import { SlQuestion , SlBubble, SlControlForward} from "react-icons/sl";
import { CgArrowLongRight, CgAlignBottom } from "react-icons/cg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
/*
 * Header
 * -------
 * Muestra el encabezado principal de la aplicación.
 */
function Header() {
  const [showSupportMenu, setShowSupportMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="header-container">
      
      {/* 1. Sección del Logo */}
      <div className="header-logo-section">
        <div className="logo-wrapper">
          <img
            src="/Simulador-de-grafos/graph.png"
            alt="Logo del simulador"
            className="logo-img"
          />
        </div>
      </div>

      {/* 2. Título Central */}
      <div className="header-title-section">
        <h1 className="header-title">
         <span className="title-accent">Graph</span>ormática 
        </h1>
      </div>

      {/* 3. Botón de Soporte/Ajustes */}
      <div className="header-actions-section">

    <button
        type="button"
        className="btn-support"
        onClick={() => setShowSupportMenu(prev => !prev)}
    >
        <IoSettingsSharp className="btn-support-icon" />
        <span>Soporte</span>
    </button>

    {showSupportMenu && (
        <div className="support-menu">

            <button>
              <CgAlignBottom />
              Ponderado
            </button>

            <button>
              <CgArrowLongRight />
              Dirigido
            </button>

            <button>
              <SlControlForward />
              Velocidad
            </button>

            <button>
              <SlBubble />
              Subtitulado
            </button>
            
            <button onClick={() => navigate("/quienes-somos")}>
              <SlQuestion />
              ¿Quiénes Somos?
            </button>

        </div>
    )}

</div>
    </header>
  );
}

export default Header;
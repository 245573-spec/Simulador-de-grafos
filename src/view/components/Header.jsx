import logo from "../../assets/AlpacAPP General.png";
import { IoSettingsSharp } from "react-icons/io5";
import "../styles/Header.css";

/*
 * Header
 * -------
 * Muestra el encabezado principal de la aplicación.
 */
function Header() {
  return (
    <header className="header-container">
      
      {/* 1. Sección del Logo */}
      <div className="header-logo-section">
        <div className="logo-wrapper">
          <img
            src={logo}
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
        <button type="button" className="btn-support">
          <IoSettingsSharp className="btn-support-icon" />
          <span>Soporte</span>
        </button>
      </div>

    </header>
  );
}

export default Header;
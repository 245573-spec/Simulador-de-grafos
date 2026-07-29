import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

/*
 * HeaderWho
 * ---------
 * Encabezado para la página "¿Quiénes Somos?".
 * Al hacer clic en el título Graphormática
 * se regresa a la página principal.
 */
function HeaderWho() {

    const navigate = useNavigate();

    return (
        <header className="header-container">

            {/* Logo */}
            <div className="header-logo-section">
                <div className="logo-wrapper">
                    <img
                        src="/Simulador-de-grafos/graph.png"
                        alt="Logo del simulador"
                        className="logo-img"
                    />
                </div>
            </div>

            {/* Título */}
            <div className="header-title-section">

                <h1
                    className="header-title clickable-title"
                    onClick={() => navigate("/")}
                >
                    <span className="title-accent">Graph</span>ormática
                </h1>

            </div>

        </header>
    );
}

export default HeaderWho;
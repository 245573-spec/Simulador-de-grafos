import logo from "../../assets/AlpacAPP General.png"
import { IoSettingsSharp } from "react-icons/io5";
import "../styles/Header.css";
/*
 * Header
 * -------
 * Muestra el encabezado principal de la aplicación.
 */

function Header() {

    return (

        <header className="header">

            <div className="header-logo">

                <img src={logo} alt="Logo del simulador" className="logo"/>

            </div>

            <div className="header-title">

                <h1>Simulador de Grafos</h1>

            </div>

            <div className="header-support">

                <button>
                    <IoSettingsSharp/>
                    Soporte
                </button>

            </div>

        </header>

    );

}

export default Header;
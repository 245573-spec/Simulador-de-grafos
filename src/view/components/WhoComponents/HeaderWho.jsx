import { useNavigate } from "react-router-dom";


import "../../styles/WhoStyles/HeaderWho.css"

function HeaderWho() {

    const navigate = useNavigate();

    return (
        <header className="who-header-container">

    <div className="who-header-logo-section">

        <div className="who-logo-wrapper">
            <img
            src="/Simulador-de-grafos/graph.png"
            alt="Logo del simulador"
            className="logo-img"
          />
        </div>

    </div>

    <div
        className="who-header-title-section"
        onClick={() => navigate("/")}
    >
        <h1 className="who-header-title">
            <span className="who-title-accent">Graph</span>ormática
        </h1>
    </div>

    <div></div>

</header>
    );
}

export default HeaderWho;
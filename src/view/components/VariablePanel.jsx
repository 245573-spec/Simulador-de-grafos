import "../styles/VariablePanel.css";

function VariablePanel() {

    return (

        <aside className="variable-panel">

            <h2>Variables</h2>

            <div className="variable-card">

                <h3>Nodo actual</h3>

                <p>-</p>

            </div>

            <div className="variable-card">

                <h3>Visitados</h3>

                <p>-</p>

            </div>

            <div className="variable-card">

                <h3>Estructura auxiliar</h3>

                <p>-</p>

            </div>

        </aside>

    );

}

export default VariablePanel;
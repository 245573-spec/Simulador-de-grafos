/*
 * VariablePanel
 * -------------
 * Muestra el estado de las variables del algoritmo en ejecución.
 */

function VariablePanel() {

    return (

        <aside className="variable-panel">

            <h2>Variables</h2>

            <div className="variables-container">

                <p><strong>Nodo actual:</strong> -</p>

                <p><strong>Visitados:</strong> -</p>

                <p><strong>Estructura auxiliar:</strong> -</p>

            </div>

        </aside>

    );

}

export default VariablePanel;
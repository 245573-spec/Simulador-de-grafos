import "../styles/GraphCanvas.css"
/*
 * GraphCanvas
 * -----------
 * Área principal donde se dibujará el grafo.
 */

function GraphCanvas() {

    return (

        <main className="graph-canvas">

            <h2>Área del Grafo</h2>

            <canvas Name="canvas-container">
                Aquí se mostrará el grafo.
            </canvas>

        </main>

    );

}

export default GraphCanvas;
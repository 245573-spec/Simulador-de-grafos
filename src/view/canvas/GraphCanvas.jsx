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

            <canvas id="graphcanva" class="-full h-64 bg-slate-100 border-2 border-slate-300 rounded-lg shadow-inner"></canvas>

        </main>

    );

}

export default GraphCanvas;
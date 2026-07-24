/*
 * Sidebar
 * -------
 * Panel lateral que muestra los algoritmos disponibles.
 */

function Sidebar() {

    return (

        <aside className="sidebar">

            <h2>Algoritmos</h2>

            <ul className="algorithm-list">

                <li>BFS</li>

                <li>DFS</li>

                <li>Dijkstra</li>

                <li>Bellman-Ford</li>

                <li>Prim</li>

                <li>Kruskal</li>

            </ul>

        </aside>

    );

}

export default Sidebar;
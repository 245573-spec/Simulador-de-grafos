import "../styles/Sidebar.css"
/*
 * Sidebar
 * -------
 * Panel lateral que muestra los algoritmos disponibles.
 */

function Sidebar() {

    return (

<aside className="sidebar">

    <h2>Algoritmos</h2>

    <div className="algorithm-container">

        <ul className="algorithm-list">

            <li><button>BFS</button></li>

            <li><button>DFS</button></li>

            <li><button>Dijkstra</button></li>

            <li><button>Bellman-Ford</button></li>

            <li><button>Prim</button></li>

            <li><button>Kruskal</button></li>

        </ul>

    </div>

</aside>

    );

}

export default Sidebar;
import { useState, useEffect } from "react";
import { useSimulation } from "./useSimulation";

import { Graph } from "../model/obj/Graph"

// Importaciones de modelo/algoritmos en el controlador
import { runBFS } from "../model/algorithms/bfs";
import { runDFS } from "../model/algorithms/dfs";
import { runDijkstra } from "../model/algorithms/dijkstra";
import { runKruskal } from "../model/algorithms/kruskal";
import { runPrim } from "../model/algorithms/prim";
import { runBellmanFord } from "../model/algorithms/bellman-ford";

// Importación del pseudocódigo para cada vista
import { code_bfs } from "../view/components/algorithmsView/bfsView"; 
import { code_dfs } from "../view/components/algorithmsView/dfsView"; 
import { code_prim } from "../view/components/algorithmsView/primView"; 
import { code_kruskal } from "../view/components/algorithmsView/kruskalView"; 
import { code_bellman } from "../view/components/algorithmsView/bellman-fordView"; 
import { code_dijkstra } from "../view/components/algorithmsView/dijkstraView";

const ALGORITHMS_CATEGORY = {
  "Recorridos": ["BFS", "DFS"],
  "Caminos minimos": ["Dijkstra", "Bellman-Ford"],
  "Arboles de expansion": ["Prim", "Kruskal"],
};

const CODES = {
  "DFS": code_dfs(),
  "BFS": code_bfs(),
  "Prim": code_prim(),
  "Kruskal": code_kruskal(),
  "Dijkstra": code_dijkstra(),
  "Bellman-Ford": code_bellman(),
};

const ALGORITHM_RUNNERS = {
  'BFS': (g) => runBFS(g, 'A'),
  'DFS': (g) => runDFS(g, 'A'),
  'Dijkstra': (g) => runDijkstra(g, 'A'),
  'Bellman-Ford': (g) => runBellmanFord(g, 'A'),
  'Prim': (g) => runPrim(g, 'A'),
  'Kruskal': (g) => runKruskal(g),
};


export function useMainPageController(graph) {
    const [activeCategory, setActiveCategory] = useState("Recorridos");
    const [selectedAlgo, setSelectedAlgo] = useState(ALGORITHMS_CATEGORY["Recorridos"][0]);
    const [isGraphViewOpen, setIsGraphViewOpen] = useState(false);
    const [simulationSteps, setSimulationSteps] = useState([]);
    
    const [velocity, setVelocity] = useState(500);

    const [errorState, setErrorState] = useState({
        isOpen: false,
        title: "",
        message: ""
    });

    const { currentFrame, isPlaying, pause, play, resume, reset } = useSimulation(simulationSteps, velocity);

    const showError = (title, message) => {
        setErrorState({ isOpen: true, title, message });
    };

    const closeErrorModal = () => {
        setErrorState(prev => ({ ...prev, isOpen: false }));
    };

    const handleEjecutarAlgoritmo = () => {
        const runner = ALGORITHM_RUNNERS[selectedAlgo];
        if (!runner) return;

        reset();
        setSimulationSteps(runner(graph));
        play();
    };

    const handlePause = () => {
        pause();
    };

    const handleResume = () => {
        resume();
    }
    const handleReset = () => {
        reset();
        setSimulationSteps([]); 
    };

    const handleSelectCategory = (category) => {
        setActiveCategory(category);
        reset();
        const newAlgoList = ALGORITHMS_CATEGORY[category];
        if (newAlgoList && newAlgoList.length > 0) {
            setSelectedAlgo(newAlgoList[0]);
        }
    };

    // Validaciones de compatibilidad de grafo segun la categoría
    useEffect(() => {
        if (activeCategory === 'Arboles de expansion' && graph?.directed) {
        showError(
            "Grafo Incompatible", 
            "La categoría 'Árboles de expansión' requiere un grafo NO dirigido."
        );
        setActiveCategory('Recorridos');
        setSelectedAlgo("BFS");
        return;
        }
        if (activeCategory === 'Arboles de expansion' && !graph?.weighted) {
        showError(
            "Grafo Incompatible", 
            "La categoría 'Árboles de expansión' requiere que el grafo sea PONDERADO."
        );
        setActiveCategory('Recorridos');
        setSelectedAlgo("BFS");
        return;
        }
        if (activeCategory === 'Caminos minimos' && !graph?.weighted) {
        showError(
            "Grafo Incompatible", 
            "La categoría 'Caminos mínimos' requiere que el grafo sea PONDERADO."
        );
        setActiveCategory('Recorridos');
        setSelectedAlgo("BFS");
        return;
        }
    }, [activeCategory, graph?.directed, graph?.weighted]);

    const [, setTick] = useState(0);
    const refreshGraph = () => setTick(prev => prev + 1);
    const toggleWeighted = () => {
        if (!graph) return;
            graph.weighted = !graph.weighted; 
            refreshGraph();
        };

    const toggleDirected = () => {
        if (!graph) return;
            graph.directed = !graph.directed;
            refreshGraph(); 
        };


    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isSpeedOpen, setIsSpeedOpen] = useState(false);

    const [showSubtitles, setShowSubtitles] = useState(false);
    const toggleSubtitles = () => {
        setShowSubtitles((prev) => !prev);
    };
    useEffect(() => {
        if (showSubtitles) {
            setVelocity(3000);
        }
    }, [showSubtitles]);

    const handleDeleteGraph = () => {
        reset();     
        graph.clear();
        refreshGraph(); 
    };

    // Función auxiliar para mantener la vista limpia (Lógica de negocio en el controlador)
    const getAuxLabel = () => {
        switch(selectedAlgo) {
            case "DFS": return "Pila";
            case "Dijkstra":
            case "Prim": return "Cola de Prioridad";
            case "Kruskal": return "Aristas Restantes";
            case "Bellman-Ford": return "Distancias";
            default: return "Cola"; // BFS
        }
    };

  return {
    // Estado
    activeCategory,
    selectedAlgo,
    currentFrame,
    itsPlaying: isPlaying,
    activeLineIndex: currentFrame?.codeLine ?? null,
    currentCode: CODES[selectedAlgo],
    auxLabel: getAuxLabel(),
    availableAlgorithms: ALGORITHMS_CATEGORY[activeCategory],
    isGraphViewOpen,
    errorState,
    isAddOpen,
    isWeighted: graph?.weighted ?? false,
    isDirected: graph?.directed ?? false,
    velocity,
    isSpeedOpen,
    showSubtitles,

    // Acciones/Manejadores
    setSelectedAlgo,
    setIsGraphViewOpen,
    handleSelectCategory,
    handleEjecutarAlgoritmo,
    handlePause,
    handleResume,
    handleReset,
    closeErrorModal,
    setIsAddOpen,
    toggleWeighted,
    toggleDirected,
    setVelocity,
    setIsSpeedOpen,
    toggleSubtitles,
    handleDeleteGraph,
  };
}
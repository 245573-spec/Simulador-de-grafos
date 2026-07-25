import { useState } from "react";

import Header from "../components/Header";
import CategoryTabs from "../components/CategoryTabs";
import Sidebar from "../components/Sidebar";
import CodeViewer from "../components/CodeViewer";
import VariablePanel from "../components/VariablePanel";
import BottomToolbar from "../components/BottomToolbar";
//import "../styles/MainPage.css";
import "../../index.css";

import GraphCanvas from"../canvas/GraphCanvas"
/*
Funcion MainPage para cargar la página principal
va a cargar los archivos como Header, CategoryTabs, Sidebar ,etc...
*/
function MainPage() {

    const algorithmsCategory = {
        "Recorridos": ["BFS", "DFS"],
        "Caminos minimos": ["Dijkstra", "Bellman-Ford"],
        "Arboles de expansion": ["Prim", "Kruskal"],
    };

    const [activeCategory, setActiveCategory] = useState("Recorridos");

    const [selectedAlgo, setSelectedAlgo] = useState(
    algorithmsCategory["Recorridos"][0]
    );

    const handleSelectCategory = (category) => {
    setActiveCategory(category);
    
    const newAlgoList = algorithmsCategory[category];
        if (newAlgoList && newAlgoList.length > 0) {
        setSelectedAlgo(newAlgoList[0]);
        }
    };


    return (
        <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#0b0f17] text-slate-100">
        <Header />

        <CategoryTabs
        activeCategory = {activeCategory}
        onSelectCategory= {handleSelectCategory} />

        <div className="grid flex-1 grid-cols-[repeat(24,minmax(0,1fr))] gap-4 p-4 overflow-hidden min-h-0">
            
            <aside className="col-span-6 flex flex-col gap-3 overflow-hidden h-full">
            <div className="shrink-0">
                <Sidebar 
                    algorithms = {algorithmsCategory[activeCategory]}
                    selectedAlgo = {selectedAlgo}
                    onSelectAlgorithm = {setSelectedAlgo}  />
            </div>
            <div className="flex-1 min-h-0">
                <CodeViewer />
            </div>
            </aside>

            <section className="col-span-13 flex flex-col gap-3 h-full relative overflow-hidden">
            <div className="flex-1 min-h-0 relative">
                <GraphCanvas />
            </div>

            <div className="shrink-0 flex justify-center">
                <BottomToolbar />
            </div>
            </section>

            {/* PANEL DERECHO: Variables (3 de 12 cols) */}
            <aside className="col-span-5 flex flex-col gap-3 overflow-y-auto h-full">
            <VariablePanel />
            </aside>

        </div>
        </div>
    );
}
export default MainPage;
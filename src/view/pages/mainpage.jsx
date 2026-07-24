import Header from "../components/Header";
import CategoryTabs from "../components/CategoryTabs";
import Sidebar from "../components/Sidebar";
import CodeViewer from "../components/CodeViewer";
import VariablePanel from "../components/VariablePanel";
import BottomToolbar from "../components/BottomToolbar";
import "../styles/MainPage.css";
import "../../index.css";

import GraphCanvas from"../canvas/GraphCanvas"
/*
Funcion MainPage para cargar la página principal
va a cargar los archivos como Header, CategoryTabs, Sidebar ,etc...
*/
function MainPage(){

    return (
        <div className="main-page">
            
            <Header />

            
            <CategoryTabs />

            <div className="workspace">
                <aside className="left-panel">
                    <Sidebar />


                    <CodeViewer />

                </aside>

                <GraphCanvas />

                <VariablePanel />
            </div>

            <BottomToolbar />

                
        </div>
    );
}
export default MainPage;
import "../../styles/WhoStyles/WhoTabs.css"
function WhoTabs({ activeTab, onSelectTab }) {

    const tabs = [
        "Integrantes",
        "Trayectoria",
        "Agradecimientos"
    ];

    return (

        <nav className="who-tabs">

            {tabs.map((tab) => {

                const isActive = activeTab === tab;

                return (

                    <button
                        key={tab}
                        className={`tab-button ${isActive ? "active" : ""}`}
                        onClick={() => onSelectTab(tab)}
                    >
                        {tab}
                    </button>

                );

            })}

        </nav>

    );

}

export default WhoTabs;
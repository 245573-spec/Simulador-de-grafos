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
                        onClick={() => onSelectTab(tab)}
                        className={`tab-button ${isActive ? "active" : ""}`}
                    >
                        {tab}
                    </button>
                );

            })}

        </nav>
    );
}

export default WhoTabs;
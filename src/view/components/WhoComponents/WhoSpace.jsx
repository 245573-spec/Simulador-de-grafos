import IntegrantesSection from "./IntegrantesSection";
import TrayectoriaSection from "./TrayectoriaSection";
import AgradecimientosSection from "./AgradecimientosSection";

import "../../styles/WhoStyles/WhoSpace.css";

function WhoSpace({ activeTab }) {

    return (

        <main className="who-space">

            {activeTab === "Integrantes" && (
                <IntegrantesSection />
            )}

            {activeTab === "Trayectoria" && (
                <TrayectoriaSection />
            )}

            {activeTab === "Agradecimientos" && (
                <AgradecimientosSection />
            )}

        </main>

    );

}

export default WhoSpace;
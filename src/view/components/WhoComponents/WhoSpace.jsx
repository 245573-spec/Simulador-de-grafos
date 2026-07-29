import IntegrantesSection from "./IntegrantesSection";
import TrayectoriaSection from "./TrayectoriaSection";
import AgradecimientosSection from "./AgradecimientosSection";

function WhoSpace({ activeTab }) {

    switch (activeTab) {

        case "Integrantes":
            return <IntegrantesSection />;

        case "Trayectoria":
            return <TrayectoriaSection />;

        case "Agradecimientos":
            return <AgradecimientosSection />;

        default:
            return null;
    }
}

export default WhoSpace;
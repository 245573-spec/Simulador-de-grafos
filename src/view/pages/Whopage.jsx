import { useState } from "react";
import WhoTabs from "../components/WhoComponents/WhoTabs";
import WhoSpace from "../components/WhoComponents/WhoSpace";

function WhoPage() {

    const [activeTab, setActiveTab] = useState("Integrantes");

    return (
        <div className="who-page">

            <WhoTabs
                activeTab={activeTab}
                onSelectTab={setActiveTab}
            />

            <WhoSpace
                activeTab={activeTab}
            />

        </div>
    );
}

export default WhoPage;
import { useState } from "react";
import HeaderWho from "../components/WhoComponents/HeaderWho";
import WhoTabs from "../components/WhoComponents/WhoTabs";
import WhoSpace from "../components/WhoComponents/WhoSpace";

import "../styles/WhoStyles/WhoPage.css";

function WhoPage() {

    const [activeTab, setActiveTab] = useState("Integrantes");

    return (
        <div className="who-page">

            <HeaderWho />

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
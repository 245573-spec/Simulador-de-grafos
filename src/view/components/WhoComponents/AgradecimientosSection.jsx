import ItCard from "./ItCards";

import chatgpt from "../../../assets/Ia/chatgpt.png";
import cloud from "../../../assets/Ia/cloud.png";
import gemini from "../../../assets/Ia/gemini.png";
import metaia from "../../../assets/Ia/metaia.jpg";

function AgradecimientosSection() {

    const agradecimientos = [
        {
            id: 1,
            image: chatgpt,
            name: "ChatGPT",
            role: "Instructor",
            description: "Agradecemos su apoyo y orientación durante el desarrollo del proyecto Graphormática."
        },
        {
            id: 2,
            image: gemini,
            name: "Gemini",
            role: "Instructor",
            description: "Agradecemos su apoyo y orientación durante el desarrollo del proyecto Graphormática."
        },
        {
            id: 3,
            image: cloud,
            name: "Cloud",
            role: "Instructor",
            description: "Agradecemos su apoyo y orientación durante el desarrollo del proyecto Graphormática."
        },
        {
            id: 2,
            image: metaia,
            name: "MetaIA",
            role: "Instructor",
            description: "Agradecemos su apoyo y orientación durante el desarrollo del proyecto Graphormática."
        }
    ];

    return (
        <section className="agradecimientos-section">

            <div className="cards-container">

                {agradecimientos.map((persona) => (
                    <ItCard
                        key={persona.id}
                        image={persona.image}
                        name={persona.name}
                        role={persona.role}
                        description={persona.description}
                    />
                ))}

            </div>

        </section>
    );
}

export default AgradecimientosSection;
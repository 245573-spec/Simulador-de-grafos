import ItCard from "./ItCards";

import chatgpt from "../../../assets/Ia/chatgpt.png";
import cloud from "../../../assets/Ia/cloud.png";
import gemini from "../../../assets/Ia/gemini.png";
import metaia from "../../../assets/Ia/metaia.jpg";
import yuri from "../../../assets/team/Yuri-san.jpeg";
import hjejo from "../../../assets/team/hjejo.jpeg";

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
            id: 4,
            image: metaia,
            name: "MetaIA",
            role: "Instructor",
            description: "Agradecemos su apoyo y orientación durante el desarrollo del proyecto Graphormática."
        },
        {
            id: 5,
            image: yuri,
            name: "Victor Y. Morales Valeriano",
            role: "Soporte",
            description: "Agradecemos su ayuda y compañía durante el desarrollo del proyecto"
        },
        {
            id: 6,
            image: hjejo,
            name: "Jeyson J. Chacon Hancco",
            role: "Soporte",
            description: "Agradecemos su apoyo y compañía durante el desarrollo del proyecto"
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
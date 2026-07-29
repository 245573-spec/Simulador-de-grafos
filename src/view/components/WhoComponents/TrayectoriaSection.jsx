import ItCard from "./ItCards";

import profesor1 from "../../../assets/docentes/vanessa.webp";
import profesor2 from "../../../assets/docentes/tany.webp";
import profesor3 from "../../../assets/docentes/Gerar.webp";
import profesor4 from "../../../assets/docentes/sinfoto.webp";
import profesor5 from "../../../assets/docentes/Edwin.webp";
import profesor6 from "../../../assets/docentes/sonia.webp";
import profesor7 from "../../../assets/docentes/Lino.webp";
import profesor8 from "../../../assets/docentes/sinfotomujer.webp";
function TrayectoriaSection() {

    const profesores = [
        {
            id: 1,
            image: profesor1,
            name: "Mgt. Vanessa Maribel Choque Soto",
            role: "Docente de curso",
            description: "Algoritmos y Estructura de Datos II"
        },
        {
            id: 2,
            image: profesor2,
            name: "Mgt. Tany Villalba Villalba",
            role: "Docente de curso",
            description: "Programación II"
        },
        {
            id: 3,
            image: profesor3,
            name: "Mgt. Gerar Francis Quispe Torres",
            role: "Docente de curso",
            description: "Modelos Probabilísticos"
        },
        {
            id: 4,
            image: profesor4,
            name: "Dr. Hans Harley Ccacyahuillca Bejar",
            role: "Docente de curso",
            description: "Modelos Probabilísticos"
        },
        {
            id: 5,
            image: profesor5,
            name: "Dr. Edwin Carrasco Poblete",
            role: "Docente de curso",
            description: "Programación I"
        },
        {
            id: 6,
            image: profesor6,
            name: "Dra. Nila Zonia Acurio Usca",
            role: "Docente de curso",
            description: "Algoritmos y Estructuras de Datos I"
        },
        {
            id: 7,
            image: profesor8,
            name: "Mgt. Efraina Gladys Cutipa Arapa",
            role: "Docente de curso",
            description: "Pensamiento Computacional e I.A"
        },
        {
            id: 8,
            image: profesor7,
            name: "Ing. Lino Aquiles Baca Cárdenas",
            role: "Docente de curso",
            description: "Pensamiento Computacional e I.A"
        },
        {
            id: 9,
            image: profesor4,
            name: "Mgt. Javier David Chávez Centeno",
            role: "Docente de curso",
            description: "Fundamentos de la Programación"
        },
        
        


    ];

    return (
        <section className="trayectoria-section">

            <div className="cards-container">

                {profesores.map((profesor) => (
                    <ItCard
                        key={profesor.id}
                        image={profesor.image}
                        name={profesor.name}
                        role={profesor.role}
                        description={profesor.description}
                    />
                ))}

            </div>

        </section>
    );
}

export default TrayectoriaSection;
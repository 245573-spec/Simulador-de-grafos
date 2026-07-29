import ItCard from "./ItCards";
import "../../styles/WhoStyles/IntegrantesSection.css";
import elfeo from "../../../assets/team/elfeo.jpg"
import marco from "../../../assets/team/Marco.jpg"
import max from "../../../assets/team/max.jpeg"
import carlos from "../../../assets/team/Carlos.jpeg"

// Imágenes (de momento puedes comentarlas o usar una imagen temporal)
// import marcoImg from "../../../assets/marco.png";
// import juanImg from "../../../assets/juan.png";

function IntegrantesSection() {

    const integrantes = [
        {
            id: 1,
            image: marco,
            name: "Marco A. Aroni Perez",
            role: "Intento de Desarrollador Front-End",
            description: "Encargado del diseño e implementación de la interfaz del simulador."
        },
        {
            id: 2,
            image: max,
            name: "Max S. Holguino Nuñez",
            role: "Intento de Project Manager",
            description: "Encargado de la supervisión del proyecto(Desarrollador Full-Stack)."
        },
        {
            id: 3,
            image: elfeo,
            name: "Alvaro O. Quispe Ballón",
            role: "Intento de Desarrollador Back-End",
            description: "Encargado del modelado de animaciones."
        },
        {
            id: 4,
            image: carlos,
            name: "Carlos Quispe Crispín",
            role: "Intento de Desarrollador Back-End",
            description:"Encargado del mapeo de algoritmos"
        }
    ];

    return (
        <section className="integrantes-section">

            <div className="cards-container">

                {integrantes.map((integrante) => (
                    <ItCard
                        key={integrante.id}
                        image={integrante.image}
                        name={integrante.name}
                        role={integrante.role}
                        description={integrante.description}
                    />
                ))}

            </div>

        </section>
    );
}

export default IntegrantesSection;
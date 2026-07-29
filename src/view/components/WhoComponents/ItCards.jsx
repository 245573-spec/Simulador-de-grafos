import "../../styles/WhoStyles/ItCard.css";
function ItCard({
    image,
    name,
    role,
    description
}) {

    return (

        <article className="it-card">

            <img
                src={image}
                alt={name}
                className="it-card-image"
            />

            <div className="it-card-content">

                <h3 className="it-card-name">
                    {name}
                </h3>

                <span className="it-card-role">
                    {role}
                </span>

                <p className="it-card-description">
                    {description}
                </p>

            </div>

        </article>

    );

}

export default ItCard;
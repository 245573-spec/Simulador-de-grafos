function ItCard({
    image,
    name,
    role,
    description
}) {
    return (
        <article className="it-card">

            <div className="it-card-image">

                <img
                    src={image}
                    alt={name}
                />

            </div>

            <div className="it-card-content">

                <h3>{name}</h3>

                <span>{role}</span>

                <p>{description}</p>

            </div>

        </article>
    );
}

export default ItCard;
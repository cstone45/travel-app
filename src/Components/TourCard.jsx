import React, { useState } from 'react';

function TourCard({ id, name, info, price, image, onRemove }) {
    const [readMore, setReadMore] = useState(false); //Creates the Tour Card function

    return (
        <article className="tour-card">
            <img src={image} alt={name} style={{ width: '100%' }} />
            <h3>{name}</h3>
            <h4>${price}</h4>
            <p>
                {readMore ? info : `${info.substring(0, 80)}...`}
                <button onClick={() => setReadMore(!readMore)}>
                    {readMore ? "Show Less" : "Read More"}
                </button>
            </p>
            <button className="btn-remove" onClick={() => onRemove(id)}>
                Not Interested
            </button>
        </article>
    ); //Creates the Basic TourCard format and adds the Show more/Show less button
}

export default TourCard; //Exports TourCard
import React, {useState} from 'react'; //Imports the react software

function TourCard({id, name, info, price, image, onRemove}) { //Created TourCard function
    const [readMore, setReadMore] = useState(false);
    return (
        <article className="tour-card">
            <h3>{name}</h3>
            <h4>{price}</h4>
            <h5>{image}</h5>
            <p>
                {readMore ? info : `${info.substring(0, 80)}...`}
                <button onClick={() => setReadMore(!readMore)}>
                {readMore ? "Show Less" : "Read More"}
                </button>
            </p> 
        <button className="btn-remove" onClick={() => {
           onRemove(id) 
        }}>Not Interested</button>
        </article>
    )
} //Establishes the structure of the Tour Card on the website and establishes the remove button

export default TourCard; //Exports the Tour Card to any file which imports it
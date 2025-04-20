import React, {useEffect, useState} from 'react'; //Imports react from react
import TourCard from "./TourCard"; //Imports the TourCard format from TourCard.jsx

const TourList = ({tours, setTours, onRemove}) => { //Created the TourList function
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => { //Uses useEffect to fetch data
        fetch('https://course-api.com/react-tours-project') //Fetches the Data from this website
        setLoading(true); //Created a loading screen effect when the data is loading
        setError(false); //Sets Error to false
        then(response => response.json()) //Converts the response to JSON
        then(data => setTours(tours)); //Displays the Data of each tour in the cards
    }, []);
    return ( //Returns the Tour Information from Each Card
        <ul>
            {tours.map(tours => (
                <li key={tours.id}>
                    {tour.name} - {tour.price} - {tour.image}
                </li>
            ))}
        </ul>
    );
catch (error) {
    setError(true);
    console.log("Failed to Fetch Data");
}; //Created a system to catch errors
}

export default TourList;
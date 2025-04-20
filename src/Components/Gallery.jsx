import React, {useEffect, useState} from 'react'; //Imports react from react
import TourCard from "./TourCard"; //Imports the TourCard format from TourCard.jsx

const TourList = ({tours, setTours, onRemove}) => { //Created the TourList function
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => { //Uses useEffect to fetch data
        const fetchData = async () => {
            try {
                setLoading(true); //Created a loading screen effect when the data is loading
                setError(false); //Sets Error to false
                const response = await fetch('https://course-api.com/react-tours-project'); //Fetches the Data from this website
                const data = await response.json(); //Converts the response to JSON
                setTours(data); //Displays the Data of each tour in the cards
            } catch (error) {
                setError(true);
                console.log("Failed to Fetch Data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
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
}
export default TourList;
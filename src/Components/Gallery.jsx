import React, { useEffect, useState } from 'react';
import TourCard from './TourCard'; //Imports the TourCard tenplate from TourCard.jsx

const TourList = ({ tours, setTours }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [filteredTours, setFilteredTours] = useState([]); // State for filtered tours
    const [selectedName, setSelectedName] = useState(''); // State for selected name

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await fetch('https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project');
            const data = await response.json();
            setTours(data);
            setFilteredTours(data); // Initialize filtered tours
        } catch (error) {
            setError(true);
            console.error("Failed to Fetch Data", error);
        } finally {
            setLoading(false);
        } //Creates the process to fetch the data from the API and display it on the webpage
    };

    useEffect(() => {
        fetchData();
    }, [setTours]); //Fetches the data when the component mounts

    const handleRemoveTour = (id) => {
        const updatedTours = tours.filter((tour) => tour.id !== id);
        setTours(updatedTours);
        setFilteredTours(updatedTours);
    }; //Created a function to remove a tour from the list when the Not Interested button is clicked

    const handleFilterChange = (event) => {
        const name = event.target.value;
        setSelectedName(name);
        if (name === '') {
            setFilteredTours(tours); // Show all tours if no name is selected
        } else {
            setFilteredTours(tours.filter((tour) => tour.name === name)); // Filter tours by name
        }
    }; //Created a function to filter the tours by name

    if (loading) {
        return <p>Loading...</p>;
    } //Creates a Loading text when the Tours are loading on the webpage

    if (error) {
        return <p>Failed to load tours. Please try again later.</p>;
    } //Created an Error Message when Tours fail to load

    return (
        <div>
            <div>
                <label htmlFor="name-filter">Filter by Name: </label>
                <select id="name-filter" value={selectedName} onChange={handleFilterChange}>
                    <option value="">All Names</option>
                    {Array.from(new Set(tours.map((tour) => tour.name))).map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))} 
                </select>
            </div>
            {filteredTours.length === 0 ? ( //Created the parameters for which the Refresh Button will appear and be clickable
                <div> 
                    <p>No Tours Left. Refresh to Reload.</p> 
                    <button onClick={fetchData}>Refresh</button> 
                </div> //Fetches the Data when the Refresh button is clicked
            ) : (
                <ul>
                    {filteredTours.map((tour) => (
                        <li key={tour.id}>
                            <TourCard
                                id={tour.id}
                                name={tour.name}
                                info={tour.info}
                                price={tour.price}
                                image={tour.image}
                                onRemove={handleRemoveTour} //Adds the function to remove the card to the Tour Card via the Not Interested button
                            />
                        </li> //Creates the Display of information on the Tour Card
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TourList;
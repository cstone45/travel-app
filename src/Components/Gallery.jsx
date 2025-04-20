import React, { useEffect, useState } from 'react';
import TourCard from './TourCard'; // Import the TourCard component

const TourList = ({ tours, setTours }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await fetch('https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project');
            const data = await response.json();
            setTours(data); // Update tours state
        } catch (error) {
            setError(true);
            console.error("Failed to Fetch Data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [setTours]); // Fetch data on component mount

    const handleRemoveTour = (id) => {
        setTours(tours.filter((tour) => tour.id !== id)); // Remove the tour with the given id
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Failed to load tours. Please try again later.</p>;
    }

    return (
        <div>
            {tours.length === 0 ? (
                <div>
                    <p>No Tours Left. Refresh to Reload.</p>
                    <button onClick={fetchData}>Refresh</button> {/* Refresh button */}
                </div>
            ) : (
                <ul>
                    {tours.map((tour) => (
                        <li key={tour.id}>
                            <TourCard
                                id={tour.id}
                                name={tour.name}
                                info={tour.info}
                                price={tour.price}
                                image={tour.image}
                                onRemove={handleRemoveTour} // Pass the remove handler
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TourList;
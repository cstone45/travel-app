import React, { useEffect, useState } from 'react';
import TourCard from './TourCard';

const TourList = () => {
    const [tours, setTours] = useState([]); // Store tours in useState
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await fetch('https://course-api.com/react-tours-project');
                const data = await response.json();
                setTours(data); // Update tours state
            } catch (error) {
                setError(true);
                console.error("Failed to Fetch Data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []); // Empty dependency array to fetch data on mount

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
                <p>No tours available. Refresh to see them again!</p>
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
                                onRemove={handleRemoveTour}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TourList;
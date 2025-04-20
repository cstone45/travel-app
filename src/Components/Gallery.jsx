import React, { useEffect, useState } from 'react';

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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Failed to load tours. Please try again later.</p>;
    }

    return (
        <ul>
            {tours.map(tour => (
                <li key={tour.id}>
                    {tour.name} - {tour.price} - <img src={tour.image} alt={tour.name} style={{ width: '100px' }} />
                </li>
            ))}
        </ul>
    );
};

export default TourList;
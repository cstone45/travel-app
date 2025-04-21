import React, { useEffect, useState } from 'react';
import TourCard from './TourCard';

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
        }
    };

    useEffect(() => {
        fetchData();
    }, [setTours]);

    const handleRemoveTour = (id) => {
        const updatedTours = tours.filter((tour) => tour.id !== id);
        setTours(updatedTours);
        setFilteredTours(updatedTours);
    };

    const handleFilterChange = (event) => {
        const name = event.target.value;
        setSelectedName(name);
        if (name === '') {
            setFilteredTours(tours); // Show all tours if no name is selected
        } else {
            setFilteredTours(tours.filter((tour) => tour.name === name)); // Filter tours by name
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Failed to load tours. Please try again later.</p>;
    }

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
            {filteredTours.length === 0 ? (
                <div>
                    <p>No Tours Left. Refresh to Reload.</p>
                    <button onClick={fetchData}>Refresh</button>
                </div>
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
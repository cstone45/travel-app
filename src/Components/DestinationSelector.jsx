import React, { useState } from 'react';

const DestinationSelector = ({ tours, onFilter }) => {
    const [selectedDestination, setSelectedDestination] = useState('');

    // Extract unique destination names
    const uniqueDestinations = [...new Set(tours.map((tour) => tour.name))];

    const handleSelectionChange = (event) => {
        const destination = event.target.value;
        setSelectedDestination(destination);
        onFilter(destination); // Pass the selected destination to the parent component
    };

    return (
        <div>
            <label htmlFor="destination-select">Choose a destination: </label>
            <select
                id="destination-select"
                value={selectedDestination}
                onChange={handleSelectionChange}
            >
                <option value="">All Destinations</option>
                {uniqueDestinations.map((destination) => (
                    <option key={destination} value={destination}>
                        {destination}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DestinationSelector;
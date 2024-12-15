// if you don't know what to do create an .env file
// or add authentication and profile creation

import axios from 'axios';
import React, { useState, useEffect } from 'react';

const MainPage = () => {
    const [searchResults, setSearchResults] = useState([]); // Store search results
    const [name, setName] = useState(''); // Name input state
    const [age, setAge] = useState(''); // Age input state
    const [action, setAction] = useState(null); // Tracks whether to search or add
    const [error, setError] = useState(null); // Store any error messages

    // Handle backend operations based on `action`
    useEffect(() => {
        if (!action) return;

        const performAction = async () => {
            try {
                if (action === 'search') {
                    const response = await axios.post('http://localhost:3000/api/findByName', { name });
                    setSearchResults(response.data);
                    console.log('Search Results:', response.data);
                } else if (action === 'add') {
                    const response = await axios.post('http://localhost:3000/api/post', { name, age });
                    console.log('Data saved:', response.data);
                }
            } catch (error) {
                console.error(`Error during ${action}:`, error.response?.data || error.message);
                setError(error.response?.data || error.message);
            } finally {
                setAction(null); // Reset action state
            }
        };

        performAction();
    }, [action]);

    // Validate input for adding data
    const handleAdd = () => {
        if (!name.trim()) {
            alert('Please fill out both name and age fields.');
            return;
        }
        setAction('add'); // Trigger `add` action
    };

    // Trigger search action
    const handleSearch = () => {
        if (!name.trim()) {
            alert('Please enter a valid name.');
            return;
        }
        setAction('search'); // Trigger `search` action
    };

    return (
        <div className="flex justify-center items-center h-screen bg-creme">
            <div>
                <div className="text-center mb-6">
                    <h1>PAGE NAME</h1>
                </div>

                <form className="w-full max-w-sm">
                    <div className="flex items-center border-b border-teal-500 py-2">
                        {/* Name Input */}
                        <input
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="text"
                            placeholder="Full Name"
                            aria-label="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {/* Age Input */}
                        <input
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="number"
                            placeholder="Age"
                            aria-label="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />

                        {/* Search Button */}
                        <button
                            className="flex-shrink-0 bg-lgreen hover:bg-dgreen border-lgreen hover:border-dgreen text-sm border-4 text-white py-1 px-2 rounded"
                            type="button"
                            onClick={handleSearch}
                        >
                            Search
                        </button>

                        {/* Add Button */}
                        <button
                            className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                            type="button"
                            onClick={handleAdd}
                        >
                            Add
                        </button>
                    </div>
                </form>

                {/* Display Search Results */}
                <div>
                    <h2>Results:</h2>
                    {error && <p className="text-red-500">{error}</p>} {/* Error display */}
                    <ul>
                        {searchResults.map((item, index) => (
                            <li key={index}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MainPage;

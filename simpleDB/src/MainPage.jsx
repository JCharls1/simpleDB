import axios from 'axios';
import React, { useState, useEffect } from 'react';

const MainPage = () => {
    const [trigger, setTrigger] = useState(false); // State to control `useEffect`
    const [data, setData] = useState(null); // State to store fetched data
    const [name, setName] = useState(''); // State for name
    const [age, setAge] = useState(''); // State for age


    useEffect(() => {
        if (!trigger) return; // Only run effect if triggered

        const fetchData = async () => {
                try {
                    const response = await axios.post('http://localhost:3000/api/post', { name, age });
                    console.log('Data saved:', response.data);
                } catch (error) {
                    console.error('Error saving data:', error.response?.data || error.message);
                } finally {
                    setTrigger(false); // Reset trigger
                }
        };

        fetchData();
    }, [trigger]); // Dependency array includes `trigger`

    const handleClick = () => {
        if (!name || !age) {
            alert('Please fill out both name and age fields.');
            return;
        }
        setTrigger(true); // Set trigger to true when button is clicked
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-creme">
                <div>
                    <div className="text-center mb-6">
                        <h1>PAGE NAME</h1>
                    </div>

                    <div>
                        <form className="w-full max-w-sm">
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Full Name"
                                    aria-label="Full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} // Update name state
                                />
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="number"
                                    placeholder="Age"
                                    aria-label="Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)} // Update age state
                                />
                                <button 
                                    className="flex-shrink-0 bg-lgreen hover:bg-dgreen border-lgreen hover:border-dgreen text-sm border-4 text-white py-1 px-2 rounded" 
                                    type="button" 
                                    onClick={handleClick} 
                                    >
                                    Search
                                </button>
                                <button 
                                    className="flex-shrink-0  border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" 
                                    type="button">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>    
                </div>
            </div>
        </>
    );
};

export default MainPage;
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios

const ListMessages = () => {
    const [trigger, setTrigger] = useState(false); // State to control useEffect
    const [name, setName] = useState(""); // State to store the name
    const [data, setData] = useState([]); // State to store the fetched data

    useEffect(() => {
        if (!trigger) return; // Only run the effect if triggered

        const findByName = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/findByName', { name });
                setData(response.data); // Update data state with response
                console.log('Data:', response.data);
            } catch (error) {
                console.error('Error finding by name:', error.response?.data || error.message);
            } finally {
                setTrigger(false); // Reset trigger after the effect runs
            }
        };

        findByName();
    }, [trigger]); // Include only `trigger` in dependency array

    const handleClick = () => {
        if (!name.trim()) {
            alert('Please enter a valid name.');
            return;
        }
        setTrigger(true); // Set trigger to true when button is clicked
    };

    return (
        <div>
            <h1>Find Messages by Name</h1>
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Update name state on input change
                    placeholder="Enter name"
                />
                <button onClick={handleClick}>Find</button>
            </div>
            <div>
                <h2>Results:</h2>
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ListMessages;

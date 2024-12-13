import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DatabaseList = () => {
  const [databases, setDatabases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mess, setMess] = useState("");
  

  useEffect(() => {
    // Fetch databases from the backend
    axios.get('http://localhost:3000/items') // Change the URL if needed
      .then(response => {
        setMess(response.data.message);
        setDatabases(response.data.databases);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching databases');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Databases</h1>
      <ul>
        {databases.map((db, index) => (
          <li key={index}>{db}</li>
        ))}
      </ul>
        <h1>asdasd</h1>
      <h1>{mess}</h1>
    </div>
  );
};

export default DatabaseList;

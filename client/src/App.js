import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios'

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('/api/data')
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        console.error(error)
      });
  }, [])

  return (
    <div className = "App">
      <h1>React and Node.js</h1>
      <p>Message from the backend: {data}</p>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { useFetch } from './useFetch';
import './App.css';

function App() {
  const [url, setUrl] = useState(null);
  const data = useFetch({ url, onSuccess: () => console.log('yay') });
  console.log('App rendering');

  return (
    <div className="App">
      hello world
      <div>{JSON.stringify(data)}</div>
      <button onClick={() => setUrl('./srg.json')}>load SRG</button>
      <button onClick={() => setUrl('./sally.json')}>load Sally</button>
    </div>
  );
}

export default App;

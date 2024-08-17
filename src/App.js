import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [numberId, setNumberId] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(http://localhost:9876/numbers/${numberId});
      setResponseData(response.data);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Average Calculator</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Select Number Type:
            <select value={numberId} onChange={(e) => setNumberId(e.target.value)}>
              <option value="">--Choose a Type--</option>
              <option value="p">Prime</option>
              <option value="f">Fibonacci</option>
              <option value="e">Even</option>
              <option value="r">Random</option>
            </select>
          </label>
          <button type="submit" disabled={!numberId || loading}>
            {loading ? 'Loading...' : 'Calculate'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {responseData && (
          <div className="result">
            <h2>Response Data</h2>
            <p><strong>Previous Window State:</strong> {JSON.stringify(responseData.windowPrevState)}</p>
            <p><strong>Current Window State:</strong> {JSON.stringify(responseData.windowCurrState)}</p>
            <p><strong>Numbers:</strong> {JSON.stringify(responseData.numbers)}</p>
            <p><strong>Average:</strong> {responseData.avg !== null ? responseData.avg : 'N/A'}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
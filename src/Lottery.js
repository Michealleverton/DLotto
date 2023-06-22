import React, { useState } from 'react';

function Lottery() {
  const [numbers, setNumbers] = useState('');
  const [cost, setCost] = useState('1');

  const handleSubmit = (event) => {
    event.preventDefault();
    // const chosenNumbers = numbers.split(',').map((number) => parseInt(number.trim(), 10));
    // Generate random lottery numbers here
    // Compare the chosen numbers with the random numbers to determine if the user has won
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Welcome to the Lottery Website</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="ticketNumbers" className="form-label">
            Choose 5 numbers between 1 and 50:
          </label>
          <input
            type="text"
            className="form-control"
            id="ticketNumbers"
            placeholder="e.g. 5, 12, 23, 34, 45"
            value={numbers}
            onChange={(event) => setNumbers(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ticketCost" className="form-label">
            Choose the ticket cost:
          </label>
          <select
            className="form-select"
            id="ticketCost"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
          >
            <option value="1">$1</option>
            <option value="2">$2</option>
            <option value="5">$5</option>
            <option value="10">$10</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Buy Ticket
        </button>
        <button type="reset" className="btn btn-secondary mx-2">
          Reset
        </button>
      </form>
    </div>
  );
}

export default Lottery;
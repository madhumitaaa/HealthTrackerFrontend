import React, { useState } from 'react';
import axios from 'axios';
import './EntryForm.css';
const EntryForm = ({ onAdd }) => {
  const [entry, setEntry] = useState({
    date: '',
    calories: '',
    sleep: '',
    workouts: ''
  });

  const handleChange = (e) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!entry.date || !entry.calories || !entry.sleep) {
      alert("Please fill in Date, Calories, and Sleep fields.");
      return;
    }

    try {
      const res = await axios.post(`https://healthtrackerbackend-9yfh.onrender.com/entries`, entry);
      onAdd(res.data);
      setEntry({ date: '', calories: '', sleep: '', workouts: '' }); 
    } catch (err) {
      console.error("Failed to submit entry:", err);
      alert("Something went wrong while submitting. Please try again.");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="date"
        name="date"
        value={entry.date}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="number"
        name="calories"
        placeholder="Calories"
        value={entry.calories}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="number"
        name="sleep"
        placeholder="Sleep Hours"
        value={entry.sleep}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="text"
        name="workouts"
        placeholder="Workout Description"
        value={entry.workouts}
        onChange={handleChange}
        className="form-input"
      />
      <button type="submit" className="form-button">Add Entry</button>
    </form>
  );
};

export default EntryForm;

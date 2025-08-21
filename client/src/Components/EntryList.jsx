import React from 'react';
import './EntryList.css'; 

const EntryList = ({ entries }) => {
  return (
    <div className="entrylist">
      <h2 style={{ textAlign: 'center' }}>📝 Your Health Logs</h2>
      {[...entries].reverse().map((e, i) => (
        <div key={i} className="entry-card">
          <p id="texts"><strong id="contents">📅 Date:</strong> {e.date}</p>
          <p id="texts"><strong  id="contents">🔥 Calories:</strong> {e.calories}</p>
          <p id="texts"><strong  id="contents">😴 Sleep:</strong> {e.sleep} hrs</p>
          <p id="texts"><strong  id="contents">🏋️ Workout:</strong> {e.workouts}</p>
          
        </div>
        
      ))}

    </div>
  );
  
};

export default EntryList;


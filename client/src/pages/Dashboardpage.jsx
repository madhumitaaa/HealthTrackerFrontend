import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import HealthChart from '../Components/HealthChart';
import '../index.css'; 
const Dashboardpage = () => {
  const [entries, setEntries] = useState([]);

 
useEffect(() => {
  const token = localStorage.getItem("token");
  axios.get('https://healthtrackerbackend-9yfh.onrender.com/entries', {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => setEntries(res.data))
    .catch(err => console.error(err));
}, []);

  const today = new Date().toISOString().slice(0, 10);
  const todayEntries = entries.filter(e => e.date === today);

  const heartRate = todayEntries.length ? todayEntries[0].heartRate || 0 : 0;
  const sleepTotal = todayEntries.reduce((sum, e) => sum + Number(e.sleep || 0), 0);
  const workoutsCount = todayEntries.filter(e => e.workouts).length;
  const stepsTotal = todayEntries.reduce((sum, e) => sum + Number(e.steps || 0), 0);

  return (
    <div className="dashboard">
      <h2>📊 Health Dashboard</h2>
      <div className="metrics-grid">
        <div className="metric-card">❤️ Heart Rate<br /><strong>{heartRate} bpm</strong></div>
        <div className="metric-card">😴 Sleep Today<br /><strong>{sleepTotal}</strong></div>
        <div className="metric-card">🏋️ Workouts<br /><strong>{workoutsCount}</strong></div>
        <div className="metric-card">👣 Steps Today<br /><strong>{stepsTotal}</strong></div>
      </div>
      <HealthChart entries={entries} />
    </div>
  );
};

export default Dashboardpage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import EntryForm from '../Components/EntryForm';
import EntryList from '../Components/EntryList';
import HealthChart from '../Components/HealthChart'; 
import '../index.css';

const EntriesPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    setLoading(true);

    axios.get(`https://healthtrackerbackend-9yfh.onrender.com/entries`, { cancelToken: cancelToken.token })
      .then(res => {
        setEntries(res.data);
        setError(null);
      })
      .catch(err => {
        if (!axios.isCancel(err)) {
          console.error(err);
          setError('Failed to load entries.');
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      cancelToken.cancel();
    };
  }, []);

  const addEntry = async (entry) => {
    try {
      const res = await axios.post(`https://healthtrackerbackend-9yfh.onrender.com/entries`, entry);
      setEntries(prev => [...prev, res.data]);
    } catch (err) {
      console.error(err);
      setError('Failed to add entry.');
    }
  };

const today = new Date().toISOString().slice(0, 10);
const todayEntries = entries.filter(e => e.date === today);

const heartRate = todayEntries.length ? todayEntries[0].heartRate || 0 : 0;


const sleepTotal = todayEntries.reduce((sum, e) => sum + Number(e.sleep || 0), 0);
const workoutsCount = todayEntries.filter(e => e.workouts).length;
const stepsTotal = todayEntries.reduce((sum, e) => sum + Number(e.steps || 0), 0);

  return (
    <div className="app-container">
      <Header />
        <div className="metrics-grid">
      <div className="metric-card">❤️ Heart Rate<br/><strong>{heartRate} bpm</strong></div>
      <div className="metric-card">😴 Sleep Today<br/><strong>{sleepTotal}</strong></div>
      <div className="metric-card">🏋️ Workouts<br/><strong>{workoutsCount}</strong></div>
      <div className="metric-card">👣 Steps Today<br/><strong>{stepsTotal}</strong></div>
    </div>
      <div className="main-content">
        {error && <div className="error">{error}</div>}
        {loading ? (
          <div>Loading entries…</div>
        ) : (
          <>
            <EntryForm onAdd={addEntry} />
            <HealthChart entries={entries} />
            <EntryList entries={entries} />
          </>
        )}
      </div>
    </div>
  );
};

export default EntriesPage;

// SetActivityModal.jsx
import React, { useState } from 'react';
import styles from './Styles/activitymodal.module.css';

const SetActivity = ({ onClose, onSave }) => {
  const [goal, setGoal] = useState('');
  const [unit, setUnit] = useState('km');
  const [time, setTime] = useState('');
  const [timeUnit, setTimeUnit] = useState('m');
  const [isDistanceMode, setIsDistanceMode] = useState(true);

  const handleSave = () => {
    onSave(isDistanceMode ? { goal, unit } : { goal: time, unit: timeUnit });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalHeader}>Set Your Goal</div>
        <div className={styles.toggleGroup}>
          <button
            className={isDistanceMode ? styles.active : ''}
            onClick={() => setIsDistanceMode(true)}
          >
            Distance
          </button>
          <button
            className={!isDistanceMode ? styles.active : ''}
            onClick={() => setIsDistanceMode(false)}
          >
            Time
          </button>
        </div>
        {isDistanceMode ? (
          <div>
            <div className={styles.inputField}>
              <input
                type="number"
                placeholder="Enter goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
              <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                <option value="m">meters</option>
                <option value="km">km</option>
              </select>
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={() => setGoal(1000)}>1 km</button>
              <button onClick={() => setGoal(5000)}>5 km</button>
              <button onClick={() => setGoal(10000)}>10 km</button>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.inputField}>
              <input
                type="number"
                placeholder="Enter time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)}>
                <option value="m">minutes</option>
                <option value="h">hours</option>
              </select>
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={() => { setTime(30); setTimeUnit('m'); }}>30 min</button>
              <button onClick={() => { setTime(60); setTimeUnit('m'); }}>1 hr</button>
              <button onClick={() => { setTime(120); setTimeUnit('m'); }}>2 hrs</button>
            </div>
          </div>
        )}
        <div className={styles.buttonGroup}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SetActivity;

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Styles/maps.module.css';
import { getDistance } from 'geolib';
import { BiTargetLock } from "react-icons/bi";
import L from 'leaflet';
import SetActivity from './setactivity';
import axios from 'axios';

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

function RecenterButton({ location }) {
  const map = useMap();

  const handleClick = () => {
    if (location) {
      map.setView([location.lat, location.lng], map.getZoom());
    }
  };

  return (
    <button onClick={handleClick} className={styles.recenterButton}>
      <BiTargetLock />
    </button>
  );
}

export default function Maps() {
  const [location, setLocation] = useState(null);
  const [path, setPath] = useState([]);
  const [distance, setDistance] = useState(0);
  const [tracking, setTracking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [goal, setGoal] = useState(null);
  const [goalType, setGoalType] = useState('');
  const [goalUnit, setGoalUnit] = useState('');
  const [startDisabled, setStartDisabled] = useState(false);
  const [stopDisabled, setStopDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(0);
  const [goalAchieved, setGoalAchieved] = useState(false);

  useEffect(() => {
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(success, error, { enableHighAccuracy: true });
    } else {
      console.log("Geolocation not supported");
    }
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    let interval;
    if (tracking && !paused) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [tracking, paused]);

  useEffect(() => {
    // Check for goal achievement on distance or time change
    const checkGoalAchievement = () => {
      if (goalType === 'distance' && !goalAchieved && goal !== null) {
        if (distance >= goal * (goalUnit === 'km' ? 1000 : 1)) {
          setGoalAchieved(true);
          console.log("Distance goal achieved");
        }
      }

      if (goalType === 'time' && !goalAchieved && goal !== null) {
        const elapsedSeconds = timer;
        if (elapsedSeconds >= goal * (goalUnit === 'h' ? 3600 : 60)) {
          setGoalAchieved(true);
          console.log("Time goal achieved");
        }
      }
    };

    checkGoalAchievement();
  }, [distance, timer, goalType, goal, goalUnit, goalAchieved]);

  const success = (position) => {
    const { latitude, longitude } = position.coords;
    setLocation({ lat: latitude, lng: longitude });

    if (tracking && !paused) {
      setPath(prevPath => {
        const newPath = [...prevPath, { lat: latitude, lng: longitude }];
        if (prevPath.length > 0) {
          const lastPoint = prevPath[prevPath.length - 1];
          const newDistance = getDistance(lastPoint, { latitude, longitude });
          setDistance(prevDistance => prevDistance + newDistance);
        }
        return newPath;
      });
    }
  };

  const error = () => {
    console.log("Unable to retrieve your location");
  };

  const handleStart = () => {
    setPath([]);
    setDistance(0);
    setTimer(0);
    setGoalAchieved(false);
    setTracking(true);
    setPaused(false);
    setStartDisabled(true);
    setStopDisabled(false);
  };

  const handleStop = async () => {
    setTracking(false);
    setPaused(false);
    setStartDisabled(false);
    setStopDisabled(true);

    // Save activity to server
    await saveActivity();
  };

  const handlePauseResume = () => {
    setPaused(!paused);
  };

  const handleSetActivity = (goalData) => {
    setGoal(goalData.goal);
    setGoalType(goalData.unit === 'h' || goalData.unit === 'm' ? 'time' : 'distance');
    setGoalUnit(goalData.unit);
    setGoalAchieved(false); // Clear any existing goal achieved status
  };

  const saveActivity = async () => {
    const customerId = localStorage.getItem('customerId'); // Retrieve customer ID from local storage

    if (!customerId) {
      console.error('Customer ID not found in local storage');
      return;
    }

    const activity = {
      distance: (distance / 1000).toFixed(2), // converting distance to kilometers
      time: `${Math.floor(timer / 3600)}h ${Math.floor((timer % 3600) / 60)}m ${timer % 60}s`,
      goal: `${goal} ${goalUnit}`,
      goalAchieved: goalAchieved,
      date: new Date().toLocaleString() // using locale string for date formatting
    };

    try {
      const response = await axios.post('http://localhost:8080/customer/appendRecords', null, {
        params: {
          customerid: customerId,
          date: new Date().toLocaleDateString(), // current date in dd-MM-yyyy format
          record: JSON.stringify(activity)
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Activity saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  };

  return (
    <div>
      {location && (
        <MapContainer center={[location.lat, location.lng]} zoom={15} style={{ height: '400px', width: '100%', position: 'relative' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {path.length > 1 && (
            <Polyline
              positions={path.map(pos => [pos.lat, pos.lng])}
              pathOptions={{ color: 'red' }}
            />
          )}
          <Marker position={[location.lat, location.lng]} icon={customIcon} />
          <RecenterButton location={location} />
        </MapContainer>
      )}
      <div className={styles.infoContainer}>
        <button onClick={handleStart} disabled={startDisabled} style={{ marginRight: '10px' }}>Start</button>
        <button onClick={handleStop} disabled={stopDisabled}>Stop</button>
        {tracking && (
          <button onClick={handlePauseResume} style={{ marginLeft: '10px' }}>
            {paused ? 'Resume' : 'Pause'}
          </button>
        )}
        <button onClick={() => setShowModal(true)} style={{ marginLeft: '10px' }}>Set Activity</button>
      </div>
      <p>Distance covered: {(distance / 1000).toFixed(2)} km</p>
      <p>Time elapsed: {Math.floor(timer / 3600)}h {Math.floor((timer % 3600) / 60)}m {timer % 60}s</p>
      {goal && <p>Goal: {goal} {goalUnit}</p>}
      {goalAchieved && (
        <div className={styles.successMessage}>
          <p>Goal achieved!</p>
        </div>
      )}
      {showModal && <SetActivity onClose={() => setShowModal(false)} onSave={handleSetActivity} />}
    </div>
  );
}

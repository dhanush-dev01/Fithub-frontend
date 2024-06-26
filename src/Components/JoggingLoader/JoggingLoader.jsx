import React from 'react';
import jogging from '../../assets/Images/joggingVector.png';
import './Styles/JoggingAnimation.css';

const JoggingAnimation = () => {
  return (
    <div className="jogging-animation-container">
      <svg
        className="jogging-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <image href={jogging} className="jogging-image" />

        <circle
          className="loading-circle"
        >
          <animate
            attributeName="stroke-dashoffset"
            dur="1s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="502;0"
          />
        </circle>
      </svg>
    </div>
  );
};

export default JoggingAnimation;

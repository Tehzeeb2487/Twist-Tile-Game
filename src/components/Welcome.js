import React from "react";
import { useNavigate } from "react-router-dom"; 
import './css/Welcome.css';
import Logo from '../Logo.png'

const Welcome = () => {
  const navigator = useNavigate();

    return (
      <div className="head-content">
        <h1 className="title"> 
          Twist Tiles
          <img src={Logo} className="Logoimg"/>
        </h1>
        <p className="sub-title">
            Twist the tiles and reveal the picture!
        </p>
        <button 
          className="welcome-btn"
          onClick={() => navigator("/LevelSelection")}
        >
          Start Game
        </button>
      </div>
    );
  }

  export default Welcome;
  
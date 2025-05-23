import React, { useState, useEffect } from "react";
import { BsCaretLeftFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; 
import './css/LevelSelection.css';
import { FaLock, FaUnlock } from "react-icons/fa";

const LevelSelection = () => {
  const navigate = useNavigate();
  const [levelStatus, setLevelStatus] = useState({
    level1: false,
    level2: false,
    level3: false,
    level4: false,
    level5: false,
  });

  useEffect(() => {
    setLevelStatus({
      level1: sessionStorage.getItem('level1Completed') === 'true',
      level2: sessionStorage.getItem('level2Completed') === 'true',
      level3: sessionStorage.getItem('level3Completed') === 'true',
      level4: sessionStorage.getItem('level4Completed') === 'true',
      level5: sessionStorage.getItem('level5Completed') === 'true',
    });
  }, []);

  return (
    <div className="head-content">
      <button className="back-button" onClick={() => navigate("/")}>
        <BsCaretLeftFill />    
      </button> 
      <center>
        <h2 className="title-section">
          Select Level
        </h2>
      </center>
      <div className="level-buttons">
        <button className="welcome-btn" onClick={() => navigate("/LevelOne")}>
          <FaUnlock style={{paddingBottom: '5px', paddingRight: '5px' , fontSize: '22px'}}/>
          Level 1
        </button>
        <button 
          className={levelStatus.level1 ? "welcome-btn" : "unlock"} 
          onClick={() => levelStatus.level1 && navigate("/LevelTwo")}
          disabled={!levelStatus.level1}
        >
          {levelStatus.level1 ? 
            <FaUnlock style={{paddingBottom: '5px', paddingRight: '5px' , fontSize: '22px'}}/> :
            <FaLock style={{paddingBottom: '5px' ,paddingRight: '5px' , fontSize: '22px'}}/>
          }
          Level 2
        </button>
        <button 
          className={levelStatus.level2 ? "welcome-btn" : "unlock"} 
          onClick={() => levelStatus.level2 && navigate("/LevelThree")}
          disabled={!levelStatus.level2}
        >
          {levelStatus.level2 ? 
            <FaUnlock style={{paddingBottom: '5px', paddingRight: '5px' , fontSize: '22px'}}/> :
            <FaLock style={{paddingBottom: '5px' ,paddingRight: '5px' , fontSize: '22px'}}/>
          }
          Level 3
        </button>
        <button 
          className={levelStatus.level3 ? "welcome-btn" : "unlock"} 
          onClick={() => levelStatus.level3 && navigate("/LevelFour")}
          disabled={!levelStatus.level3}
        >
          {levelStatus.level3 ? 
            <FaUnlock style={{paddingBottom: '5px', paddingRight: '5px' , fontSize: '22px'}}/> :
            <FaLock style={{paddingBottom: '5px' ,paddingRight: '5px' , fontSize: '22px'}}/>
          }
          Level 4
        </button>
        <button 
          className={levelStatus.level4 ? "welcome-btn" : "unlock"} 
          onClick={() => levelStatus.level4 && navigate("/LevelFive")}
          disabled={!levelStatus.level4}
        >
          {levelStatus.level4 ? 
            <FaUnlock style={{paddingBottom: '5px', paddingRight: '5px' , fontSize: '22px'}}/> :
            <FaLock style={{paddingBottom: '5px' ,paddingRight: '5px' , fontSize: '22px'}}/>
          }
          Level 5
        </button>
        
      </div>           
    </div>
  );
};

export default LevelSelection;

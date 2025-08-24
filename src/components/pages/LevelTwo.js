import React, { useState, useEffect, useRef } from "react";
import { BsFillHouseFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css"; 
import CommonModals from "../CommonModals";

const imageSrc = "./two.png";
const gridSize = 3;
const tileCount = gridSize * gridSize;
const initialRotationAngles = Array(tileCount).fill(0).map(() => [0, 90, 180, 270][Math.floor(Math.random() * 4)]);


const LevelTwo = () => {
    const [gameCompleted, setGameCompleted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [timer, setTimer] = useState(40);
    const [joinedImage, setJoinedImage] = useState(false);
    const [rotationAngles, setRotationAngles] = useState([...initialRotationAngles]);
    const initialAnglesRef = useRef([]);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [shakeModal, setShakeModal] = useState(false);
    const [isPaused, setIsPaused] = useState(false); 
    const [tileSize, setTileSize] = useState(
        window.innerWidth <= 450 ? 70 : 100
    );
    
    useEffect (() => {
        const handleResize = () => {
            setTileSize(window.innerWidth <= 450 ? 70 : 100);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
       initialAnglesRef.current = [...initialRotationAngles];
    }, []);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleTileClick = (index) => {
        const newRotationAngles = [...rotationAngles];
        newRotationAngles[index] = newRotationAngles[index] + 90;
        setRotationAngles(newRotationAngles);

        const isPuzzleSolved = newRotationAngles.every(angle => (angle % 360) === 0);

        if (isPuzzleSolved) {
            setGameCompleted(true);
            sessionStorage.setItem('level2Completed', 'true');
            setTimeout(() => {
                setShowCongratulations(true);
              }, 600);
            setJoinedImage(true);
        }
    }

    useEffect(() => {
        if (gameCompleted || gameOver || isPaused) return;

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev === 1) {
                    clearInterval(interval);
                    setGameOver(true);
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [gameCompleted, gameOver, isPaused]);

    const restartLevel = () => {
        const newInitials = Array(tileCount).fill(0).map(() => [0, 90, 180, 270][Math.floor(Math.random() * 4)]);

        setRotationAngles([...newInitials]);
        initialAnglesRef.current = [...newInitials];
        setTimer(40);
        setGameOver(false);
        setGameCompleted(false);
        setJoinedImage(false);
    };

    const handleBackdropClick = () => {
        setShakeModal(false);
        setTimeout(() => {
            setShakeModal(true);
        }, 10);
    }

    return (
        <>

        <CommonModals 
            showCongratulations={showCongratulations}
            setShowCongratulations={setShowCongratulations}
            showGameOver={gameOver}
            setGameOver={setGameOver}
            showOptions={showModal}
            handleCloseOptions={handleClose}
            restartLevel={restartLevel}
            handleBackdropClick={handleBackdropClick}
            shakeModal={shakeModal}
            setShakeModal={setShakeModal}
            setIsPaused={setIsPaused}
            currentLevel={2}
        />

        <div className="level-head">
            <div className="nav-section">
                <button className="go-to-home" onClick={handleShow}>
                    <BsFillHouseFill />
                </button>
                <h1 className="level-heading">Level 2</h1>
                <div className="timer">
                    ⏳ Time Left: {timer} sec
                </div>
            </div>
            <div className="level-one-container">
                <div 
                    className="grid" 
                    style={{
                        display: "grid", 
                        gridTemplateColumns: `repeat(${gridSize}, ${tileSize}px)`, 
                        gap: joinedImage ? "0px" : "10px",
                    }}
                >
                    {Array.from({ length: tileCount }).map((_, index) => (
                        <div
                            key={index}
                            className="tile"
                            onClick={() => handleTileClick(index)}
                            style={{
                                width: `${tileSize}px`,
                                height: `${tileSize}px`,
                                border: joinedImage ? "none" : "2px solid #333",
                                cursor: "pointer",
                                transform: `rotate(${joinedImage ? 0 : rotationAngles[index]}deg)`,
                                backgroundImage: `url(${imageSrc})`,
                                backgroundSize: `${gridSize * tileSize}px ${gridSize * tileSize}px`,
                                backgroundPosition: `${-(index % gridSize) * tileSize}px ${-Math.floor(index / gridSize) * tileSize}px`,
                            }} 
                        />
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default LevelTwo;
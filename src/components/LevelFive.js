import React, { useState, useEffect, useRef } from "react";
import { BsFillHouseFill } from "react-icons/bs";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { useNavigate } from "react-router-dom";

const imageSrc = "./five.png";
const gridCols = 4;
const gridRows = 3;
const tileCount = gridCols * gridRows;
const tileSize = 100;
const initialRotationAngles = Array(tileCount).fill(0).map(() => [0, 90, 180, 270][Math.floor(Math.random() * 4)]);

const LevelFive = () => {
    
    const [gameCompleted, setGameCompleted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [timer, setTimer] = useState(60);
    const [joinedImage, setJoinedImage] = useState(false);
    const [rotationAngles, setRotationAngles] = useState([...initialRotationAngles]);
    const initialAnglesRef = useRef([]);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

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
            sessionStorage.setItem('level1Completed', 'true');
            setTimeout(() => {
                setShowCongratulations(true);
              }, 600);
            setJoinedImage(true);
        }
    }

    useEffect(() => {
        if (gameCompleted || gameOver) return;

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
    }, [gameCompleted, gameOver]);

    const restartLevel = () => {
        const newInitials = Array(tileCount).fill(0).map(() => [0, 90, 180, 270][Math.floor(Math.random() * 4)]);

        setRotationAngles([...newInitials]);
        initialAnglesRef.current = [...newInitials];
        setTimer(60);
        setGameOver(false);
        setGameCompleted(false);
        setJoinedImage(false);
    };

    return (
        <>

        <Modal show={showCongratulations} onHide={() => setShowCongratulations(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>🎉 Congratulations!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You completed the puzzle!</p>
                <Button variant="primary" onClick={() => navigate("/LevelSelection")}>🏠 Home</Button>{' '}
                <Button variant="success" onClick={() => navigate("/LevelSix")}>➡️ Next Level</Button>
            </Modal.Body>
        </Modal>

        <Modal show={gameOver} onHide={() => setGameOver(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>💀 Game Over!</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: "center" }}>
                <Button variant="success" onClick={restartLevel} style={{ margin: "10px" }}>
                    🔁 Restart
                </Button>
                <Button variant="secondary" onClick={() => navigate("/LevelSelection")} style={{ margin: "10px" }}>
                    🏠 Home
                </Button>
            </Modal.Body>
        </Modal>

        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>🔔 Options</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button variant="primary" onClick={() => navigate("/LevelSelection")} style={{ margin: "5px" }}>
                    🏠 Home
                </Button>
                <Button variant="success" onClick={() => {restartLevel(); handleClose();}} style={{ margin: "10px" }}>
                    🔁 Restart
                </Button>
            </Modal.Body>
        </Modal>

        <div className="level-head">
            <div className="nav-section">
                <button className="go-to-home" onClick={handleShow}>
                    <BsFillHouseFill />
                </button>
                <h1 className="level-heading">Level 5</h1>
                <div className="timer">
                    ⏳ Time Left: {timer} sec
                </div>
            </div>
            <div className="level-one-container">
                <div 
                    className="grid" 
                    style={{
                        display: "grid", 
                        gridTemplateColumns: `repeat(${gridCols}, ${tileSize}px)`, 
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
                                backgroundSize: `${gridCols * tileSize}px ${gridRows * tileSize}px`,
                                backgroundPosition: `${-(index % gridCols) * tileSize}px ${-Math.floor(index / gridCols) * tileSize}px`,
                            }} 
                        />
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default LevelFive;
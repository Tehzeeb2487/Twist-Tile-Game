import React from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { useNavigate } from "react-router-dom";
 
const CommonModals = ({
    showCongratulations,
    setShowCongratulations,
    showGameOver,
    setGameOver,
    showOptions,
    restartLevel,
    handleBackdropClick,
    shakeModal,
    setShakeModal,
    handleCloseOptions,
    setIsPaused,
    currentLevel
}) => {
    const navigate = useNavigate();

    return (
        <>
        <Modal 
            show={showCongratulations} 
            onHide={() => {
                setShakeModal(true);
                setTimeout(() => setShakeModal(false), 500)
            }} 
            centered
            onClick = {(e) => {
                if (e.target === e.currentTarget) {
                    handleBackdropClick();
                }
            }}
            dialogClassName={shakeModal ? "shake-modal" : ""}
        >
            <Modal.Header>
                <Modal.Title>🎉 Congratulations!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You completed the puzzle!</p>
                <Button variant="primary" onClick={() => navigate("/LevelSelection")}>🏠 Home</Button>{' '}
                <Button variant="success" onClick={() => navigate(`/Level${currentLevel + 1}`)} disabled={currentLevel === 5}>➡️ Next Level</Button>
            </Modal.Body>
        </Modal>
        <Modal 
            show={showGameOver} 
            onHide={() => {
                setShakeModal(true);
                setTimeout(() => setShakeModal(false), 500);
            }} 
            centered
            onClick = {(e) => {
                if (e.target === e.currentTarget) {
                    handleBackdropClick();
                }
            }}
            dialogClassName={shakeModal ? "shake-modal" : ""}
        >
            <Modal.Header>
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
        <Modal 
            show={showOptions} 
            onShow={() => setIsPaused(true)}
            onExit={() => setIsPaused(false)}
            onHide={() => {
                setShakeModal(true);
                setTimeout(() => setShakeModal(false), 500);
            }}
            centered
            onClick = {(e) => {
                if (e.target === e.currentTarget) {
                    handleBackdropClick();
                }
            }} 
            dialogClassName={shakeModal ? "shake-modal" : ""}
        >
            <Modal.Header closeButton onClick={() => handleCloseOptions()}>
                <Modal.Title>🔔 Options</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button variant="primary" onClick={() => navigate("/LevelSelection")} style={{ margin: "5px" }}>
                    🏠 Home
                </Button>
                <Button variant="success" onClick={() => {restartLevel(); handleCloseOptions();}} style={{ margin: "10px" }}>
                    🔁 Restart
                </Button>
                </Modal.Body>
            </Modal>
        </>
    )
    
}

export default CommonModals;
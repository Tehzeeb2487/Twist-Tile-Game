import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import LevelSelection from "./components/LevelSelection";
import LevelOne from "./components/pages/LevelOne";
import LevelTwo from "./components/pages/LevelTwo";
import './components/css/LevelSelection.css';
import './components/css/LevelOne.css';
import './components/css/Welcome.css';
import LevelThree from "./components/pages/LevelThree";
import LevelFour from "./components/pages/LevelFour";
import LevelFive from "./components/pages/LevelFive";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/LevelSelection" element={<LevelSelection />} />
        <Route path="/Level1" element={<LevelOne />} />
        <Route path="/Level2" element={<LevelTwo />} />
        <Route path="/Level3" element={<LevelThree />} />
        <Route path="/Level4" element={<LevelFour />} />
        <Route path="/Level5" element={<LevelFive />} />
      </Routes>
    </Router>
  );
}

export default App;

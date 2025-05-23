import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import LevelSelection from "./components/LevelSelection";
import LevelOne from "./components/LevelOne";
import LevelTwo from "./components/LevelTwo";
import './components/css/LevelSelection.css';
import './components/css/LevelOne.css';
import './components/css/Welcome.css';
import LevelThree from "./components/LevelThree";
import LevelFour from "./components/LevelFour";
import LevelFive from "./components/LevelFive";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/LevelSelection" element={<LevelSelection />} />
        <Route path="/LevelOne" element={<LevelOne />} />
        <Route path="/LevelTwo" element={<LevelTwo />} />
        <Route path="/LevelThree" element={<LevelThree />} />
        <Route path="/LevelFour" element={<LevelFour />} />
        <Route path="/LevelFive" element={<LevelFive />} />
      </Routes>
    </Router>
  );
}

export default App;

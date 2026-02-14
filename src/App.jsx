import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Technology from './pages/Technology';
import './index.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/technology" element={<Technology />} />
            </Routes>
        </Router>
    );
}

export default App;

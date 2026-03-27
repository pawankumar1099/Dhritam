import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Technology from './pages/Technology';
import AssessmentWindow from './components/AssessmentWindow';
import './index.css';

function App() {
    const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
    const [onboardingOpen, setOnboardingOpen] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home 
                    onOpenAssessment={() => setIsAssessmentOpen(true)} 
                    onboardingOpen={onboardingOpen}
                    setOnboardingOpen={setOnboardingOpen}
                />} />
                <Route path="/technology" element={<Technology 
                    onOpenAssessment={() => setIsAssessmentOpen(true)} 
                    onboardingOpen={onboardingOpen}
                    setOnboardingOpen={setOnboardingOpen}
                />} />
            </Routes>
            <AssessmentWindow 
                isOpen={isAssessmentOpen} 
                onClose={() => setIsAssessmentOpen(false)} 
                onOpenOnboarding={() => setOnboardingOpen(true)}
            />
        </Router>
    );
}

export default App;

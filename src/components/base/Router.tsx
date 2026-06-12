import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Landing } from '../pages/landing';
import { Resume } from '../pages/resume';
import { Projects } from '../pages/projects';
import { Aboutme } from '../pages/aboutme';
import { Visualizer } from '../pages/gallery';

export const Router: React.FC = () => {
    const location = useLocation();
    return (
        <div className="App">
                <Routes location={location}>
                    <Route path="" element={<Landing />} />
                    <Route path="/Resume" element={<Resume />} />
                    <Route path="/Projects" element={<Projects />} />
                    <Route path="/AboutMe" element={<Aboutme />} />
                    <Route path="/Gallery" element={<Visualizer />} />
                </Routes>
        </div>
    );
};
  

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Home from './pages/Home';
import CatPage from './pages/Catpage';
import DogPage from './pages/DogPage';
import FishPage from './pages/FishPage';
import NotFound from './components/NotFound';
import injectContext from './store/appContext';
import './App.css';


function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/gatos" element={<CatPage />} />
                    <Route path="/perros" element={<DogPage />} />
                    <Route path="/peces" element={<FishPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default injectContext(App);



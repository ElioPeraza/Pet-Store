import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/gatos">Gatos</Link></li>
                <li><Link to="/perros">Perros</Link></li>
                <li><Link to="/peces">Peces</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;

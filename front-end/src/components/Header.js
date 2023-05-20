import React, { useState, useEffect } from 'react';
import './style/Header.css';
import logo from '../../src/img/logo.png';
import { Link, Navigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsPower, BsSun } from 'react-icons/bs';
import { getUserRole, logout, isLoggedIn } from '../_services/account.services';

function Header() {
    const [themeMode, setThemeMode] = useState('dark');
    const [menuTextColor, setMenuTextColor] = useState(themeMode === 'dark' ? 'white' : 'black');

    const toggleThemeMode = () => {
        const newThemeMode = themeMode === 'dark' ? 'light' : 'dark';
        setThemeMode(newThemeMode);
        setMenuTextColor(newThemeMode === 'dark' ? 'white' : 'black');
    };

    const handleLogout = () => {
        // Handle logout logic here
        logout();
        // Redirect to login page
        window.location.href = '/';
    };

    useEffect(() => {
        document.body.classList.toggle('light-mode', themeMode === 'light');
    }, [themeMode]);

    if (!isLoggedIn()) {
        // Redirect to login page
        return <Navigate to="/" replace />;
    }

    return (
        <Navbar bg={themeMode === 'dark' ? 'black' : 'light'} expand="lg">
            <Container fluid>
                <Link to="/Home">
                    <img src={logo} className="logo" alt="not found" />
                </Link>    <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link>
                            <Link to="/Home" id="h" style={{ color: menuTextColor }}>
                                Home
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/DC_VISUALISATION" id="h" style={{ color: menuTextColor }}>
                                DCvisualization
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/Reporting" id="h" style={{ color: menuTextColor }}>
                                Reporting
                            </Link>
                        </Nav.Link>
                        {getUserRole() === 'Admin' && (
                            <Nav.Link>
                                <Link to="/AccountsManagement" id="h" style={{ color: menuTextColor }}>
                                    Users management
                                </Link>
                            </Nav.Link>
                        )}
                    </Nav>

                    <Button variant="outline-light" onClick={toggleThemeMode}>
                        <BsSun />
                    </Button>
                    <Button variant="outline-light" onClick={handleLogout}>
                        Logout <BsPower />
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;

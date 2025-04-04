import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const token = localStorage.getItem("token");
    const Navigate = useNavigate(); // Import useNavigate from react-router-dom

    // State to store the navbar background color
    const [navbarBg, setNavbarBg] = useState(token ? "primary" : "light");

    useEffect(() => {
        // Update the navbar background color based on the token
        setNavbarBg(token ? "primary" : "primary");
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token from local storage
        setNavbarBg("primary"); // Keep the background color as "primary" after logout
        Navigate("/login"); // Redirect to login page after logout
    };

    return (
        <div className="main-container">
            {/* Top Horizontal Navbar */}
            <Navbar bg={navbarBg} variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        {token ? "Welcome Back!" : "Welcome to Our App"}
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        {token && (
                            <>
                                <Nav.Link as={Link} to="/dashboard" className="nav-link">Dashboard</Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Nav className="ms-auto">
                        {token ? (
                            <>
                                <Nav.Link className="nav-link" onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register" className="nav-link">Signup</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>

            {/* Left Vertical Navbar */}
            {token && (
                <div className="vertical-navbar">
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/profile" className="nav-link">Profile</Nav.Link>
                        <Nav.Link as={Link} to="/donorManagement" className="nav-link">Donor Management</Nav.Link>
                        <Nav.Link as={Link} to="/childManagement" className="nav-link">Child Management</Nav.Link>
                        <Nav.Link as={Link} to="/elderManagement" className="nav-link">Elder Management</Nav.Link>
                        <Nav.Link as={Link} to="/donations" className="nav-link">Donations</Nav.Link>
                        <Nav.Link as={Link} to="/sponserships" className="nav-link">Sponsorships</Nav.Link>
                        <Nav.Link as={Link} to="/comunications" className="nav-link">Communications</Nav.Link>
                        <Nav.Link as={Link} to="/aboutUs" className="nav-link">About Us</Nav.Link>
                    </Nav>
                </div>
            )}
        </div>
    );
};

export default Header;
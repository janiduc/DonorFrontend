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
        <>
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
        </>
    );
};

export default Header;
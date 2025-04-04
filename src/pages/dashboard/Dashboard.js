import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { Container, Table, Row, Col } from "react-bootstrap";

const Dashboard = () => {
    const token = localStorage.getItem("token");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); // Correctly import and use useNavigate

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users", {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                });
                const result = await response.json();
                setUsers(result);
                console.log(result);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        if (token) {
            fetchUsers();
        } else {
            navigate("/login"); // Redirect to login page if token is not present
        }
    }, [token, navigate]); // Add token and navigate to the dependency array

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1 className="text-center">Dashboard</h1>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
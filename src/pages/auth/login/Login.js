import React, { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Form, Button } from "react-bootstrap";
import "./Login.css"; // Import CSS file for styling

const Login = () => {
    console.log("Login page loaded");

    const navigate = useNavigate(); // Import useNavigate from react-router-dom
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // // Individual handlers for each field
    // const handleEmailChange = (e) => {
    //     setFormData((prevState) => ({
    //         ...prevState,
    //         email: e.target.value
    //     }));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("email: ", formData.email);
        // console.log("password: ", formData.password);
        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const result = await response.json();
            localStorage.setItem("token", result.token); // Store the token in local storage
            console.log("Token: ", result.token); // Log the token for debugging
            console.log(result);
            //navigate("/dashboard"); // Redirect to login page after successful registration
            if (result.status === "success") {
                alert("Login successful!");
                navigate("/dashboard"); // Redirect to dashboard page after successful login
            }
            else if (result.status === "error") {
                alert("Login failed. Please try again.");
            }
            else {
                alert("Login failed. Please try again.");
            }
        }
        catch (error) {
            console.error(error.message);
        }
        finally{
            setFormData({
                email: "",
                password: ""
            });
        }
    };

    return (
        <div className="center-form">
            <Form onSubmit={handleSubmit} className="Form">
                <h1>LogIN</h1>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleInputChange}
                        //onChange={handleEmailChange}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100">
                    Submit
                </Button>
            </Form>
        </div>
    );
    }
    export default Login;
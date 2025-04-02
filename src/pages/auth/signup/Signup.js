import React, { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Form, Button } from "react-bootstrap";
import "./Signup.css";

const Signup = () => {
    const navigate = useNavigate(); // Import useNavigate from react-router-dom
    const [formData, setFormData] = useState({
        email: "",
        name: "",
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
        // console.log("name: ", formData.name);
        // console.log("password: ", formData.password);
        try {
            const response = await fetch("http://localhost:5000/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const result = await response.json();
            console.log(result);
            //navigate("/login"); // Redirect to login page after successful registration
            if (result.status === "success") {
                alert("Registration successful!");
                navigate("/login");
            }
            else if (result.status === "error") {
                alert("Registration failed. Please try again.");
            }
            else {
                alert("Registration failed. Please try again.");
            }
        }
        catch (error) {
            console.error(error.message);
        }
        finally{
            setFormData({
                email: "",
                name: "",
                password: ""
            });
        }
    };

    return (
        <div className="center-form">
            <Form onSubmit={handleSubmit} className="Form">
                <h1>SignUp</h1>
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

                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
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
};

export default Signup;
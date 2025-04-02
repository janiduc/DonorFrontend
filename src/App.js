import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Header from "./pages/header/Header";
import {Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  console.log("App loaded");
  
  return (
    <>
    <Header></Header>
    <Routes>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Signup></Signup>}></Route>
      <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
    </Routes>
    </>
  );
}

export default App;

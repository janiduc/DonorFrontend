import React, { useState } from "react";
import axios from "axios";
import "./ChildManagement.css";

const ChildManagement = () => {
  const [children, setChildren] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    name: "",
    guardienName: "",
    contactNumber: "",
  });

  const handleInputChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const fetchChildByCriteria = async () => {
    try {
      const token = localStorage.getItem("token");
      const { name, guardienName, contactNumber } = searchCriteria;

      // Build the query string dynamically
      const query = new URLSearchParams();
      if (name) query.append("name", name);
      if (guardienName) query.append("guardienName", guardienName);
      if (contactNumber) query.append("contactNumber", contactNumber);

      const response = await axios.get(`http://localhost:5000/api/children/search?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.length === 0) {
        alert("No child found with the given criteria.");
      } else {
        const child = response.data[0]; // Display the first match in the popup
        alert(`Child Details:
Name: ${child.name}
Age: ${child.age}
Address: ${child.address}
Guardian Name: ${child.guardienName}
Contact Number: ${child.contactNumber}`);
      }
    } catch (error) {
      alert("Error fetching child: " + error.message);
    }
  };

  const fetchAllChildren = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/children", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.data.length === 0) {
        alert("No children found.");
      } else {
        setChildren(response.data); // Update the state with the fetched children
      }
    } catch (error) {
      alert("Error fetching children: " + error.message);
    }
  };

  return (
    <div className="child-management-container">
      <h2>Child Management</h2>
      <div className="actions">
        <button onClick={() => (window.location.href = "/childManagement/add")}>Add Child</button>
        <button onClick={() => (window.location.href = "/childManagement/update")}>Update Child</button>
        <button onClick={() => (window.location.href = "/childManagement/delete")}>Delete Child</button>
        <button onClick={() => fetchAllChildren()}>Get All Children</button>
      </div>
      <div className="search">
        <h3>Search Child</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter Child Name"
          value={searchCriteria.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="guardienName"
          placeholder="Enter Guardian Name"
          value={searchCriteria.guardienName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Enter Contact Number"
          value={searchCriteria.contactNumber}
          onChange={handleInputChange}
        />
        <button onClick={fetchChildByCriteria}>Search Child</button>
      </div>
      <div className="children-grid">
        {children.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Guardian Name</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {children.map((child) => (
                <tr key={child._id}>
                  <td>{child.name}</td>
                  <td>{child.age}</td>
                  <td>{child.address}</td>
                  <td>{child.guardienName}</td>
                  <td>{child.contactNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ChildManagement;
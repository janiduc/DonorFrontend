import React, { useState } from "react";
import axios from "axios";
import "./ChildManagement.css";

const ChildManagement = () => {
  const [children, setChildren] = useState([]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newChild, setNewChild] = useState({
    childID: "",
    name: "",
    birthDate: "",
    address: "",
    age: "",
    guardienName: "",
    contactNumber: "",
  });

  const [searchCriteria, setSearchCriteria] = useState({
    name: "",
    guardienName: "",
    contactNumber: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);

  const handleInputChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleAddInputChange = (e) => {
    setNewChild({ ...newChild, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setNewChild({
      childID: "",
      name: "",
      birthDate: "",
      address: "",
      age: "",
      guardienName: "",
      contactNumber: "",
    });
    setIsAddModalOpen(false);
  };

  const addChild = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/children",
        newChild,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Child added successfully!");
      closeAddModal();
      fetchAllChildren(); // Refresh the list
    } catch (error) {
      alert("Error adding child: " + error.message);
    }
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
                  ChildID: ${child.childID}
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
        setChildren(response.data);
      }
    } catch (error) {
      alert("Error fetching children: " + error.message);
    }
  };

  const openUpdateModal = (child) => {
    console.log("Selected child:", child); // Debugging
    setSelectedChild(child);
    setIsModalOpen(true);
    console.log("Modal open state:", isModalOpen); // Debugging
  };

  const closeUpdateModal = () => {
    setSelectedChild(null);
    setIsModalOpen(false);
  };

  const handleUpdateChange = (e) => {
    setSelectedChild({ ...selectedChild, [e.target.name]: e.target.value });
  };

  const updateChildDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/children/${selectedChild._id}`,
        selectedChild,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Child updated successfully!");
      closeUpdateModal();
      fetchAllChildren(); // Refresh the list
    } catch (error) {
      alert("Error updating child: " + error.message);
    }
  };

  const deleteChild = async (childId) => {
    if (window.confirm("Are you sure you want to delete this child?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/children/${childId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Child deleted successfully!");
        fetchAllChildren(); // Refresh the list
      } catch (error) {
        alert("Error deleting child: " + error.message);
      }
    }
  };

  return (
    <div className="child-management-container">
      <h2>Child Management</h2>
      <div className="actions">
        <button onClick={openAddModal}>Add Child</button>
        <button onClick={fetchAllChildren}>Get All Children</button>
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
                <th>ChildID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Guardian Name</th>
                <th>Contact Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {children.map((child) => (
                <tr key={child._id}>
                  <td>{child.childID}</td>
                  <td>{child.name}</td>
                  <td>{child.age}</td>
                  <td>{child.address}</td>
                  <td>{child.guardienName}</td>
                  <td>{child.contactNumber}</td>
                  <td>
                    <button onClick={() => openUpdateModal(child)}>Update</button>
                    <button onClick={() => deleteChild(child._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Child</h3>
            <input
              type="text"
              name="childID"
              placeholder="Child ID"
              value={newChild.childID}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newChild.name}
              onChange={handleAddInputChange}
            />
            <input
              type="date"
              name="birthDate"
              placeholder="Birth Date"
              value={newChild.birthDate}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={newChild.address}
              onChange={handleAddInputChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={newChild.age}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="guardienName"
              placeholder="Guardian Name"
              value={newChild.guardienName}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={newChild.contactNumber}
              onChange={handleAddInputChange}
            />
            <div className="modal-actions">
              <button onClick={addChild}>Send</button>
              <button onClick={closeAddModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update Child Details</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={selectedChild.name}
              onChange={handleUpdateChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={selectedChild.age}
              onChange={handleUpdateChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={selectedChild.address}
              onChange={handleUpdateChange}
            />
            <input
              type="text"
              name="guardienName"
              placeholder="Guardian Name"
              value={selectedChild.guardienName}
              onChange={handleUpdateChange}
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={selectedChild.contactNumber}
              onChange={handleUpdateChange}
            />
            <div className="modal-actions">
              <button onClick={updateChildDetails}>Save</button>
              <button onClick={closeUpdateModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildManagement;
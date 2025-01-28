import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../../components/UserForm";
import "./index.css";
//function to addedit the user
const AddEditUser = ({ users, setUsers }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    id: "",
  });

  useEffect(() => {
    if (id) {
      // Editing an existing user
      const user = users.find((user) => user.id === parseInt(id, 10));
      if (user) {
        const [firstName, ...lastNameParts] = (user.name || "").split(" ");
        setInitialData({
          firstName: firstName || "",
          lastName: lastNameParts.join(" ") || "",
          email: user.email || "",
          department: user.department || "",
          id: user.id,
        });
      }
    } else {
      // Adding a new user
      setInitialData({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        id: Math.max(...users.map((user) => user.id), 0) + 1, // Generate unique ID
      });
    }
  }, [id, users]);
//submitting the details after form filling
  const handleSubmit = (userData) => {
    try {
      const updatedUser = {
        ...userData,
        name: `${userData.firstName} ${userData.lastName}`,
      };

      if (id) {
        // Editing user
        const updatedUsers = users.map((user) =>
          user.id === parseInt(id, 10) ? { ...user, ...updatedUser } : user
        );
        setUsers(updatedUsers);
        alert("User updated successfully!");
      } else {
        // Adding a new user
        const newUserId = Math.max(...users.map((user) => user.id), 0) + 1;
        const newUser = { ...updatedUser, id: newUserId };

        setUsers((prevUsers) => {
          if (Array.isArray(prevUsers)) {
            return [...prevUsers, newUser]; // Add the new user to the array
          }
          console.error("setUsers: Previous state is not an array:", prevUsers);
          return [newUser]; // Fallback for invalid state
        });

        alert("User added successfully!");
      }

      navigate("/"); // Navigate to the user list page
    } catch (error) {
      console.error("Error during Add/Edit:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <h2 className="header">{id ? "Edit User" : "Add User"}</h2>
      <UserForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddEditUser;

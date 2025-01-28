import React, { useState, useEffect } from "react";
import "./index.css"; // Import the stylesheet for UserForm

// Define the UserForm component, which accepts initialData (default form values) and onSubmit (submit handler)
const UserForm = ({ initialData, onSubmit }) => {
  // Initialize the form data state with the initial data received from the parent component
  const [formData, setFormData] = useState(initialData);

  // Use the useEffect hook to update the form data whenever the initialData changes
  useEffect(() => {
    setFormData(initialData); // Update the form data when the initialData prop changes
  }, [initialData]);

  // Handle form input changes and update the corresponding field in formData
  const handleChange = (e) => {
    const { name, value } = e.target; // Get the name and value from the input field
    setFormData({ ...formData, [name]: value }); // Update the formData with the new value
  };

  // Handle form submission, prevent the default form behavior, and call the onSubmit function with the current form data
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit behavior (page reload)
    onSubmit(formData); // Call the onSubmit function passed from the parent with the form data
  };

  return (
    // Render the form, binding the submit handler and applying the user-form CSS class
    <form onSubmit={handleSubmit} className="user-form">
      <div>
        <label className="form-label">ID: {formData.id}</label>
        {/* Display the user ID from the form data */}
      </div>

      {/* First Name input field */}
      <input
        type="text"
        name="firstName"
        value={formData.firstName || ""} // Set the value to the formData or empty string if undefined
        onChange={handleChange} // Call handleChange when the input value changes
        placeholder="First Name"
        className="form-input" // Apply styling from the CSS class
      />

      {/* Last Name input field */}
      <input
        type="text"
        name="lastName"
        value={formData.lastName || ""} // Set the value to the formData or empty string if undefined
        onChange={handleChange} // Call handleChange when the input value changes
        placeholder="Last Name"
        className="form-input"
      />

      {/* Email input field */}
      <input
        type="email"
        name="email"
        value={formData.email || ""} // Set the value to the formData or empty string if undefined
        onChange={handleChange} // Call handleChange when the input value changes
        placeholder="Email"
        className="form-input"
      />

      {/* Department input field */}
      <input
        type="text"
        name="department"
        value={formData.department || ""} // Set the value to the formData or empty string if undefined
        onChange={handleChange} // Call handleChange when the input value changes
        placeholder="Department"
        className="form-input"
      />

      {/* Submit button */}
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default UserForm;

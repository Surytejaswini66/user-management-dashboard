import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

// Define the UserList component, which receives users (list of users) and setUsers (function to update the user list) as props
const UserList = ({ users = [], setUsers }) => {
  // State to manage the current page of the paginated user list
  const [currentPage, setCurrentPage] = useState(1);

  // Number of users to display per page
  const usersPerPage = 5;

  // The navigate function from react-router-dom to navigate between different pages
  const navigate = useNavigate();

  // Calculate the users to be displayed on the current page by slicing the users array
  const currentUsers = Array.isArray(users)
    ? users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
    : [];

  // Function to handle the deletion of a user
  const handleDelete = (id) => {
    // Confirm with the user before deleting
    if (window.confirm("Are you sure you want to delete this user?")) {
      // Update the users list by filtering out the deleted user
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="user-list">
      {/* Heading for the user management section */}
      <h2>User Management</h2>

      {/* Button to navigate to the "Add User" page */}
      <button className="add-user-button" onClick={() => navigate("/add")}>
        Add User
      </button>

      {/* Display Users Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            // If users exist, display each user in a row
            currentUsers.map((user) => {
              const [firstName, ...lastNameParts] = (user.name || "").split(
                " "
              );
              const lastName = lastNameParts.join(" ");
              return (
                <tr key={user.id}>
                  {/* Display user details */}
                  <td>{user.id}</td>
                  <td>{firstName || "N/A"}</td>
                  <td>{lastName || "N/A"}</td>
                  <td>{user.email || "N/A"}</td>
                  <td>{user.department || "N/A"}</td>
                  <td>
                    {/* Edit button */}
                    <button onClick={() => navigate(`/edit/${user.id}`)}>
                      Edit
                    </button>
                    {/* Delete button */}
                    <button onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            // Display this message when there are no users to display
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "10px" }}>
                No users found. Please add a new user.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        {/* Previous page button */}
        <button
          disabled={currentPage === 1} // Disable if it's the first page
          onClick={() => setCurrentPage(currentPage - 1)} // Decrease currentPage by 1
        >
          Previous
        </button>

        {/* Display current page and total number of pages */}
        <span>
          Page {currentPage} of {Math.ceil(users.length / usersPerPage) || 1}
        </span>

        {/* Next page button */}
        <button
          disabled={currentPage === Math.ceil(users.length / usersPerPage)} // Disable if it's the last page
          onClick={() => setCurrentPage(currentPage + 1)} // Increase currentPage by 1
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;

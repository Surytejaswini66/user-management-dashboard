import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = () => axios.get(API_BASE_URL);

export const addUser = async (user) => {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        department: user.department || "N/A",
      }
    );

    console.log("User added successfully:", response.data); // Simulating a success response
    return response.data; // Return the added user data
  } catch (error) {
    console.error("Error during adding user:", error);
    throw error; // Ensure the error is propagated for proper handling
  }
};

export const editUser = async (id, user) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, {
      name: user.name, // Use the full name
      email: user.email || "N/A",
      department: user.department || "N/A",
    });

    console.log("User updated successfully:", response.data);
    return response.data; // Return the updated user data
  } catch (error) {
    console.error("Error editing user:", error);
    throw error; // Handle errors
  }
};

export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/${id}`);

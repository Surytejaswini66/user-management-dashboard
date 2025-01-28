import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import AddEditUser from "./pages/AddEditUser";
import ErrorBoundary from "./components/ErrorBoundary";
import { fetchUsers } from "./api/api";
import "./App.css";

class App extends Component {
  state = {
    users: [], // Ensure an empty user list to start
  };

  componentDidMount() {
    // Fetch users from the mock API
    fetchUsers()
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  setUsers = (update) => {
    if (typeof update === "function") {
      this.setState((prevState) => {
        const updatedUsers = update(prevState.users);
        if (!Array.isArray(updatedUsers)) {
          console.error("setUsers expects an array, received:", updatedUsers);
          return null;
        }
        console.log("Updated Users List (Callback):", updatedUsers);
        return { users: updatedUsers };
      });
    } else if (Array.isArray(update)) {
      console.log("Updated Users List (Direct):", update);
      this.setState({ users: update });
    } else {
      console.error(
        "setUsers expects an array or a function, received:",
        update
      );
    }
  };

  render() {
    const { users } = this.state;
    return (
      <div>
        <ErrorBoundary>
          <Router>
            <Routes>
              <Route
                path="/"
                element={<UserList users={users} setUsers={this.setUsers} />}
              />
              <Route
                path="/add"
                element={<AddEditUser users={users} setUsers={this.setUsers} />}
              />
              <Route
                path="/edit/:id"
                element={<AddEditUser users={users} setUsers={this.setUsers} />}
              />
            </Routes>
          </Router>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;

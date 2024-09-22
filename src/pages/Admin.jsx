import React, { useState } from "react";
import AdminMenu from "./AdminMenu";
import "../Admin.css";
import { useAdminStore } from "../admin-store";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase Auth functions

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isAdmin, setAdmin } = useAdminStore();
  const auth = getAuth(); // Initialize Firebase Auth

  const handleLogin = async () => {
    try {
      // Use Firebase's signInWithEmailAndPassword method
      await signInWithEmailAndPassword(auth, "adminssc@gmail.com", password);
      console.log("Login successful");
      setAdmin(true);
      window.location.href = "/osoblje"; // Redirect to your admin page
    } catch (error) {
      console.error("Error during login:", error.message);
      // Handle errors such as "wrong password" or "user not found"
      alert("Invalid credentials");
    }
  };

  if (!isAdmin) {
    return (
      <>
        <p>Username:</p>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        />

        <p>Password:</p>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />

        <button id="login" onClick={handleLogin}>
          Prijava
        </button>
      </>
    );
  } else {
    return <AdminMenu />;
  }
};

export default Admin;

import React, { useState } from "react";
import AdminMenu from "./AdminMenu";
import "../Admin.css";
import { useAdminStore } from "../admin-store";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isAdmin, setAdmin } = useAdminStore();

  const handleLogin = () => {
    if (username === "admin" && password === "123") {
      console.log("Masala");
      setAdmin(true);
      window.location.href = "/osoblje";
    } else {
      console.log("Invalid credentials");
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

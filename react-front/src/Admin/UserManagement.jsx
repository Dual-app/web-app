import React from "react";
import AdminNav from "./../Components/AdminNav";

function UserManagement() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [users, setUsers] = React.useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    const user = { name, email };
    setUsers([...users, user]);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNav />
      <h2>User Management</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Add User</button>
      </form>
      <ul>
        {users.map((user, i) => (
          <li key={user.email || i}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;

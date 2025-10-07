import React from "react";


function AdminManagement() {
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
    <div>
      Hello world
    </div>
  );
}

export default AdminManagement;

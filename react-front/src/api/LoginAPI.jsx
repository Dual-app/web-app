const handleLogin = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (data.success) {
    login(data);        // save to AuthContext
    if (data.user.role === "admin" || data.user.role === "superadmin")
      navigate("/admin");
    else
      navigate("/customer/home");
  } else {
    alert("Login failed");
  }
};


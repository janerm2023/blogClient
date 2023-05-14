import { useState } from "react";
import Login from "./Login";

const Register = () => {
  const [data, setData] = useState({});
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://janermblog.onrender.com/api/register", {
      method: "POST",
      body: JSON.stringify({
        name: data.fname,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    // CHECKS
    if (response === "name") alert("Your Full Name is required!");
    if (response === "email") alert("Your Email is required!");
    if (response === "password") alert("Your password is required!");

    // CHECKS
    if (response.name && response.email && response.password !== "") {
      alert(`You have succefully registered ${response.name}`);
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Login />;
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Full Name.."
        onChange={handleChange}
        name="fname"
      />
      <input
        type="email"
        placeholder="Email.."
        onChange={handleChange}
        name="email"
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={handleChange}
        name="password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

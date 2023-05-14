import { useState } from "react";
// import Home from "./Home";
import { Navigate } from "react-router-dom";
// import { UserContext } from "../../UserContext";

const Login = () => {
  const [data, setData] = useState({});
  const [redirect, setRedirect] = useState(false);
  // const { setUserInfo } = useContext(UserContext);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://janermblog.onrender.com/api/login", {
      method: "POST",
      body: JSON.stringify({ email: data.email, password: data.password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const response = await res.json();

    // CHECKS
    if (response === "ok") {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Login</h1>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

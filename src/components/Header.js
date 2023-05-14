import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
// import Login from "./Pages/Login";

const Header = () => {
  // const [user, setUser] = useState(null);
  const { userInfo, setUserInfo } = useContext(UserContext);
  // const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://janermblog.onrender.com/profile", {
        credentials: "include",
      });

      const response = await res.json();

      // if (response === "noToken") {
      //   setRedirect(true);
      // }

      setUserInfo(response);
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    const res = await fetch("https://janermblog.onrender.com/api/logout", {
      method: "POST",
      credentials: "include",
    });

    await res.json();

    // if (response === "ok") {
    //   setRedirect(true);
    // }
  };

  // Check if data arrived from backend
  // console.log(userInfo);

  return (
    <header className="container">
      <Link className="logo" to="/">
        Janerm Blog
      </Link>
      <nav>
        {userInfo?.name && (
          <>
            <Link to={"/create-post"}>Create new Post</Link>
            <Link onClick={handleLogout}>Log Out</Link>
            <span>Hello, {userInfo.name}</span>
          </>
        )}

        {userInfo?.name === null && (
          <>
            <Link to="/sign-in">Login</Link>
            <Link to="/sign-up">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

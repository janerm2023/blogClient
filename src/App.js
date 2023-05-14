import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./components/Pages/CreatePost";
import PostId from "./components/Pages/PostId";
import EditPost from "./components/Pages/EditPost";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostId />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;

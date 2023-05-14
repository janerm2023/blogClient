import { useEffect, useState } from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch("https://janermblog.onrender.com/api/posts");

      const data = await res.json();
      setPosts(data);
    };
    getPosts();
  }, []);

  return (
    <div className="container">
      {posts.map((post, i) => {
        return (
          <div key={i} className="post">
            <div className="image">
              <Link to={`/post/${post._id}`}>
                <img
                  src={`https://janermblog.onrender.com/${post.cover}`}
                  alt="Update"
                />
              </Link>
            </div>

            <div className="post-content">
              <Link to={`/post/${post._id}`}>
                <h2>{post.title}</h2>
              </Link>
              <p className="author">
                <span>{post.author.name}</span>{" "}
                <time>{formatISO9075(new Date(post.createdAt))}</time>
              </p>
              <p className="summary">{post.summary}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

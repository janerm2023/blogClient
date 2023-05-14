import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { BiEdit } from "react-icons/bi";

const PostById = () => {
  const { userInfo } = useContext(UserContext);
  const [post, setPost] = useState([]);
  const { id } = useParams();

  // console.log(userInfo);
  // console.log(post);
  useEffect(() => {
    const fetchData = async (id) => {
      const res = await fetch(`https://janermblog.onrender.com/api/post/${id}`);
      const response = await res.json();

      setPost(response);
    };
    fetchData(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!post) return "";

  return (
    <div className="container postId">
      <h2>{post.title}</h2>
      <p className="time">{post.createdAt}</p>
      <h5>By: @{post.authorName}</h5>
      {userInfo.id === post.authorId && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${post.postId}`}>
            <BiEdit /> Edit Post
          </Link>
        </div>
      )}
      <div className="imageId">
        <img
          src={`https://janermblog.onrender.com/${post.cover}`}
          alt="Post Page"
        />
      </div>
      <div
        className="contentId"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default PostById;

import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async (id) => {
      const res = await fetch(`https://janermblog.onrender.com/api/post/${id}`);
      const response = await res.json();

      setSummary(response.summary);
      setTitle(response.title);
      setContent(response.content);
    };
    fetchData(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);

    if (files?.[0]) {
      data.set("files", files?.[0]);
    }

    const res = await fetch(
      "https://janermblog.onrender.com/api/post/updatePost",
      {
        method: "PUT",
        body: data,
        credentials: "include",
      }
    );

    await res.json();

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <form
      className="container postForm"
      onSubmit={updatePost}
      encType="multipart/form-data"
      action="/api/create-post"
      method="POST"
    >
      <h1 className="edit-text" style={{ marginBottom: "10px" }}>
        Edit Post
      </h1>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      {/* <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={(value) => setContent(value)}
      /> */}

      <Editor value={content} onChange={setContent} />
      <button type="submit" style={{ marginTop: "5px" }}>
        Update
      </button>
    </form>
  );
};

export default EditPost;

import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const createNewPost = async (ev) => {
    ev.preventDefault();
    const data = new FormData();

    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("files", files[0]);

    const response = await fetch(
      "https://janermblog.onrender.com/api/create-post",
      {
        method: "POST",
        body: data,
        credentials: "include",
      }
    );

    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form
      className="container postForm"
      onSubmit={createNewPost}
      encType="multipart/form-data"
      action="/api/create-post"
      method="POST"
    >
      <h1 className="create-text" style={{ marginBottom: "10px" }}>
        Create Post
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
        Post
      </button>
    </form>
  );
};

export default CreatePost;

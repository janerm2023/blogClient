import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ onChange, value }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <ReactQuill
      value={value}
      theme={"snow"}
      modules={modules}
      //   formats={formats}
      onChange={onChange}
    />
  );
};

export default Editor;

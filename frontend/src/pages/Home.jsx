import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css";
import Note from "../components/Note";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
        .delete(`/api/notes/delete/${id}/`)
        .then((res) => {
            if (res.status === 204) alert("Note deleted!");
            else alert("Failed to delete note.");
            getNotes();
        })
        .catch((error) => alert(error));
};

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created successfully");
        else alert("Failed to create note");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <Note key={note._id} note={note} onDelete={deleteNote} />
      ))}
      <div className="notes-section">
        <h2>Create a Note</h2>
        <form onSubmit={createNote} className="form">
        <label>Title</label>
        <br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Content</label>
        <br />
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
        </form>
      </div>
      
    </div>
  );
}

export default Home;

// view all notes
// create notes
// delete notes

import { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css"

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  // send request to get all the note
  const getNotes = () => {
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
        if (res.status == 204) {
          alert("Deleted sucessfully");
        } else {
          alert("Failed to delete");
        }
        getNotes();
      })
      .catch((err) => err);
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Note created!!");
        } else {
          alert("Failed to create note");
        }
        getNotes();
      })
      .catch((err) => err);
  };

  return (
    <div>
      <div>
        <h1>Notes</h1>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <div>
        <form onSubmit={createNote}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            id="content"
            name="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
         <br />
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;

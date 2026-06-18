import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");

  const API = "http://localhost:5000";

  const getStudents = async () => {
    const res = await axios.get(`${API}/students`);
    setStudents(res.data);
  };

  const addStudent = async () => {
    if (!name) return;

    await axios.post(`${API}/students`, {
      name,
    });

    setName("");
    getStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API}/students/${id}`);
    getStudents();
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: "#e21e1e" }}>
      <h1>Student CRUDS</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addStudent}>Add</button>

      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name}

            <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

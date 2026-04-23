import { useEffect, useState } from "react";
import { getGrievances, createGrievance } from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Academic",
  });

  const token = localStorage.getItem("token");

  // 🔄 Fetch all grievances
  const fetchData = async () => {
    try {
      const res = await getGrievances(token);
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching data");
    }
  };

  // ➕ Add grievance
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGrievance(form, token);
      setForm({
        title: "",
        description: "",
        category: "Academic",
      });
      fetchData();
    } catch (err) {
      alert("Error adding grievance");
    }
  };

  // 🔁 Load on start
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          <option>Academic</option>
          <option>Hostel</option>
          <option>Transport</option>
          <option>Other</option>
        </select>

        <button>Add Grievance</button>
      </form>

      {/* LIST */}
      <h3 style={{ textAlign: "center" }}>All Grievances</h3>

      {data.length === 0 ? (
        <p>No grievances yet</p>
      ) : (
        data.map((g) => (
          <div className="grievance" key={g._id}>
            <p><b>{g.title}</b></p>
            <p>{g.description}</p>
            <p>Category: {g.category}</p>
            <p>Status: {g.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
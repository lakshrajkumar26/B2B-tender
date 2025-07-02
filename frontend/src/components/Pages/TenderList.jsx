import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TenderList.css";

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [editingTender, setEditingTender] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    budget: "",
  });

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    const res = await axios.get("http://localhost:3000/tender");
    setTenders(res.data);
  };

  const handleEdit = (tender) => {
    setEditingTender(tender._id);
    setFormData({
      title: tender.title,
      description: tender.description,
      deadline: tender.deadline.split("T")[0],
      budget: tender.budget,
    });
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:3000/tender/${editingTender}`, formData, {
      withCredentials: true,
    });
    setEditingTender(null);
    fetchTenders();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/tender/${id}`, {
      withCredentials: true,
    });
    fetchTenders();
  };

  return (
    <div className="tender-grid">
      {tenders.map((tender) => (
        <div key={tender._id} className="tender-card">
          {editingTender === tender._id ? (
            <div>
              <input
                className="tender-input"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Title"
              />
              <textarea
                className="tender-textarea"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Description"
              />
              <input
                className="tender-input"
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
              />
              <input
                className="tender-input"
                type="number"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                placeholder="Budget"
              />
              <div className="tender-buttons">
                <button className="edit-btn" onClick={handleUpdate}>
                  Save
                </button>
                <button
                  className="delete-btn"
                  onClick={() => setEditingTender(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="tender-title">{tender.title}</h2>
              <p className="tender-description">{tender.description}</p>
              <p className="tender-deadline">
                Deadline: {new Date(tender.deadline).toLocaleDateString()}
              </p>
              <p className="tender-budget">₹ {tender.budget}</p>
              <div className="tender-buttons">
                <button className="edit-btn" onClick={() => handleEdit(tender)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(tender._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TenderList;


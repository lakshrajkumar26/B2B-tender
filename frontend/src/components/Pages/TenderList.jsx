import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TenderList.css";
import API_BASE_URL from '../../configFolder/api.js';

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [editingTender, setEditingTender] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    budget: "",
  });
  const [newTender, setNewTender] = useState({
    title: "",
    description: "",
    deadline: "",
    budget: "",
  });
  const [proposalText, setProposalText] = useState("");
  const [showProposalFor, setShowProposalFor] = useState(null);
  const [applications, setApplications] = useState([]);
  const [showApplicationsFor, setShowApplicationsFor] = useState(null);

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    const res = await axios.get(`${API_BASE_URL}/tender`, { withCredentials: true });
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
    await axios.put(`${API_BASE_URL}/tender/${editingTender}`, formData, {
      withCredentials: true,
    });
    setEditingTender(null);
    fetchTenders();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE_URL}/tender/${id}`, {
      withCredentials: true,
    });
    fetchTenders();
  };

  const handleCreateTender = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE_URL}/tender`, newTender, { withCredentials: true });
    setNewTender({ title: "", description: "", deadline: "", budget: "" });
    fetchTenders();
  };

  const handleShowProposal = (tenderId) => {
    setShowProposalFor(tenderId);
    setProposalText("");
  };

  const handleSubmitProposal = async (tenderId) => {
    await axios.post(
      `${API_BASE_URL}/application/submit`,
      { tenderId, proposalText },
      { withCredentials: true }
    );
    setShowProposalFor(null);
    setProposalText("");
    alert("Proposal submitted!");
  };

  const handleShowApplications = async (tenderId) => {
    setShowApplicationsFor(tenderId);
    const res = await axios.get(`${API_BASE_URL}/application/tender/${tenderId}`, { withCredentials: true });
    setApplications(res.data);
  };

  const handleHideApplications = () => {
    setShowApplicationsFor(null);
    setApplications([]);
  };

  return (
    <div>
      <h2>Create New Tender</h2>
      <form onSubmit={handleCreateTender} className="tender-form">
        <input
          className="tender-input"
          value={newTender.title}
          onChange={e => setNewTender({ ...newTender, title: e.target.value })}
          placeholder="Title"
          required
        />
        <textarea
          className="tender-textarea"
          value={newTender.description}
          onChange={e => setNewTender({ ...newTender, description: e.target.value })}
          placeholder="Description"
          required
        />
        <input
          className="tender-input"
          type="date"
          value={newTender.deadline}
          onChange={e => setNewTender({ ...newTender, deadline: e.target.value })}
          required
        />
        <input
          className="tender-input"
          type="number"
          value={newTender.budget}
          onChange={e => setNewTender({ ...newTender, budget: e.target.value })}
          placeholder="Budget"
          required
        />
        <button type="submit">Create Tender</button>
      </form>
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
                  <button
                    className="apply-btn"
                    onClick={() => handleShowProposal(tender._id)}
                  >
                    Apply
                  </button>
                  <button
                    className="view-app-btn"
                    onClick={() => handleShowApplications(tender._id)}
                  >
                    View Applications
                  </button>
                </div>
                {showProposalFor === tender._id && (
                  <div className="proposal-form">
                    <textarea
                      className="proposal-textarea"
                      value={proposalText}
                      onChange={e => setProposalText(e.target.value)}
                      placeholder="Enter your proposal..."
                    />
                    <button onClick={() => handleSubmitProposal(tender._id)}>
                      Submit Proposal
                    </button>
                    <button onClick={() => setShowProposalFor(null)}>
                      Cancel
                    </button>
                  </div>
                )}
                {showApplicationsFor === tender._id && (
                  <div className="applications-list">
                    <h4>Applications:</h4>
                    <button onClick={handleHideApplications}>Hide</button>
                    {applications.length === 0 ? (
                      <p>No applications yet.</p>
                    ) : (
                      <ul>
                        {applications.map(app => (
                          <li key={app._id}>
                            <strong>Company:</strong> {app.companyId?.name || app.companyId} <br />
                            <strong>Proposal:</strong> {app.proposalText}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenderList;




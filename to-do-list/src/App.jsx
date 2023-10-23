import React, { useState, useEffect } from "react";
const StartupIdeasApp = () => {
  const [ideas, setIdeas] = useState([]);
  const [newIdea, setNewIdea] = useState({
    title: "",
    description: "",
    priority: "Low",
  });
  const [editingIdeaId, setEditingIdeaId] = useState(null);

  useEffect(() => {
    const storedIdeas = localStorage.getItem("startupIdeas");
    if (storedIdeas) {
      setIdeas(JSON.parse(storedIdeas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("startupIdeas", JSON.stringify(ideas));
  }, [ideas]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIdea({
      ...newIdea,
      [name]: value,
    });
  };

  const addIdea = () => {
    if (newIdea.title.trim() === "") return;
    setIdeas([...ideas, { id: Date.now(), ...newIdea }]);
    setNewIdea({ title: "", description: "", priority: "Low" });
  };

  const startEdit = (id) => {
    setEditingIdeaId(id);
  };

  const saveEdit = (id) => {
    const updatedIdeas = ideas.map((idea) =>
      idea.id === id
        ? { ...idea, title: newIdea.title, description: newIdea.description }
        : idea
    );
    setIdeas(updatedIdeas);
    setEditingIdeaId(null);
  };

  const cancelEdit = () => {
    setEditingIdeaId(null);
  };

  const deleteIdea = (id) => {
    const updatedIdeas = ideas.filter((idea) => idea.id !== id);
    setIdeas(updatedIdeas);
  };

  const sortedIdeas = [...ideas].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    
    <div>
      <h1>Startup Ideas</h1>
      <h2>Add New Idea</h2>
      <form>
        <div className="input-container">
          <label>
            <strong>Title:</strong>
          </label>
          <input
            type="text"
            name="title"
            value={newIdea.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label>
            <strong>Description:</strong>
          </label>
          <input
            type="text"
            name="description"
            value={newIdea.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label>
            <strong>Priority:</strong>
          </label>
          <select
            name="priority"
            value={newIdea.priority}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="button" onClick={addIdea}>
          Add Idea
        </button>
      </form>
      <h2>Ideas</h2>
      <ul>
        {sortedIdeas.map((idea) => (
          <li key={idea.id}>
            <div className="input-container">
              <label>
                <strong>Title:</strong>
              </label>
              {editingIdeaId === idea.id ? (
                <input
                  type="text"
                  name="title"
                  value={newIdea.title}
                  onChange={handleInputChange}
                />
              ) : (
                idea.title
              )}
            </div>
            <div className="input-container">
              <label>
                <strong>Description:</strong>
              </label>
              {editingIdeaId === idea.id ? (
                <input
                  type="text"
                  name="description"
                  value={newIdea.description}
                  onChange={handleInputChange}
                />
              ) : (
                idea.description
              )}
            </div>
            <div className="input-container">
              <label>
                <strong>Priority:</strong>
              </label>
              {idea.priority}
            </div>
            {editingIdeaId === idea.id ? (
              <div>
                <button onClick={() => saveEdit(idea.id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <button onClick={() => startEdit(idea.id)}>Edit</button>
                <button onClick={() => deleteIdea(idea.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StartupIdeasApp;

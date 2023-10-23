import React, { useState } from "react";

const StartupIdeasApp = () => {
  const [ideas, setIdeas] = useState([]);

  const [newIdea, setNewIdea] = useState({
    title: "",
    description: "",
    priority: "Low",
  });

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

  const editIdea = (id, newIdeaData) => {
    const updatedIdeas = ideas.map((idea) =>
      idea.id === id ? { ...idea, ...newIdeaData } : idea
    );
    setIdeas(updatedIdeas);
  };

  const deleteIdea = (id) => {
    const updatedIdeas = ideas.filter((idea) => idea.id !== id);
    setIdeas(updatedIdeas);
  };

  // Custom sorting function to sort by priority
  const sortedIdeas = [...ideas].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div>
      <h1>Startup Ideas</h1>
      <ul>
        {sortedIdeas.map((idea) => (
          <li key={idea.id}>
            <div>
              <strong>Title:</strong> {idea.title}
            </div>
            <div>
              <strong>Description:</strong> {idea.description}
            </div>
            <div>
              <strong>Priority:</strong> {idea.priority}
            </div>
            <button onClick={() => deleteIdea(idea.id)}>Delete</button>
            <button onClick={() => editIdea(idea.id, { title: "New Title" })}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      <h2>Add New Idea</h2>
      <form>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newIdea.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newIdea.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Priority:
          <select
            name="priority"
            value={newIdea.priority}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <br />
        <button type="button" onClick={addIdea}>
          Add Idea
        </button>
      </form>
    </div>
  );
};

export default StartupIdeasApp;

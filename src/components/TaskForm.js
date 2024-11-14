import React, { useState } from 'react';

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('1');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim()) {
      addTask(title, priority);
      setTitle('');
      setPriority('1');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Enter task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="1">Low</option>
        <option value="2">Medium</option>
        <option value="3">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;

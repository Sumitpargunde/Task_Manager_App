import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState(''); // New state for sorting

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, priority) => {
    const newTask = { id: Date.now(), title, completed: false, priority };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const toggleCompleteTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle sort change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Apply sorting based on the selected option
  const sortedTasks = [...tasks]
    .filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'priority') {
        return a.priority - b.priority;
      }
      return 0;
    });

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="sort-options">
        <label>
          Sort by:
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="priority">Priority</option>
          </select>
        </label>
      </div>
      <TaskList
        tasks={sortedTasks}
        deleteTask={deleteTask}
        toggleCompleteTask={toggleCompleteTask}
      />
    </div>
  );
}

export default App;

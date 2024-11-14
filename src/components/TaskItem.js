import React from 'react';
import { FaTrash } from 'react-icons/fa';

function TaskItem({ task, deleteTask, toggleCompleteTask }) {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case '1': return 'priority-low';
      case '2': return 'priority-medium';
      case '3': return 'priority-high';
      default: return '';
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span
        className="task-title"
        onClick={() => toggleCompleteTask(task.id)}
      >
        {task.title}
      </span>
      <span className={`priority ${getPriorityClass(task.priority)}`}>
        {task.priority === '1' ? 'Low' : task.priority === '2' ? 'Medium' : 'High'}
      </span>
      <button className="delete-btn" onClick={() => deleteTask(task.id)}>
        <FaTrash />
      </button>
    </div>
  );
}

export default TaskItem;

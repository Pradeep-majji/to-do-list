import React, { useState, useEffect } from 'react';
import './App.css';


const API_URL = 'https://jsonplaceholder.typicode.com/users/1/todos';
const App = () => {

const [tasks, setTasks] = useState([]);
const [newTask, setNewTask] = useState('');
const [showCompleted, setShowCompleted] = useState(false);
useEffect(() => {
// Fetch initial tasks from the API
fetch(API_URL)
.then(response => response.json())
.then(data => setTasks(data))
.catch(error => console.error('Error fetching todos:', error));
}, []);
const handleAddTask = () => {
if (newTask.trim() !== '') {
const newTaskObj = {
id: tasks.length + 1,
title: newTask,
completed: false,
};
setTasks([...tasks, newTaskObj]);
setNewTask('');
}
};
const handleToggleTask = taskId => {
const updatedTasks = tasks.map(task =>
task.id === taskId ? { ...task, completed: !task.completed } : task
);
setTasks(updatedTasks);
};
const handleEditTask = (taskId, newTitle) => {
const updatedTasks = tasks.map(task =>
task.id === taskId ? { ...task, title: newTitle } : task
);
setTasks(updatedTasks);
};
const handleDeleteTask = taskId => {
const updatedTasks = tasks.filter(task => task.id !== taskId);
setTasks(updatedTasks);
};

return (
<div className="App">
<h1>Todo App</h1>
<div>
<input
type="text"
value={newTask}
onChange={e => setNewTask(e.target.value)}
placeholder="Add a new task"
/>
<button onClick={handleAddTask}>Add Task</button>
</div>
<div>
<label>
Show Completed
<input
type="checkbox"
checked={showCompleted}
onChange={() => setShowCompleted(!showCompleted)}
/>
</label>
</div>
<ul>
{tasks
.filter(task => (showCompleted ? true : !task.completed))
.map(task => (
<li key={task.id} className={task.completed ? 'completed' : ''}>
<span
onClick={() => handleToggleTask(task.id)}
>
{task.title}
</span>
<button className="edit" onClick={() => handleEditTask(task.id, prompt('Edittask:', task.title))}>
Edit
</button>
<button className="delete" onClick={() =>
handleDeleteTask(task.id)}>Delete</button>
</li>
))  }
</ul>
</div>
);
};
export default App;
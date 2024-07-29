// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css';  // Import the CSS file

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('/api/todos/');
        setTodos(response.data);
    };

    const handleAddTodo = async () => {
        const newTodo = { title, description, completed: false };
        await axios.post('/api/todos/', newTodo);
        fetchTodos();
        setTitle('');
        setDescription('');
    };

    const handleDeleteTodo = async (id) => {
        await axios.delete(`/api/todos/${id}/`);
        fetchTodos();
    };

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <h2>{todo.title}</h2>
                        <p>{todo.description}</p>
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;

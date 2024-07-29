// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('/api/todos/');
        setTodos(response.data);
    };

    const handleAddTodo = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('completed', false);
        if (image) {
            formData.append('image', image);
        }

        await axios.post('/api/todos/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        fetchTodos();
        setTitle('');
        setDescription('');
        setImage(null);
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
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <h2>{todo.title}</h2>
                        <p>{todo.description}</p>
                        {todo.image && <img src={todo.image} alt={todo.title} />}
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;

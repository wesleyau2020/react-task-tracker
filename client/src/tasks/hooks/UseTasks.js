import { useState, useEffect } from "react";
import axios from "axios";

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks", error));
  }, []);

  const addTask = (task) => {
    return axios
      .post("http://localhost:5000/api/tasks", task)
      .then((response) => setTasks((prev) => [...prev, response.data]));
  };

  const toggleTask = (id, completed) => {
    return axios
      .put(`http://localhost:5000/api/tasks/${id}`, { completed })
      .then(() =>
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? { ...task, completed } : task)),
        ),
      );
  };

  const deleteTask = (id) => {
    return axios
      .delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => setTasks((prev) => prev.filter((task) => task.id !== id)));
  };

  return { tasks, addTask, toggleTask, deleteTask };
}

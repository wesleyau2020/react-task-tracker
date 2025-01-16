import * as React from "react";
import { useState } from "react";

// MUI
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Tasks
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";
import EditTaskModal from "./components/EditTaskModal";
import { useTasks } from "./hooks/UseTasks";

// Dashboard
import AppNavbar from "../dashboard/components/AppNavbar";
import Header from "../dashboard/components/Header";
import SideMenu from "../dashboard/components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";

export default function Tasks(props) {
  const { tasks, addTask, editTask, deleteTask, setTaskCompleted } = useTasks();
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTaskText, setCurrentTaskText] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask({
        text: newTask,
        completed: false,
        date: new Date().toLocaleString(),
      });
      setNewTask("");
    } else {
      console.error("Please enter task!");
    }
  };

  const handleEditTask = (task) => {
    setCurrentTaskText(task.text);
    setCurrentTaskId(task.id);
    setIsEditModalOpen(true);
  };

  const handleSaveTask = (updatedText) => {
    editTask(currentTaskId, { text: updatedText })
      .then(() => {
        setIsEditModalOpen(false);
        setCurrentTaskText("");
        setCurrentTaskId(null);
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) =>
          filter === "Completed" ? task.completed : !task.completed,
        );

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
          <Stack spacing={2} sx={{ mx: 3, pb: 5, mt: { xs: 8, md: 0 } }}>
            <Header />
            <Box sx={{ boxShadow: 2, p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                TO DO LIST
              </Typography>
              <TaskInput
                newTask={newTask}
                onInputChange={setNewTask}
                onAddTask={handleAddTask}
                filter={filter}
                onFilterChange={setFilter}
              />
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onCheck={() => setTaskCompleted(task.id, !task.completed)}
                  onEdit={() => handleEditTask(task)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
            </Box>
          </Stack>
        </Box>
      </Box>

      <EditTaskModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSaveTask}
        taskText={currentTaskText}
        setTaskText={setCurrentTaskText}
      />
    </AppTheme>
  );
}

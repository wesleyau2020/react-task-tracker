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
import { useTasks } from "./hooks/UseTasks";

// Dashboard
import AppNavbar from "../dashboard/components/AppNavbar";
import Header from "../dashboard/components/Header";
import SideMenu from "../dashboard/components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";

export default function Tasks(props) {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");

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
                  onToggle={() => toggleTask(task.id, !task.completed)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}

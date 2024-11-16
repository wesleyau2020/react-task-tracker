import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AppNavbar from "../dashboard/components/AppNavbar";
import Header from "../dashboard/components/Header";
import SideMenu from "../dashboard/components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";
import {
  chartsCustomizations,
  treeViewCustomizations,
} from "../dashboard/theme/customizations";

const xThemeComponents = {
  ...chartsCustomizations,
  ...treeViewCustomizations,
};

export default function Tasks(props) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching tasks!", error);
      });
  }, []);

  const handleAddTask = () => {
    if (newTask.trim()) {
      axios
        .post("http://localhost:5000/api/tasks", {
          text: newTask,
          completed: false,
          date: new Date().toLocaleString(),
        })
        .then((response) => {
          setTasks([...tasks, response.data]);
          setNewTask(""); // Clear the input field
        })
        .catch((error) => {
          console.error("There was an error adding the task!", error);
        });
    }
  };

  const handleToggleTask = (id) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    axios
      .put(`http://localhost:5000/api/tasks/${id}`, {
        completed: !taskToUpdate.completed,
      })
      .then((response) => {
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      })
      .catch((error) => {
        console.error("There was an error toggling the task!", error);
      });
  };

  const handleDeleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the task!", error);
      });
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) =>
          filter === "Completed" ? task.completed : !task.completed
        );

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
            px: 3,
            py: 2,
          })}
        >
          <Stack spacing={3}>
            <Header />
            <Box
              sx={{
                boxShadow: 2,
                borderRadius: 2,
                backgroundColor: (theme) =>
                  theme.vars
                    ? `rgba(${theme.vars.palette.background.paperChannel} / 1)`
                    : theme.palette.background.paper,
                p: 3,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                TO DO LIST
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  // label="Add Task"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  sx={{
                    "& .MuiInputLabel-root": {
                      transform: "translate(14px, 12px)",
                    },
                    "& .MuiOutlinedInput-root": {
                      paddingTop: "12px",
                    },
                  }}
                  placeholder="Enter task here"
                />
                <Button
                  variant="contained"
                  onClick={handleAddTask}
                  sx={{
                    fontSize: "0.675rem",
                    padding: "4px 6px",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.secondary",
                    },
                  }}
                >
                  Add Task
                </Button>
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  size="small"
                  sx={{ minWidth: 100 }}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </Box>
              {filteredTasks.map((task) => (
                <Card
                  key={task.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                    p: 1,
                    boxShadow: 1,
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                    />
                    <Box>
                      <Typography
                        sx={{
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                          fontWeight: 500,
                        }}
                      >
                        {task.text}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {task.date}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box>
                    <IconButton sx={{ mr: 1 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteTask(task.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
              ))}
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}

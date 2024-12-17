import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function TaskInput({
  newTask,
  onInputChange,
  onAddTask,
  filter,
  onFilterChange,
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        value={newTask}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Enter task here"
      />
      <Button
        variant="contained"
        onClick={onAddTask}
        sx={{ fontSize: "0.725rem", whiteSpace: "nowrap" }}
      >
        Add Task
      </Button>
      <Select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        size="small"
        sx={{ minWidth: 125 }}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
      </Select>
    </Box>
  );
}

export default TaskInput;

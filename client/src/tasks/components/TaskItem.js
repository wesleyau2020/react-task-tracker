import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function TaskItem({ task, onCheck, onEdit, onDelete }) {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 1,
        p: 1,
      }}
    >
      {/* Task details */}
      <CardContent
        sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 1 }}
      >
        <Checkbox checked={task.completed} onChange={() => onCheck(task.id)} />
        <Box>
          <Typography
            sx={{
              textDecoration: task.completed ? "line-through" : "none",
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
        <IconButton onClick={() => onEdit(task.id)} sx={{ mr: 1 }}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(task.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
}

export default TaskItem;

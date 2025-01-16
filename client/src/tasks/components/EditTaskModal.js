import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const EditTaskModal = ({ open, onClose, onSubmit, taskText, setTaskText }) => {
  const handleSubmit = () => {
    if (taskText.trim() === "") {
      alert("Task text cannot be empty!");
      return;
    }
    onSubmit(taskText);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-task-modal"
      aria-describedby="edit-task-modal-description"
    >
      <Box
        sx={{
          width: 400,
          margin: "auto",
          padding: 3,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Task
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          sx={{
            "& .MuiInputBase-root": {
              display: "flex",
              flexDirection: "column",
            },
          }}
        />
        <Box
          sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;

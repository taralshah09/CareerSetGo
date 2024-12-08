import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Grid from '@mui/material/Grid';
import AuthContext from '../context/AuthContext';
import Select from "react-dropdown-select";
import { createTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const ThreadForm = () => {
  let { user } = useContext(AuthContext);

  const [alertShow, setAlertShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [thread, setThread] = useState({
    subject: "",
    content: "",
    topic: "", // This should just be the topic ID
    creator: user?.id || "", // Assuming user has an 'id' field, replace with actual user ID if needed
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // topic options
  const options = [
    { value: 1, label: "Entertainment" },
    { value: 2, label: 'Sports' },
    { value: 3, label: 'Gaming' },
    { value: 4, label: 'Music' },
    { value: 5, label: 'Technology' },
    { value: 6, label: 'News' },
    { value: 7, label: 'Anime' },
    { value: 8, label: 'Drama & Movie' },
  ];

  let handleThread = async (event) => {
    event.preventDefault(); // Prevent default form submission
  
    // Validate fields before sending
    if (!thread.subject || !thread.content || !thread.topic) {
      console.error("Missing required fields", thread);
      return;
    }
  
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`/api/createThread/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: thread.subject,
          content: thread.content,
          topic: thread.topic,
          creator: thread.creator
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Thread created successfully:", data);
        handleClose();
      } else {
        console.error("Error creating thread:", data);
        // Optionally show error to user
      }
    } catch (error) {
      console.error("Network or parsing error:", error);
    }
  };

  // New thread button theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#6a5acd',
      },
    },
  });

  return (
    <div>
      <Grid container justifyContent="flex-end">
        <Button
          theme={theme}
          variant="outlined"
          onClick={handleClickOpen}
          endIcon={<PostAddIcon />}
          style={{ maxWidth: '180px', maxHeight: '32px', minWidth: '100px', minHeight: '32px' }}
        >
          New Thread
        </Button>
      </Grid>

      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <form onSubmit={handleThread} id="NewThreadForm">
          <Box>
            {alertShow && (
              <Alert severity="error" onClose={() => setAlertShow(false)}>
                Please login to add a new thread. <Link href="/login">Click here to login.</Link>
              </Alert>
            )}
          </Box>

          <DialogTitle>New Thread</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose the topic of your thread.
            </DialogContentText>

            <Select
              required
              onChange={(selectedOption) =>
                setThread({ ...thread, topic: selectedOption[0]?.value || "" })
              }
              options={options}
              value={thread.topic ? [{ value: thread.topic }] : []}
            />

            <TextField
              style={{ marginTop: 20 }}
              required
              autoFocus
              margin="dense"
              id="subject"
              name="subject"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={thread.subject}
              onChange={e => setThread({ ...thread, subject: e.target.value })}
            />

            <TextField
              required
              autoFocus
              margin="dense"
              id="content"
              name="content"
              placeholder="What's on your mind?"
              hiddenLabel
              type="text"
              fullWidth
              variant="standard"
              multiline
              rows={10}
              onChange={e =>
                setThread({ ...thread, content: e.target.value.replace(/\\n/g, '\n').replace(/\\"/g, '"') })
              }
              value={thread.content.replace(/\\n/g, '\n').replace(/\\"/g, '"')}
            />
          </DialogContent>

          <DialogActions>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
              <Button variant="contained" endIcon={<SendIcon />} type="submit">Send</Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ThreadForm;

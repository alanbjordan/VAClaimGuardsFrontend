// ChatInput.jsx
import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';

function ChatInput({ onSendMessage }) {
  const [currentInput, setCurrentInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!currentInput.trim()) return;
    onSendMessage(currentInput);
    setCurrentInput('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSend}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1,
        backgroundColor: 'background.paper',
      }}
    >
      <IconButton>
        <AttachFileIcon />
      </IconButton>

      <IconButton>
        <MicIcon />
      </IconButton>

      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Type your message..."
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        sx={{ mx: 1 }}
      />

      <IconButton
        color="primary"
        type="submit"
        disabled={!currentInput.trim()}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default ChatInput;

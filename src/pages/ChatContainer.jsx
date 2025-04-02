// src/pages/ChatContainer.jsx (Mock Version)

import React, { useState, useRef, useEffect, useContext } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import MessageList from '../components/Chat/MessageList';
import ChatInput from '../components/Chat/ChatInput';
import { AuthContext } from '../AuthContext';

// 1) Just a local function that returns a random joke
function getRandomJoke() {
  const jokes = [
    "Why did the scarecrow get promoted? Because he was out-standing in his field!",
    "What do you call cheese that isn't yours? Nacho cheese!",
    "Why couldn't the bicycle stand up by itself? It was two tired!",
    "Did you hear the rumor about butter? Well, I'm not going to spread it!",
    "Why do bees have sticky hair? Because they use honey combs!",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "What do you call a fake noodle? An Impasta!",
    "Want to hear a construction joke? Sorry, I'm still working on it!",
  ];
  const randomIndex = Math.floor(Math.random() * jokes.length);
  return jokes[randomIndex];
}

function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [threadId, setThreadId] = useState(null); // Even though we don't use it for real calls

  const { updateCredits } = useContext(AuthContext);

  // We'll still read these from local storage or location if you want
  const userUUID = localStorage.getItem('userUUID');
  const userFirstName = localStorage.getItem('first_name') || 'there';

  // If user came from another page with state
  const location = useLocation();
  const incomingThreadId = location.state?.threadId;
  const fromExploreModal = location.state?.fromExploreModal || false;
  const preMessage = location.state?.preMessage || '';

  const scrollContainerRef = useRef(null);
  const isInitialLoad = useRef(true);

  // 2) On mount, if we had an incomingThreadId in a real scenario, we'd load. 
  //    But now we skip any real fetch. We'll still store it if you want.
  useEffect(() => {
    if (incomingThreadId) {
      setThreadId(incomingThreadId);
      // In a real app, you might load the chat history from mock data or do nothing
    }
  }, [incomingThreadId]);

  // 3) Auto-scroll logic
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // 4) Possibly show a welcome message if there's no existing thread
  useEffect(() => {
    if (!incomingThreadId) {
      if (fromExploreModal) {
        setMessages([
          {
            id: 1,
            text: `Hello ${userFirstName}, let me get an explanation for your nexus...`,
            isBot: true,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      } else {
        setMessages([
          {
            id: 1,
            text: `Hello ${userFirstName}! How can I help?`,
            isBot: true,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
    }
  }, [fromExploreModal, userFirstName, incomingThreadId]);

  // 5) If there's a preMessage, auto-send it
  useEffect(() => {
    if (preMessage.trim()) {
      autoSendMessage(preMessage.trim());
    }
  }, [preMessage]);

  // ---------------------------------------------
  // handleSendMessage (core function)
  // ---------------------------------------------
  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // 1) Add the user's message
    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // 2) Simulate a short delay, then respond with a random joke
    setTimeout(() => {
      const joke = getRandomJoke();
      const botMessage = {
        id: Date.now() + 1,
        text: joke,
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      // If you want to randomly update credits
      updateCredits((prevCredits) => prevCredits); // e.g. no change
    }, 1000);
  };

  // ---------------------------------------------
  // autoSendMessage (used for preMessage)
  // ---------------------------------------------
  const autoSendMessage = async (text) => {
    if (!text.trim()) return;

    setIsTyping(true);

    // Short delay, then random joke
    setTimeout(() => {
      const userMessage = {
        id: Date.now(),
        text: text.trim(),
        isBot: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      const botMessage = {
        id: Date.now() + 1,
        text: getRandomJoke(),
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, userMessage, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Messages Scroll Container */}
      <Box
        ref={scrollContainerRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <MessageList messages={messages} isTyping={isTyping} />
      </Box>

      {/* Input Bar */}
      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          left: 0,
          width: '100%',
          bgcolor: '#ffffff',
          borderTop: '1px solid #ddd',
          p: 1,
          zIndex: 10,
        }}
      >
        <ChatInput onSendMessage={handleSendMessage} />
      </Box>
    </Box>
  );
}

export default ChatContainer;

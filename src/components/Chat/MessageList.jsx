// MessageList.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';   // for Markdown rendering
import remarkGfm from 'remark-gfm';          // for GitHub-Flavored Markdown (tables, etc.)
import TypingIndicator from './TypingIndicator';
import MessageBubble from './MessageBubble';

function MessageList({ messages, isTyping }) {
  return (
    <>
      {messages.map((msg) => {
        if (msg.isBot) {
          // Render BOT messages as Markdown
          return (
            <div
              key={msg.id}
              style={{
                margin: '10px 0',
              }}
            >
              <div
                style={{
                  backgroundColor: '#eee',
                  padding: '10px',
                  borderRadius: '8px',
                  maxWidth: '70%',
                  // Change these so the bubble is on the left
                  marginLeft: 0,
                  marginRight: 'auto',
                }}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          );
        } else {
          // Render USER messages
          return <MessageBubble key={msg.id} message={msg} />;
        }
      })}

      {isTyping && <TypingIndicator />}
    </>
  );
}

export default MessageList;

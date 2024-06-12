import React from 'react';

function PrivateMessages({ messages, selectedChat }) {
  return (
    <>
      <h2>Messages</h2>
      {messages.map(message => (
        <div key={message._id}>
          {message.senderId === selectedChat.user1Id._id
            ? selectedChat.user1Id.username
            : selectedChat.user2Id.username}: {message.content}
        </div>
      ))}
    </>
  );
}

export default PrivateMessages;

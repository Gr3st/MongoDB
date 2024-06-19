import React from 'react';

function PrivateMessages({ messages, selectedChat }) {
  return (
    <>
    console.log(messages);
      {/* <h2>Messages</h2> */}
      {messages.map(message => (
        <div key={message._id} className='chat-panel'>
          {message.senderId === selectedChat.user1Id._id
            ? <div className='sender-chat'><span>{selectedChat.user1Id.username+": "+message.content}</span><img width="40" height="40" src="https://img.icons8.com/color/48/circled-user-female-skin-type-1-2--v1.png" alt="circled-user-female-skin-type-1-2--v1"/></div>
            : <div className='reciver-chat'><img width="40" height="40" src="https://img.icons8.com/color/48/circled-user-female-skin-type-6--v1.png" alt="circled-user-female-skin-type-6--v1"/><span>{selectedChat.user2Id.username+": "+message.content}</span></div>}
        </div>
      ))}
    </>
  );
}

export default PrivateMessages;

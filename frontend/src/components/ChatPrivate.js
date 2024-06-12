import React from 'react';

function PrivateChats({ chats, fetchMessages }) {
  return (
    <>
      <h1>Private Chats</h1>
      {chats.map(chat => (
        <div key={chat._id} onClick={() => fetchMessages(chat)}>
          {localStorage.getItem('senderID') === chat.user1Id._id ? chat.user2Id.username : chat.user1Id.username}
        </div>
      ))}
    </>
  );
}

export default PrivateChats;
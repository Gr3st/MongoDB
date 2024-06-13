import React from 'react';

function PrivateChats({ chats, fetchMessages }) {
  return (
    <div className='private-chats'>
      <h1>Private Chats</h1>
      {chats.map(chat => (
        <div className='chat' key={chat._id} onClick={() => fetchMessages(chat)}>
          {localStorage.getItem('senderID') === chat.user1Id._id ? chat.user2Id.username : chat.user1Id.username}
        </div>
      ))}
    </div>
  );
}

export default PrivateChats;
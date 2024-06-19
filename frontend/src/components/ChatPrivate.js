import React from 'react';

function PrivateChats({ chats, fetchMessages }) {
  return (
    <div className='private-chats'>
      {/* <h1>Private Chats</h1> */}
      {chats.map(chat => (
        <div className='chat' key={chat._id} onClick={() => fetchMessages(chat)}>
          <img width="40" height="40" src="https://img.icons8.com/color/48/circled-user-female-skin-type-6--v1.png" alt="circled-user-female-skin-type-6--v1"/>{localStorage.getItem('senderID') === chat.user1Id._id ? chat.user2Id.name+" "+chat.user2Id.surname+"\n"+chat.user2Id.username : chat.user1Id.name+" "+chat.user1Id.surname+"\n"+chat.user1Id.username}
        </div>
      ))}
    </div>
  );
}

export default PrivateChats;
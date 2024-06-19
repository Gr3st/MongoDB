import React from 'react';

function PrivateChats({ messages, chats, fetchMessages }) {
  const getLastMessage = (chatId) => {
    const chatMessages = messages.filter(message => 
      message.senderId === localStorage.getItem('senderID') && message.receiverId === chatId
    );
    console.log(chatMessages);
    return chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].content : '';
  };
  
  return (
    <div className='private-chats'>
      {chats.map(chat => (
        <div className='chat' key={chat._id} onClick={() => fetchMessages(chat)}>
          <img width="40" height="40" src="https://img.icons8.com/color/48/circled-user-female-skin-type-6--v1.png" alt="circled-user-female-skin-type-6--v1"/>
          <div className='chat-data'>
            <div className='chat-name'>
              {localStorage.getItem('senderID') === chat.user1Id._id ? `${chat.user2Id.name} ${chat.user2Id.surname}` : `${chat.user1Id.name} ${chat.user1Id.surname}`}
            </div>
            <div className='chat-username'>
              {localStorage.getItem('senderID') === chat.user1Id._id ? chat.user2Id.username : chat.user1Id.username}
            </div>
            <div className='last-message'>
              {getLastMessage(localStorage.getItem('senderID') === chat.user1Id._id ? chat.user2Id._id : chat.user1Id._id)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PrivateChats;

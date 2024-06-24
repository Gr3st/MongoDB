import React, { useEffect } from 'react';

function PrivateChatsActive({ chats, setSelectedChat, fetchMessages }) {
  const senderID = localStorage.getItem('senderID');
  const receiverID = localStorage.getItem('receiverID');

  // useEffect to select chat automatically based on localStorage values
  useEffect(() => {
    // Find the first chat that matches the condition
    const chatToSelect = chats.find(
      (chat) =>
        chat.user1Id._id === receiverID || chat.user2Id._id === receiverID
    );

    // If a chat is found, select it
    if (chatToSelect) {
      setSelectedChat(chatToSelect);
      fetchMessages(chatToSelect[0]);
    }
  }, [chats, receiverID, setSelectedChat, fetchMessages]);

  return (
    <div className='private-chats'>
      {chats
        .filter(
          (chat) =>
            chat.user1Id._id === receiverID || chat.user2Id._id === receiverID
        )
        .map((chat) => (
          <div className='chat' key={chat._id} onClick={() => setSelectedChat(chat._id)}>
            <img
              width='40'
              height='40'
              src='https://img.icons8.com/color/48/circled-user-female-skin-type-6--v1.png'
              alt='circled-user-female-skin-type-6--v1'
            />
            <div className='chat-data'>
              <div className='chat-name'>
                {senderID === chat.user1Id._id
                  ? `${chat.user2Id.name} ${chat.user2Id.surname}`
                  : `${chat.user1Id.name} ${chat.user1Id.surname}`}
              </div>
              {/* Uncomment this if getLastMessage function is defined elsewhere */}
              {/* <div className='last-message'>
                {getLastMessage(
                  senderID === chat.user1Id._id ? chat.user2Id._id : chat.user1Id._id
                )}
              </div> */}
            </div>
          </div>
        ))}
    </div>
  );
}

export default PrivateChatsActive;

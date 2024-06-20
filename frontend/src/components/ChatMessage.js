import React from 'react';

function PrivateMessages({ messages, selectedChat }) {
  const loggedInUserId = localStorage.getItem('senderID');

  return (
    <>
    {/* jezeli w pierwszej wiadomosci nie znajdzie sender to przeskakuje do drugirej i znowu sprawdza kto jest senderem
          {message.senderId === loggedInUserId */}
      {/* <h2>Messages</h2> */}
      {messages.map(message => (
        <div key={message._id} className='chat-panel'>
          {message.senderId === loggedInUserId
            ? (
              <div className='sender-chat'>
                <span>
                  {selectedChat.user1Id._id === loggedInUserId
                    ? selectedChat.user1Id.username
                    : selectedChat.user2Id.username
                  }: {message.content}
                </span>
                <img
                  width="40"
                  height="40"
                  src="https://img.icons8.com/color/48/circled-user-female-skin-type-1-2--v1.png"
                  alt="sender-avatar"
                />
              </div>
            )
            : (
              <div className='reciver-chat'>
                <img
                  width="40"
                  height="40"
                  src="https://img.icons8.com/color/48/circled-user-female-skin-type-6--v1.png"
                  alt="receiver-avatar"
                />
                <span>
                  {selectedChat.user1Id._id === loggedInUserId
                    ? selectedChat.user2Id.username
                    : selectedChat.user1Id.username
                  }: {message.content}
                </span>
              </div>
            )}
        </div>
      ))}
    </>
  );
}

export default PrivateMessages;

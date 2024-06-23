import React, { useEffect } from 'react';
import moment from 'moment';
import Search from '../components/Search';


function PrivateChatsActive({chats}) {

  return (
    <div className='private-chats'>
      {localStorage.getItem('search')==='true'&&
        chats.filter(chat => chat.user1Id._id === localStorage.getItem('receiverID') || chat.user2Id._id === localStorage.getItem('receiverID')).map((chat) => (
          <div className='chat' key={chat._id} onClick={() => fetchMessages(chat)}>
            <img
              width='40'
              height='40'
              src='https://img.icons8.com/color/48/circled-user-female-skin-type-6--v1.png'
              alt='circled-user-female-skin-type-6--v1'
            />
            <div className='chat-data'>
              <div className='chat-name'>
                {localStorage.getItem('senderID') === chat.user1Id._id
                  ? `${chat.user2Id.name} ${chat.user2Id.surname}`
                  : `${chat.user1Id.name} ${chat.user1Id.surname}`}
              </div>
              {/* <div className='last-message'>
                {getLastMessage(
                  localStorage.getItem('senderID') === chat.user1Id._id
                    ? chat.user2Id._id
                    : chat.user1Id._id
                )}
              </div> */}
            </div>
          </div>
        ))}
    </div>
  );
}

export default PrivateChatsActive;

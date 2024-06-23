import React, { useEffect } from 'react';
import moment from 'moment';
import Search from '../components/Search';


function PrivateChats({ lastMessages, messages, chats, fetchMessages }) {

  const timeSinceMessage = (timestamp) => {
    if (!timestamp) {
      return 'Unknown time ago'; // Handle undefined or null timestamp gracefully
    }

    const messageDate = new Date(timestamp);
    const currentDate = new Date();

    // Calculate the difference in seconds
    const seconds = Math.floor((currentDate - messageDate) / 1000);

    // Calculate days difference
    const daysDifference = Math.floor(seconds / 86400);

    // Same day: Return the time (HH:mm)
    if (daysDifference === 0) {
      const hours = messageDate.getHours();
      const minutes = messageDate.getMinutes();
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    // Within the past 7 days: Return the day of the week (Mon, Tue, etc.)
    if (daysDifference < 7) {
      const daysOfWeek = ['nd', 'pon', 'wt', 'śr', 'czw', 'pt', 'sb'];
      const dayOfWeek = daysOfWeek[messageDate.getDay()];
      return dayOfWeek;
    }

    // More than 7 days ago: Return the date and abbreviated day of the week (15 Thu)
    const dayOfMonth = messageDate.getDate();
    const month = messageDate.toLocaleString('default', { month: 'short' });
    return `${dayOfMonth} ${month}`;
  };

  const getLastMessage = (chatId) => {
    const last = lastMessages.filter(
      (last) => last.receiverId === chatId || last.senderId === chatId
    );
    if (last.length === 0) return '';

    const lastMessage = last[last.length - 1];
    const time = timeSinceMessage(lastMessage.timestamp);
    return (
      <>
        <div className='last-message-text'>{lastMessage.content}</div>
        {`‧`}
        <div className='last-message-time'>{time}</div>
      </>
    );
  };

  return (
    <div className='private-chats'>
      <Search />
      {localStorage.getItem('search')==='true'&&
        chats.map((chat) => (
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
              <div className='last-message'>
                {getLastMessage(
                  localStorage.getItem('senderID') === chat.user1Id._id
                    ? chat.user2Id._id
                    : chat.user1Id._id
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default PrivateChats;

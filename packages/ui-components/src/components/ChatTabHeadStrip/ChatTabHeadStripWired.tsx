import React from 'react';
import ChatTabHeadStrip from './ChatTabHeadStrip';
import useActiveChats from '../../hooks/useActiveChats';

export interface ChatTabHeadStripWiredProps {
  /** Show the back icon instead of the cross to handle plugin view */
  showBack?: boolean;
}

const ChatTabHeadStripWired = ({ showBack }: ChatTabHeadStripWiredProps) => {
  const {
    activeChats,
    openIndex,
    setActiveChat,
    removeActiveChat: removeContact,
    showChatDetail
  } = useActiveChats();

  return (
    <ChatTabHeadStrip
      showBack={!!showBack}
      activeChats={activeChats}
      openIndex={openIndex}
      onItemClick={index => {
        activeChats && setActiveChat(activeChats[index]);
      }}
      onCloseClick={index => {
        activeChats && removeContact(activeChats[index]);
      }}
      onDetailsClick={index => {
        showChatDetail(index);
      }}
    />
  );
};

export default ChatTabHeadStripWired;

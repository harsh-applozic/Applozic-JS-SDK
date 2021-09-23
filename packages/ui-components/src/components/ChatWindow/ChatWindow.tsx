import {
  Text,
  Container,
  VStack,
  Center,
  Avatar,
  useColorModeValue as mode,
  Spinner,
  HStack,
  Box,
  AvatarGroup
} from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { ChatType, Message } from '../../models/chat';
import ScrollArea from '../ScrollArea';
import ChatBubble from './ChatBubble';
import { useInView } from 'react-intersection-observer';
import useGetMessages from '../../hooks/queries/useGetUserMessages';
import { ActiveChat } from '../../providers/useActiveChats';
import { getMonthName } from '../../time-utils';
import useGetSelfDetails from '../../hooks/queries/useGetSelfDetails';

export interface ChatWindowProps {
  hasAttachment?: boolean;
  chatItem: ActiveChat;
  messages?: Message[];
  contactName: string;
  contactImageUrl?: string;
  gMapsApiKey?: string;
  onMessageDelete?: (message: Message, deleteForAll?: boolean) => void;
}

function ChatWindow({
  hasAttachment,
  chatItem,
  messages,
  contactName,
  contactImageUrl,
  gMapsApiKey,
  onMessageDelete
}: ChatWindowProps) {
  const user = useGetSelfDetails();
  const { fetchNextPage, isFetchingNextPage, hasNextPage } = useGetMessages(
    chatItem.type,
    chatItem.contactId
  );
  const elementRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef?.current) {
      elementRef.current.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [elementRef, messages]);
  const { ref: oldestMessage, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    initialInView: false
  });
  useEffect(() => {
    if (!isFetchingNextPage && inView && fetchNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <Container
      maxW="100%"
      display="flex"
      flexShrink={1}
      flexGrow={1}
      flexBasis={0}
      h={`calc(100% - ${
        chatItem.type == ChatType.USER
          ? `${hasAttachment ? '183px' : '115px'}`
          : `${hasAttachment ? '135px' : '67px'}`
      })`}
      backgroundColor={mode('#FFFFFF', '#1B191D')}
    >
      {messages && messages.length > 0 ? (
        <ScrollArea pr={3} pl={3}>
          <VStack
            as="ul"
            w="full"
            spacing={4}
            display="flex"
            flexDirection="column"
          >
            {isFetchingNextPage && hasNextPage && (
              <HStack>
                <Spinner />
                <Text>Fetching older messages...</Text>
              </HStack>
            )}
            {messages.map((message: Message, index: number) => (
              <>
                {(index === 0 ||
                  messages[index - 1].timeStamp.getDate() !==
                    message.timeStamp.getDate()) && (
                  <Box
                    bg="#F2F0F5"
                    p="2px"
                    pl="6px"
                    pr="6px"
                    borderRadius="4px"
                  >
                    <Text color="textMain.300" fontSize="11px">
                      {message.timeStamp.getDate()}{' '}
                      {getMonthName(message.timeStamp)}
                      {message.timeStamp.getFullYear() !==
                      new Date().getFullYear()
                        ? ' ' + message.timeStamp.getFullYear()
                        : ''}
                    </Text>
                  </Box>
                )}
                <ChatBubble
                  gMapsApiKey={gMapsApiKey}
                  chatType={chatItem.type}
                  ref={index == 0 ? oldestMessage : null}
                  showTime={
                    index === 0 ||
                    messages[index - 1].timeStamp.getDate() !==
                      message.timeStamp.getDate() ||
                    message.timeStamp.getTime() -
                      messages[index - 1].timeStamp.getTime() >
                      1000 * 60 * 10
                  }
                  message={message}
                  showUserInfo={false}
                  onMessageDelete={deleteForAll => {
                    if (onMessageDelete) {
                      onMessageDelete(message, deleteForAll);
                    }
                  }}
                />
              </>
            ))}
            {/* {typing && <Text fontStyle="italic">Typing...</Text>} */}
          </VStack>
          <div ref={elementRef} />
        </ScrollArea>
      ) : (
        <Center justifyContent="center" w="full">
          <VStack spacing={3}>
            <AvatarGroup size="md" max={2}>
              <Avatar src={contactImageUrl} name={contactName} />
              <Avatar
                src={user?.imageLink}
                name={user?.displayName ?? user?.email ?? user?.userId}
              />
            </AvatarGroup>
            <Text>Start your conversation with</Text>
            <Text fontWeight="bold">{contactName}</Text>
          </VStack>
        </Center>
      )}
    </Container>
  );
}

export default ChatWindow;

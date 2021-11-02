import { Container, HStack, useColorModeValue as mode } from '@chakra-ui/react';
import React from 'react';
import ChatWindowWired from '../../components/ChatWindow/ChatWindowWired';
import SidebarWired from '../../components/Sidebar/SidebarWired';
import FeatureTabsWired from '../../components/FeatureTabs/FeatureTabsWired';

const FullViewApp = () => {
  return (
    <Container
      maxW="100vw"
      h="100vh"
      overflowX="hidden"
      overflowY="hidden"
      padding={2}
      backgroundColor={mode('background.light', 'background.dark')}
    >
      <HStack w="full" h="full" display="flex" flexDirection="row">
        <FeatureTabsWired />
        <SidebarWired />
        <ChatWindowWired />
      </HStack>
    </Container>
  );
};

export default FullViewApp;

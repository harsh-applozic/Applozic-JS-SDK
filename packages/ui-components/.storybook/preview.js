import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import theme from "../src/theme";
import { useEffect, useState } from "react";
import {
  ProvideApplozicClient,
  useApplozicClient,
} from "../src/providers/useApplozicClient";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const applozicQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    },
  },
});

export const parameters = {
  // layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "lightning",
      // Array of plain string values or MenuItem shape (see below)
      items: ["light", "dark"],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};

const StoryComponent = ({ StoryFn, context }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  useEffect(() => {
    if (colorMode !== context.globals.theme) {
      toggleColorMode();
    }
  }, [context.globals.theme]);

  return <StoryFn />;
};

const withChakra = (StoryFn, context) => {
  return (
    <QueryClientProvider client={applozicQueryClient}>
      <ChakraProvider theme={theme}>
        <StoryComponent StoryFn={StoryFn} context={context} />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export const decorators = [withChakra];

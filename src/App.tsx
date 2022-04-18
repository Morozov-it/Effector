import * as React from "react";
import { ChakraProvider, Box, theme, Text } from "@chakra-ui/react";
import TopBar from "./components/TopBar";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import { useStoreHook } from "./hooks/useStoreHook";
import Spiner from "./components/Spiner";


export function App() {
  const { loading, error } = useStoreHook()
  return (
    <ChakraProvider theme={theme}>
      {loading
        ? <Spiner />
        :<Box
          maxWidth="8xl"
          margin="auto"
          p={5}>
          <TopBar />
          <TodoList />
          <TodoAdd />
          {error && <Text>{error}</Text>}
        </Box>
      }
    </ChakraProvider>
  );
}

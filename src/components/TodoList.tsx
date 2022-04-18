import * as React from "react";
import { Button, Input, Flex, Checkbox, Heading } from "@chakra-ui/react";

//хук для получения данных store
import { useStore } from "effector-react"
//импорт самого store
import $store, { removeTodo, updateTodo, toggleTodo } from '../store'


function TodoListItems() {
  //получение store
  const store = useStore($store)

  return (
    <>
      {store.todos.map((todo) => (
        <Flex
          style={{opacity: todo.done ? '0.5' : '1'}}
          pt={2}
          key={todo.id}>
          <Checkbox
            onChange={() => toggleTodo(todo.id)}
            checked={todo.done} />
          <Input
            mx={2}
            onChange={(e) => updateTodo({ id: todo.id, text: e.target.value })}
            value={todo.text} />
          <Button
            onClick={() => removeTodo(todo.id)}
            >Delete</Button>
        </Flex>
      ))}
    </>
  );
}

function TodoList() {
  return (
    <>
      <Heading>Todo List</Heading>
      <TodoListItems />
    </>
  );
}

export default TodoList;

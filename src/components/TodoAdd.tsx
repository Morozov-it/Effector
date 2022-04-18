import * as React from "react";
import { Button, Input, Grid } from "@chakra-ui/react";

//хук для получения данных store
import { useStore } from "effector-react"
//импорт самого store
import $store, { addTodo, setNewTodo } from '../store'

function TodoAdd() {
  //получение полей store
  const store = useStore($store)

  return (
    <Grid pt={2} templateColumns="5fr 1fr" columnGap="3">
      <Input
        value={store.newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New todo" />
      <Button
        onClick={() => addTodo()}
        >Add Todo</Button>
    </Grid>
  );
}

export default TodoAdd;

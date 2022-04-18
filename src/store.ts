import { createStore, createEvent, createEffect } from 'effector'

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

// Standard interface and functions
const updateOneTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

const toggleOneTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const removeOneTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const addTodoToList = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

//Effector state implementation
//модель хранилища
type Store = {
  todos: Todo[],
  newTodo: string,
  loading: boolean,
  error: string | null,
}

//синхронные события
export const setNewTodo = createEvent<string>()
export const addTodo = createEvent()
export const updateTodo = createEvent<{ id: number, text: string }>()
export const toggleTodo = createEvent<number>()
export const removeTodo = createEvent<number>()

//асинхронные действия
export const loadTodos = createEffect(async (url: string) => {
  const req = await fetch(url)
  return req.json()
})

//хранилище
export default createStore<Store>({
  //исходное состояние
  todos: [],
  newTodo: '',
  loading: false,
  error: null
})
  //actions
  .on(setNewTodo, (state, newTodo) => ({
    ...state,
    newTodo
  }))
  .on(addTodo, (state) => ({
    ...state,
    newTodo: '',
    todos: addTodoToList(state.todos, state.newTodo)
  }))
  .on(updateTodo, (state, { id, text }) => ({
    ...state,
    todos: updateOneTodo(state.todos, id, text)
  }))
  .on(toggleTodo, (state, id) => ({
    ...state,
    todos: toggleOneTodo(state.todos, id)
  }))
  .on(removeTodo, (state, id) => ({
    ...state,
    todos: removeOneTodo(state.todos, id)
  }))
  //асинхронные слушатели
  .on(loadTodos.doneData, (state, todos) => ({
    ...state,
    todos
  }))
  .on(loadTodos.pending, (state, loading) => ({
    ...state,
    loading
  }))
  .on(loadTodos.failData, (state, error) => ({
    ...state,
    error: error.message
  }));

import {createStore, createEvent} from 'effector'

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

// Standard interface and functions
const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const removeTodo = (todos: Todo[], id: number): Todo[] =>
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
  newTodo: string
}

//события
const setNewTodo = createEvent<string>()
const addTodo = createEvent()

//хранилище
const store = createStore<Store>({
  //исходное состояние
  todos: [],
  newTodo: ''
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
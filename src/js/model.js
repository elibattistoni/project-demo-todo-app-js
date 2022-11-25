// This module contains the code related to the state of the app
import { RES_PER_PAGE } from "./config";

/**
 * State of the application
 */
export const state = {
  activeTodo: {},
  todos: [],
  todosOnPage: [],
  resultsPerPage: RES_PER_PAGE,
  page: 1,
  totPages: 1,
};

/**
 * Function that persists in local storage all todos in state
 */
const persistTodo = function () {
  localStorage.setItem("todos", JSON.stringify(state.todos));
};

/**
 *
 * @param {*} data
 */
export const uploadTodo = function (data) {
  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const todo = {
    title: data["form-todo-title"],
    description: data["form-todo-descr"],
    status: data["form-todo-status"].split("_").join(" ").toUpperCase(),
    deadline: data["form-todo-deadline"],
    created: today,
    id: date.toLocaleString().replace(/\W/g, ""),
  };
  state.activeTodo = todo;
  // state.todos.push(todo);
  state.todos.unshift(todo); // add at beginning of array
  state.totPages = Math.ceil(state.todos.length / state.resultsPerPage);
  persistTodo();
};

export const getPageTodo = function (todoId) {
  const todosByPage = [];
  for (let i = 0; i < state.todos.length; i += state.resultsPerPage) {
    todosByPage.push(state.todos.slice(i, i + state.resultsPerPage));
  }
  // console.log("todosByPage", todosByPage);
  const todoPresence = todosByPage.map((tt) =>
    tt.findIndex((t) => t.id === todoId)
  );
  // console.log("todoPresence", todoPresence);
  const max = Math.max(...todoPresence);
  // console.log("max", max);
  const index = todoPresence.indexOf(max);
  // console.log("index", index);
  return index + 1;
};

export const setActiveTodo = function (todoId) {
  // if (state.todos.length === 0) return;
  state.activeTodo = state.todos.filter((t) => t.id === todoId)[0];
};

export const setLastActiveTodo = function () {
  if (state.todos.length === 0) return;
  const lastId = state.todos.at(-1).id;
  return lastId;
};

export const updateActiveTodo = function (updatedData) {
  const updatedTodo = {
    title: updatedData["form-todo-title"],
    description: updatedData["form-todo-descr"],
    status: updatedData["form-todo-status"].split("_").join(" ").toUpperCase(),
    deadline: updatedData["form-todo-deadline"],
    created: updatedData["created"],
    id: updatedData["id"],
  };
  // set current active todo to the updated todo
  state.activeTodo = updatedTodo;
  // remove the todo with the same id from the list
  const newTodos = state.todos.filter((t) => t.id !== updatedTodo.id);
  // add the updated todo
  // newTodos.push(updatedTodo);
  newTodos.unshift(updatedTodo); // append at the beginning of the array
  // save to state
  state.todos = newTodos;
  // overwrite the todos in local storage
  localStorage.setItem("todos", JSON.stringify(state.todos));
};

/**
 * Function that deletes all the todos from the local storage
 */
export const clearAllTodos = function () {
  localStorage.clear("todos");
  state.activeTodo = {};
  state.todos = [];
  state.todosOnPage = [];
  state.resultsPerPage = RES_PER_PAGE;
  state.page = 1;
};

export const clearSingleTodo = function (todoId) {
  const newTodos = state.todos.filter((t) => t.id !== todoId);
  state.todos = newTodos;
  state.activeTodo = state.todos[state.todos.length - 1];
  localStorage.setItem("todos", JSON.stringify(state.todos));
};

export const getTodosPage = function (page = state.page) {
  state.page = page;
  const start = (page - 1) * state.resultsPerPage;
  const end = page * state.resultsPerPage;
  state.todosOnPage = [...state.todos];
  return state.todosOnPage.slice(start, end);
};

export const sortTodos = function (direction) {
  state.todos.sort((a, b) => {
    const dateA = new Date(a.deadline);
    const dateB = new Date(b.deadline);
    if (direction === "down") return dateB - dateA;
    if (direction === "up") return dateA - dateB;
  });
  state.activeTodo = state.todos[0];
  state.page = 1;
  // overwrite the todos in local storage
  localStorage.setItem("todos", JSON.stringify(state.todos));
};

// export const state = {
//   activeTodo: {},
//   todos: [],
//   todosOnPage: [],
//   resultsPerPage: RES_PER_PAGE,
//   page: 1,
//   totPages: 1,
// };
const init = function () {
  const storage = localStorage.getItem("todos");
  if (storage) state.todos = JSON.parse(storage);
};

init();

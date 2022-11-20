// This module contains the code related to the state of the app
import { RES_PER_PAGE } from "./config";

/**
 * State of the application
 */
export const state = {
  todoActive: {},
  todos: [],
  todosOnPage: [],
  resultsPerPage: RES_PER_PAGE,
  page: 1,
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
  const todo = {
    title: data["form-todo-title"],
    description: data["form-todo-descr"],
    status: data["form-todo-status"].split("_").join(" ").toUpperCase(),
    deadline: data["form-todo-deadline"],
    created: new Date().toLocaleDateString(),
    id: new Date().toLocaleString().replace(/\W/g, ""),
  };
  state.todoActive = todo;
  state.todos.push(todo);
  persistTodo();
};

export const setActiveTodo = function (todoId) {
  // if (state.todos.length === 0) return;
  state.todoActive = state.todos.filter((t) => t.id === todoId)[0];
};

export const setLastActiveTodo = function () {
  if (state.todos.length === 0) return;
  const lastId = state.todos.at(-1).id;
  return lastId;
};

export const updateActiveTodo = function (updatedTodo) {
  // set current active todo to the updated todo
  state.todoActive = updatedTodo;
  // remove the todo with the same id from the list
  const newTodos = state.todos.filter((t) => t.id !== updatedTodo.id);
  // add the updated todo
  newTodos.push(updatedTodo);
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
  state.todoActive = {};
  state.todos = [];
  state.todosOnPage = [];
  state.resultsPerPage = RES_PER_PAGE;
  state.page = 1;
};

export const clearSingleTodo = function (todoId) {
  const newTodos = state.todos.filter((t) => t.id !== todoId);
  state.todos = newTodos;
  state.todoActive = state.todos[state.todos.length - 1];
  localStorage.setItem("todos", JSON.stringify(state.todos));
};

const init = function () {
  const storage = localStorage.getItem("todos");
  if (storage) state.todos = JSON.parse(storage);
};

init();

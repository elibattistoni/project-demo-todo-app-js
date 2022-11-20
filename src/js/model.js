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

/**
 * Function that persists in local storage all todos in state
 */
const persistTodo = function () {
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

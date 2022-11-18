// This module contains the code related to the state of the app
import { RES_PER_PAGE } from "./config";

/**
 * State of the application
 */
export const state = {
  todo_active: {},
  todos_all: [],
  todos_list_page: [],
  resultsPerPage: RES_PER_PAGE,
  page: 1,
};

/**
 * Function that persists in local storage all todos in state
 */
const persistTodo = function () {
  localStorage.setItem("todos", JSON.stringify(state.todos_all));
};

/**
 * Function that deletes all the todos from the local storage
 */
export const clearTodos = function () {
  localStorage.clear("todos");
};

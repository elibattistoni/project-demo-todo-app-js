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

export const uploadTodo = function (data) {
  const todaytime = new Date().toLocaleString();
  const todo = {
    title: data["form-todo-title"],
    deadline: data["form-todo-descr"],
    deadline: data["form-todo-status"],
    deadline: data["form-todo-deadline"], //"2022-11-21"
    created: todaytime,
    id: todaytime.replace(/\W/g, ""),
  };
  state.todo_active = todo;
  state.todos_all.push(todo);
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

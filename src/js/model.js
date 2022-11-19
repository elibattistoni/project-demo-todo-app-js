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
  const todo = {
    title: data["form-todo-title"],
    description: data["form-todo-descr"],
    status: data["form-todo-status"].split("_").join(" ").toUpperCase(),
    deadline: data["form-todo-deadline"], //"2022-11-21"
    created: new Date().toLocaleDateString(),
    id: new Date().toLocaleString().replace(/\W/g, ""),
  };
  state.todo_active = todo;
  state.todos_all.push(todo);
  persistTodo();
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

const init = function () {
  const storage = localStorage.getItem("todos");
  if (storage) state.todos_all = JSON.parse(storage);
};

init();

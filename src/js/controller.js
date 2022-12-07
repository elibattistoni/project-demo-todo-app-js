// This is the main module that controls the application and the communication between the views and the model
// following the MVC pattern
import * as model from "./model.js";
import "core-js/stable";

import { MODAL_CLOSE_SEC } from "./config.js";
import addTodoView from "./views/addTodoView.js";
import editTodoView from "./views/editTodoView.js";
import detailsTodoView from "./views/detailsTodoView.js";
import deleteTodoView from "./views/deleteTodoView.js";
import todosListView from "./views/todosListView.js";
import paginationView from "./views/paginationView.js";
import sortView from "./views/sortView.js";

/// THIS IS OKKKKKK
const controlRenderDetails = function () {
  let id = window.location.hash.slice(1);
  if (!id) id = model.setLastActiveTodo();
  if (id) {
    model.setActiveTodo(id);
    detailsTodoView.renderDetails(model.state.activeTodo);
  } else {
    detailsTodoView.renderSplash();
  }
  todosListView.updateList(model.getTodosPage());
};

/// THIS IS OKKKKKK
const controlAddTodo = function (data) {
  // Upload new TODO
  model.uploadTodo(data);

  // Display success Message
  addTodoView.renderMessage();

  const id = model.state.activeTodo.id;

  // Change ID in URL
  window.history.pushState(null, "", `#${id}`);

  // Render new TODO in container details
  detailsTodoView.renderDetails(model.state.activeTodo);

  // set page active todo
  model.setPageActiveTodo(id);

  todosListView.renderList(model.getTodosPage());

  paginationView.renderPageButtons(model.state);

  if (model.state.todos.length > 1) sortView.renderSortButton();

  // Close window message if not close yet
  setTimeout(function () {
    addTodoView.closeMessage();
  }, MODAL_CLOSE_SEC * 1000);
};

/// THIS IS OKKKKKK
const controlDelete = function (all) {
  all
    ? model.clearAllTodos()
    : model.clearSingleTodo(model.state.activeTodo.id); // this sets also a new active todo

  const id = model.state.activeTodo.id; // undefined if cleared all

  if (all || (!all && model.state.todos.length === 0)) {
    detailsTodoView.renderSplash();
    paginationView.removeRenderPageButtons();
  } else {
    window.history.pushState(null, "", `#${id}`);
    detailsTodoView.renderDetails(model.state.activeTodo);
    // set page active todo
    model.setPageActiveTodo(id);
    paginationView.renderPageButtons(model.state);
  }

  todosListView.renderList(model.getTodosPage());
  if (model.state.todos.length <= 1) sortView.removeSortButton();
};

/// THIS IS OKKKK
const controlEditTodo = function (updatedData) {
  model.updateActiveTodo(updatedData);

  const id = model.state.activeTodo.id;

  editTodoView.renderMessage();

  // no need to change url because it is the same
  //render details
  detailsTodoView.renderDetails(model.state.activeTodo);

  // set page active todo
  model.setPageActiveTodo(id);

  todosListView.renderList(model.getTodosPage());

  paginationView.renderPageButtons(model.state);

  // Close window message if not close yet
  setTimeout(function () {
    addTodoView.closeMessage();
  }, MODAL_CLOSE_SEC * 1000);
};

const controlRenderList = function () {
  todosListView.renderList(model.getTodosPage());
};

const controlPagination = function (goToPage) {
  todosListView.renderList(model.getTodosPage(goToPage));
  paginationView.renderPageButtons(model.state);
};

const controlRenderPagination = function () {
  paginationView.renderPageButtons(model.state);
};

const controlRenderSortButton = function () {
  if (model.state.todos.length > 1) sortView.renderSortButton();
};

const controlUpdateSortButton = function () {
  const direction = sortView.updateSortButton();
  model.sortTodos(direction);
  const id = model.state.activeTodo.id;
  // Change ID in URL
  window.history.pushState(null, "", `#${id}`);
  detailsTodoView.renderDetails(model.state.activeTodo);
  // set page active todo
  model.setPageActiveTodo(id);
  todosListView.renderList(model.getTodosPage());
  paginationView.renderPageButtons(model.state);
};

const init = function () {
  todosListView.addHandlerRender(controlRenderList);
  ////// THIS IS OKKKKKKKK
  detailsTodoView.addHandlerRender(controlRenderDetails);
  /// THIS IS OKKKKKK
  addTodoView.addHandlerNewTodo(controlAddTodo);
  /// THIS IS OKKKKK
  editTodoView.addHandlerEditTodo(controlEditTodo);
  /// THIS IS OKKKKKK
  deleteTodoView.addHandlerDelete(controlDelete);
  //// THIS IS OKKK
  paginationView.addHandlerRender(controlRenderPagination);
  paginationView.addHandlerClick(controlPagination);
  ///////
  sortView.addHandlerRender(controlRenderSortButton);
  sortView.addHandlerClick(controlUpdateSortButton);
};

init();

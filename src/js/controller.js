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

  todosListView.renderList(model.getTodosPage(model.getPageTodo(id)));

  paginationView.renderPageButtons(model.state);

  // Close window message if not close yet
  setTimeout(function () {
    addTodoView.closeMessage();
  }, MODAL_CLOSE_SEC * 1000);

  // just to try out the renderSplash
  // setTimeout(() => {
  //   detailsTodoView.renderSplash();
  //   setTimeout(() => {
  //     detailsTodoView.renderDetails(model.state.todos[3]);
  //   }, 8000);
  // }, 8000);
};

/// THIS IS OKKKKKK
const controlDelete = function (all) {
  all
    ? model.clearAllTodos()
    : model.clearSingleTodo(model.state.activeTodo.id);

  if (all) {
    detailsTodoView.renderSplash();
    paginationView.removeRenderPageButtons();
  } else {
    if (model.state.todos.length > 0) {
      window.history.pushState(null, "", `#${model.state.activeTodo.id}`);
      detailsTodoView.renderDetails(model.state.activeTodo);
    } else {
      detailsTodoView.renderSplash();
      paginationView.removeRenderPageButtons();
    }
  }
  todosListView.renderList(model.getTodosPage());
};

/// THIS IS OKKKK
const controlEditTodo = function (updatedData) {
  model.updateActiveTodo(updatedData);

  const id = model.state.activeTodo.id;

  editTodoView.renderMessage();

  // no need to change url because it is the same
  //render details
  detailsTodoView.renderDetails(model.state.activeTodo);

  todosListView.renderList(model.getTodosPage(model.getPageTodo(id)));

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
  ////
  paginationView.addHandlerRender(controlRenderPagination);
  paginationView.addHandlerClick(controlPagination);
};

init();

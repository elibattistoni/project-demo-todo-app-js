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

/// THIS IS OKKKKKK
const controlRenderDetails = function () {
  let id = window.location.hash.slice(1);
  if (!id) id = model.setLastActiveTodo();
  if (id) {
    model.setActiveTodo(id);
    detailsTodoView.renderDetails(model.state.todoActive);
  } else {
    detailsTodoView.renderSplash();
  }

  // TODO CHANGE WITH UPDATE
  // console.log(model.getTodosPage()); // TODO REMOVE
  todosListView.updateList(model.getTodosPage());
};

/// THIS IS OKKKKKK
const controlAddTodo = function (data) {
  // Upload new TODO
  model.uploadTodo(data);

  // Display success Message
  addTodoView.renderMessage();

  // Change ID in URL
  window.history.pushState(null, "", `#${model.state.todoActive.id}`);

  // Render new TODO in container details
  detailsTodoView.renderDetails(model.state.todoActive);
  // console.log(model.state);

  todosListView.renderList(model.getTodosPage());

  // Close window message if not close yet
  setTimeout(function () {
    addTodoView.closeMessage();
  }, MODAL_CLOSE_SEC * 1000);

  // console.log(data);
  // console.log(model.state);

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
    : model.clearSingleTodo(model.state.todoActive.id);

  if (all) {
    detailsTodoView.renderSplash();
  } else {
    if (model.state.todos.length > 0) {
      window.history.pushState(null, "", `#${model.state.todoActive.id}`);
      detailsTodoView.renderDetails(model.state.todoActive);
    } else {
      detailsTodoView.renderSplash();
    }
  }
  todosListView.renderList(model.getTodosPage());
};

/// THIS IS OKKKK
const controlEditTodo = function (updatedData) {
  model.updateActiveTodo(updatedData);

  editTodoView.renderMessage();

  // no need to change url because it is the same
  //render details
  detailsTodoView.renderDetails(model.state.todoActive);

  todosListView.renderList(model.getTodosPage());

  // Close window message if not close yet
  setTimeout(function () {
    addTodoView.closeMessage();
  }, MODAL_CLOSE_SEC * 1000);
};

const init = function () {
  ////// THIS IS OKKKKKKKK
  detailsTodoView.addHandlerRender(controlRenderDetails);
  /// THIS IS OKKKKKK
  addTodoView.addHandlerNewTodo(controlAddTodo);
  /// THIS IS OKKKKK
  editTodoView.addHandlerEditTodo(controlEditTodo);
  /// THIS IS OKKKKKK
  deleteTodoView.addHandlerDelete(controlDelete);
  ////
};

init();

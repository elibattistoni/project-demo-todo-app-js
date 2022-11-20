// This is the main module that controls the application and the communication between the views and the model
// following the MVC pattern
import * as model from "./model.js";
import "core-js/stable";

import addEditTodoView from "./views/addEditTodoView.js";
import detailsTodoView from "./views/detailsTodoView.js";
import deleteTodoView from "./views/deleteTodoView.js";
import { MODAL_CLOSE_SEC } from "./config.js";

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
};

/// THIS IS OKKKKKK
const controlAddTodo = function (newTodo) {
  // Upload new TODO
  model.uploadTodo(newTodo);

  // Display success Message
  addEditTodoView.renderMessage();

  // Change ID in URL
  window.history.pushState(null, "", `#${model.state.todoActive.id}`);

  // Render new TODO in container details
  detailsTodoView.renderDetails(model.state.todoActive);
  // console.log(model.state);

  // Close window message if not close yet
  setTimeout(function () {
    addEditTodoView.closeMessage();
  }, MODAL_CLOSE_SEC * 1000);

  // console.log(newTodo);
  // console.log(model.state);

  // just to try out the renderSplash
  // setTimeout(() => {
  //   detailsTodoView.renderSplash();
  //   setTimeout(() => {
  //     detailsTodoView.renderDetails(model.state.todos[3]);
  //   }, 8000);
  // }, 8000);
};

const controlEditTodo = function () {};

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
};

// const controlEdit = function (updatedTodo) {
//   // console.log("updating!!!");
//   // console.log(model.state);
//   // model.updateActiveTodo(updatedTodo);
//   // console.log(model.state);
//   // detailsTodoView.renderDetails(model.state.todoActive);
// };

const init = function () {
  ////// THIS IS OKKKKKKKK
  detailsTodoView.addHandlerRender(controlRenderDetails);
  /// THIS IS OKKKKKK
  addEditTodoView.addHandlerNewTodo(controlAddTodo);
  //
  addEditTodoView.addHandlerEditTodo(controlEditTodo);
  /// THIS IS OKKKKKK
  deleteTodoView.addHandlerDelete(controlDelete);
};

init();

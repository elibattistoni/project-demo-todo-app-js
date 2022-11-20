// This is the main module that controls the application and the communication between the views and the model
// following the MVC pattern
import * as model from "./model.js";
import "core-js/stable";

import addTodoView from "./views/addTodoView.js";
import detailsTodoView from "./views/detailsTodoView.js";
import deleteTodoView from "./views/deleteTodoView.js";
import { MODAL_CLOSE_SEC } from "./config.js";

// Render new TODO in container list todo (questo da fare in un altro controller)

const controlAddTodo = function (newTodo) {
  // Upload new TODO
  model.uploadTodo(newTodo);

  // Display success Message
  addTodoView.renderMessage();

  // Change ID in URL
  window.history.pushState(null, "", `#${model.state.todoActive.id}`);

  // Render new TODO in container details
  detailsTodoView.renderDetails(model.state.todoActive);
  // console.log(model.state);

  // Close window message if not close yet
  setTimeout(function () {
    addTodoView.closeMessage();
  }, MODAL_CLOSE_SEC * 1000);

  console.log(newTodo);
  console.log(model.state);

  // just to try out the renderSplash
  // setTimeout(() => {
  //   detailsTodoView.renderSplash();
  //   setTimeout(() => {
  //     detailsTodoView.renderDetails(model.state.todos[3]);
  //   }, 8000);
  // }, 8000);
};

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

const init = function () {
  addTodoView.addHandlerNewTodo(controlAddTodo);
  deleteTodoView.addHandlerDelete(controlDelete);
};

init();

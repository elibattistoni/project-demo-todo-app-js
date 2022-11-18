// This is the main module that controls the application and the communication between the views and the model
// following the MVC pattern
import * as model from "./model.js";
import "core-js/stable";

import addTodoView from "./views/addTodoView.js";
import { MODAL_CLOSE_SEC } from "./config.js";

const controlAddTodo = function (newTodo) {
  // Upload new TODO
  model.uploadTodo(newTodo);
  console.log(newTodo);

  // Display success Message
  addTodoView.renderMessage();

  // Change ID in URL
  window.history.pushState(null, "", `#${model.state.todo_active.id}`);

  // Render new TODO in container details
  // Render new TODO in container list todo
  // Close window message if not close yet
  setTimeout(function () {
    addTodoView.closeMessage();
  }, MODAL_CLOSE_SEC * 1000);
};

const init = function () {
  addTodoView.addHandlerNewTodo(controlAddTodo);
};

init();

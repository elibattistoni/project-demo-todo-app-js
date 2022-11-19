import { clearTodos } from "..model.js";

class ResetTodoView {
  _btnReset = document.querySelector(".js_btn_reset");

  constructor() {
    this._addHandlerResetAll();
  }

  addHandlerResetAll() {
    // NB view and model cannot dpesk directly!!!
    this._btnReset.addEventListener("click", clearTodos);
  }
}

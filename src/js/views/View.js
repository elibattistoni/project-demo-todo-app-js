// This is the main view, the parent view of all the other ones
export default class View {
  _overlay = document.querySelector(".overlay");
  _windowMessage = document.querySelector(".modal-message");

  _clear(element) {
    element.innerHTML = "";
  }

  _renderForm(element, markup) {
    this[element].insertAdjacentHTML("afterbegin", markup);
  }

  _openForm(element, markup) {
    this._renderForm(element, markup);
    this._windowForm.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
  }

  _closeOverlay() {
    this._overlay.classList.add("hidden");
  }

  _closeForm(clear = true) {
    this._windowForm.classList.add("hidden");
    if (clear) this._parentElement.reset(); // empty fields
  }

  _closeFormManually(clear = true) {
    this._closeForm(clear);
    this._closeOverlay();
  }

  _openMessage() {
    this._windowMessage.classList.remove("hidden");
  }

  renderMessage() {
    this._closeForm(true);
    this._openMessage();
    this._windowMessage.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkupMessage()
    );
  }

  closeMessage() {
    this._windowMessage.classList.add("hidden");
    this._closeOverlay();
  }

  _focusOnVisible(element) {
    new IntersectionObserver((entries, observer) => {
      const [entry] = entries;
      if (entry.isIntersecting && entry.intersectionRatio === 1) {
        // setTimeout(() => entry.target.focus(), 50); // this is necessary if on the modal window you have the transition of 0.5s
        entry.target.focus();
        observer.unobserve(entry.target);
      }
    }).observe(element);
  }
}

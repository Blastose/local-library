function Book(title, author, numberOfPages, read) {
  this.title = title,
  this.author = author,
  this.numberOfPages = numberOfPages,
  this.read = read,
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.numberOfPages} pages`;
  }
}

function Library() {
  this.books = [];
}

Library.prototype.addBookToLibrary = function(book) {
  this.books.push(book);
}

Library.prototype.printBooks = function() {
  this.books.forEach((book, index) => {
    console.log(`Book ${index + 1}: ${book.info()}`);
  });
}

Library.prototype.getBook = function(index) {
  return this.books[index];
}

Library.prototype.removeBook = function(index) {
  this.books.splice(index, 1);
}

function DOM() {
  this.modal = document.querySelector('.modal');
  this.bookList = document.querySelector('.book-list');
}

DOM.prototype.showModal = function() {
  this.modal.classList.remove('modal-hide');
  this.modal.classList.add('modal-show');
}

DOM.prototype.hideModal = function() {
  this.modal.classList.remove('modal-show');
  this.modal.classList.add('modal-hide');
}

DOM.prototype.clearBookList = function() {
  while (this.bookList.firstChild) {
    this.bookList.removeChild(this.bookList.lastChild);
  }
}

DOM.prototype.displayBookList = function(library) {
  this.clearBookList();
  library.books.forEach((book, index) => {
    const bookCard = this.createBookCard(book, index, library);
    this.bookList.appendChild(bookCard);
  });
}

DOM.prototype.createBookCard = function(book, id, library) {
  const divBookCard = createElementWithClass("div", "book-card");
  const divHighlight = createElementWithClass("div", "book-card-highlight");
  const divBookInfo = createElementWithClass("div", "book-info");
  const divBookTitle = createElementWithClass("div", "book-title");
  const divBookAuthor = createElementWithClass("div", "book-author");
  const divBookPages = createElementWithClass("div", "book-pages");

  const divBookOptions = createElementWithClass("div", "book-options");
  const divBookReadStatus = createElementWithClass("div", "book-read-status");
  const labelToggleRead = document.createElement("label");
  const buttonDeleteBook = createElementWithClass("button", "delete-book");
  buttonDeleteBook.textContent = "Delete";
  buttonDeleteBook.setAttribute("data-book-id", `${id}`);

  buttonDeleteBook.addEventListener('click', (e) => {
    library.removeBook(e.currentTarget.dataset["bookId"]);
    this.displayBookList(library);
  });

  labelToggleRead.setAttribute("for", `toggle-read-${id}`);
  labelToggleRead.textContent = "Read?";

  const inputCheckboxRead = document.createElement("input");
  inputCheckboxRead.setAttribute("type", "checkbox");
  inputCheckboxRead.setAttribute("id", `toggle-read-${id}`);
  inputCheckboxRead.checked = book.read;
  inputCheckboxRead.addEventListener('change', () => {
    library.getBook(id).read = inputCheckboxRead.checked;
  });

  divBookCard.setAttribute("id", `book-${id}`);
  divBookCard.appendChild(divHighlight);
  divBookCard.appendChild(divBookInfo);
  divBookCard.appendChild(divBookOptions);

  divBookInfo.appendChild(divBookTitle);
  divBookInfo.appendChild(divBookAuthor);
  divBookInfo.appendChild(divBookPages);

  divBookOptions.appendChild(divBookReadStatus);
  divBookOptions.appendChild(buttonDeleteBook);
  divBookReadStatus.appendChild(labelToggleRead);
  divBookReadStatus.appendChild(inputCheckboxRead);

  divBookTitle.textContent = `${book.title}`;
  divBookAuthor.textContent = `by ${book.author}`;
  divBookPages.textContent = `${book.numberOfPages} pages`;

  return divBookCard;
}

function createElementWithClass(elementType, elementClass) {
  const element = document.createElement(elementType);
  element.classList.add(elementClass);
  return element;
}

function addBookFromModal() {
  const modalBookTitle = document.querySelector('#modal-book-title');
  const modalBookAuthor = document.querySelector('#modal-book-author');
  const modalBookPages = document.querySelector('#modal-book-pages');

  const book = new Book(modalBookTitle.value, modalBookAuthor.value, modalBookPages.value, false);
  modalBookTitle.value = "";
  modalBookAuthor.value = "";
  modalBookPages.value = "";

  library.addBookToLibrary(book);
  dom.displayBookList(library);
  dom.hideModal();
}

const dom = new DOM();
const library = new Library();

const addBookButton = document.querySelector('.add-book');
addBookButton.addEventListener('click', () => {
  dom.showModal();
});

const modalContainer = document.querySelector('.modal-container');

modalContainer.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    dom.hideModal();
  }
});

const modalCancelButton = document.querySelector('.cancel-button');
modalCancelButton.addEventListener('click', () => {
  dom.hideModal();
});

const modalAddButtion = document.querySelector('.add-button');
modalAddButtion.addEventListener('click', () => {
  addBookFromModal();
});

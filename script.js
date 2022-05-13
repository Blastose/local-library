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

function createBookCard(book) {
  const div = document.createElement("div");
  div.textContent = book.info();
  div.classList.add("book-card");

  return div;
}

const library = new Library();

const bookList = document.querySelector(".book-list");

const addBookButton = document.querySelector('.add-book');
addBookButton.addEventListener('click', () => {
  const book = new Book("The Hobbit", "J.R.R. Tolkien", Math.floor(Math.random() * 200) + 200);
  library.addBookToLibrary(book);

  bookList.appendChild(createBookCard(book));
});

/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class listBooks {
  static getBooks() {
    let books = [];
    if (localStorage.getItem('books') != null) { books = JSON.parse(localStorage.getItem('books')); }
    return books;
  }

  static addBook(book) {
    const books = listBooks.getBooks();
    const arr = Array.from(books);
    arr.push(book);
    localStorage.setItem('books', JSON.stringify(arr));
    this.addBookDOM(book);
  }

  static addBookDOM(book) {
    const newBook = document.createElement('tr');
    newBook.setAttribute('class', 'book');
    document.querySelector('#list-books').append(newBook);

    const title = document.createElement('p');
    title.setAttribute('class', 'title');
    const txtTitle = document.createTextNode(book.title);
    title.appendChild(txtTitle);
    newBook.appendChild(title);

    const by = document.createElement('p');
    title.setAttribute('class', 'by');
    const txtby = document.createTextNode('by');
    by.appendChild(txtby);
    newBook.appendChild(by);

    const author = document.createElement('p');
    author.setAttribute('class', 'author');
    const txtAuthor = document.createTextNode(book.author);
    author.appendChild(txtAuthor);
    newBook.appendChild(author);

    const btn = document.createElement('button');
    btn.setAttribute('class', 'btn-remove');
    const txtName = document.createTextNode('Remove');
    btn.appendChild(txtName);
    newBook.appendChild(btn);
  }

  static removeBook(target) {
    // Remove LocalStorage
    const books = listBooks.getBooks();
    const title = target.previousElementSibling.previousElementSibling.textContent;
    const author = target.previousElementSibling.previousElementSibling.textContent;
    const res = books.filter((books) => books.title !== title && books.author !== author);
    localStorage.setItem('books', JSON.stringify(res));
    // Remove DOM
    target.parentElement.remove();
  }
}

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  const newTitle = document.querySelector('#title').value;
  const newAuthor = document.querySelector('#author').value;
  const book = new Book(newTitle, newAuthor);
  listBooks.addBook(book);
});

document.querySelector('#list-books').addEventListener('click', (e) => {
  listBooks.removeBook(e.target);
});

window.addEventListener('load', (e) => {
  e.preventDefault();
  const list = listBooks.getBooks();
  list.forEach((book) => listBooks.addBookDOM(book));
});

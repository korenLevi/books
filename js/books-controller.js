'use strict';

function init() {
   
    renderBooks();
}

function renderBooks() {
    console.log('rendering');
    var books = getBooks();
    console.log(books);
    // var str = `<a href="#">Create new book</a>`
    // document.body.innerHTML += str
    var strH = getThead();
    var strHtmls = books.map(function (book) {
        return `
        <tr class="${book.id}"> 
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td><button class="book-read" onclick="onReadBook('${book.id}')">Read</button>
          <button class="book-update" onclick="onUpdateBook('${book.id}')">Update</button>  <button class="book-delete" onclick="onDeleteBook('${book.id}')">Delete</button></td>
        </tr>`
    });
    document.querySelector('.table-container').innerHTML = strH + strHtmls.join('');

}

function getThead() {
    return `<thead>
    <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Price</th>
        <th>Actions</th>
    </tr>
</thead>`;
}

function onUpdateBook(bookId) {
    showUpdateMenu(bookId);
    // updateBook();
    // renderBooks();
}

function onReadBook(bookId) {
    showDetails(bookId)
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function onAddBook() {
    addBook()
    renderBooks();
}


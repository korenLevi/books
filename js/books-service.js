'use strict';
var key = 'books';
var gTitles = ['Cracking the Coding Interview', 'The Pragmatic Programmer', 'The Art of Computer Programming', 'The Mythical Man-Month'];
var gDetails = ['Looking to land a job as a software engineer?\n Whatever your answer may be, this book is still worthwhile.', 'In this book, Andrew Hunt and Dave Thomas give the readers a series of tips on improving their programming output.\n', 'Much like with the previous entry in this list,\n getting through “The Art of Computer Programming” is a daunting task.\n Few have managed to go through the entire book consistently.\n Even fewer have taken the time to go through all the math in the first few chapters.', 'This historic book about software engineering takes the spot of the must-read book about managing a software project.'];

var gBooks;
var gId;

var gIsAddMenu = false;
var gIsUpdateMenu = false;
var isUpdateClick = false;
var isDetails = false;

var gCurrBook;
_createBooks();
// fix()
// console.log(gBooks);
function setBooks() {
    _createBooks();
}

function _createBooks() {
    var books = loadFromStorage(key);
    console.log(books);
    if (!books || !books.length) {
        books = []
        console.log('0');
        for (let i = 0; i < gTitles.length; i++) {
            var title = gTitles[i];
            books.push(_createBook(title, i))
        }
    }

    gBooks = books;

    _saveBooksToStorage();
}

function _createBook(title, i) {
    return {
        id: makeId(),
        title: title,
        price: getRandomFloatInclusive(20, 100),
        rate: 0,
        details: gDetails[i]
    }
}

function _createNewBook(title, price) {
    return {
        id: makeId(),
        title: title,
        price: price
    }
}

function getBooks() {
    var books = gBooks;
    return books;
}

function _saveBooksToStorage() {
    saveToStorage(key, gBooks);
}

function getTitles() {
    return gTitles;
}

function fix() {
    var books = loadFromStorage(key);
    localStorage.removeItem(key)
    localStorage.removeItem('loggedinUser')

}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id;
    })
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function readBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id;
    })
}

function showBookMenu() {
    clearDetails()
    console.log('0');
    gIsAddMenu = !gIsAddMenu; // true
    var elBook = document.querySelector('.add-book');
    if (gIsAddMenu) {
        elBook.style.display = 'inline'
    } else {
        elBook.style.display = 'none'
    }


}

function addBook() {
    const bookTitle = document.querySelector('.new-bookTitle');
    console.log(bookTitle.value);
    const bookPrice = document.querySelector('.new-bookPrice');
    var books = loadFromStorage(key);
    books.push(_createNewBook(bookTitle.value, bookPrice.value));
    gBooks = books;
    var elBook = document.querySelector('.add-book');
    elBook.style.display = 'none'
    gIsAddMenu = !gIsAddMenu; // false
    _saveBooksToStorage();
}

function showUpdateMenu(bookId) {
    clearDetails()
    gIsUpdateMenu = !gIsUpdateMenu;
    gId = bookId;
    var elBook = document.querySelector('.update-book');
    if (gIsUpdateMenu) {
        elBook.style.display = 'inline'
    } else {
        elBook.style.display = 'none'
    }



}

function updateBook(bookId) {
    const bookPrice = document.querySelector('.update-bookPrice');
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id;
    })
    console.log(bookPrice.value);
    gBooks[bookIdx].price = bookPrice.value;
    var elBook = document.querySelector('.update-book');
    elBook.style.display = 'none'
    isUpdateClick = !isUpdateClick;
    gIsUpdateMenu = !gIsUpdateMenu;
    _saveBooksToStorage();
}

function clickUpdate() {
    isUpdateClick = !isUpdateClick;
    updateBook(gId);
    renderBooks();

}



function showDetails(bookId) {
    clearDetails()
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gCurrBook = gBooks[bookIdx];
    var elBookDetails = document.querySelector('.details');
    elBookDetails.innerHTML = gCurrBook.details;
    document.querySelector('.rate').style.display = 'inline';
    var bookRate = gBooks[bookIdx].rate;
    document.querySelector('.numberPlace').innerHTML = bookRate;

}

function clearDetails() {

    var elBookDetails = document.querySelector('.details');
    elBookDetails.innerHTML = '';
    document.querySelector('.rate').style.display = 'none';


    var elBook = document.querySelector('.update-book').style.display = 'none';
    var elBook = document.querySelector('.add-book').style.display = 'none';
    gIsAddMenu = false;
    gIsUpdateMenu = false;

}

function subRate() {
    if (document.querySelector('.numberPlace').innerHTML == 0) return;
    var bookRate = gCurrBook.rate - 1;
    document.querySelector('.numberPlace').innerHTML = bookRate;
    gCurrBook.rate--;
    _saveBooksToStorage();
}

function addRate() {
    if (document.querySelector('.numberPlace').innerHTML == 10) return;
    var bookRate = gCurrBook.rate + 1;
    document.querySelector('.numberPlace').innerHTML = bookRate;
    gCurrBook.rate++;
    _saveBooksToStorage();
}
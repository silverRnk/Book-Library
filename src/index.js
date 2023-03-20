import Book from "./Book.js";

let bookList = [];

function addBookToList(book) {
  if(bookList.length != 0){
    bookList = [book].concat(bookList)
  }else{
    bookList = [book]
  }
}

function removeBookToList(index) {
  bookList = bookList.filter((value, i) => {
    i != index;
  });
}

function editBookFromList(book, index) {
  bookList[index] = book;
}

function updateCabinet() {
  let bookCabinet = document.getElementById("cabinet");
  /*
      case 0 < list.length < 3

      case 2 < list.length < 6

      case 6 < list.length
      */
  bookCabinet.innerHTML =
    '<div class="shelves" level="1">' +
    '<div class="book-column">' +
    '<div class="bookItem"></div>' +
    '</div></div><div class="shelves" level="2">' +
    "</div></div>";

  if (bookList.length != 0) {
    bookList.forEach((element, index) => {
      if (-1 < index && index <= 1) {
        let shelves = bookCabinet.querySelector(
          '.shelves[level="1"]'
        );
        shelves.innerHTML =
          shelves.innerHTML +
          '<div class="book-column">' +
          '<div class="bookItem"></div>' +
          "</div>";
        console.log(shelves);
      } else if (2 <= index && index <= 4) {
        let shelves = bookCabinet.querySelector(
          '.shelves[level="2"]'
        );
        shelves.innerHTML =
          shelves.innerHTML +
          '<div class="book-column">' +
          '<div class="bookItem"></div>' +
          "</div>";
      } else if (5 <= index) {
        /*
        case index + 1 % 3 == 0
        add new shelves then add new book
        else
        add new books
        */
        let shelves;
        const shelvesLevel = Math.floor((index + 1) / 3) + 1;
        if ((index + 1) % 3 == 0) {
          bookCabinet.innerHTML =
            bookCabinet.innerHTML +
            '<div class="shelves"' +
            `level=${shelvesLevel}></div>`;
          bookCabinet = document.getElementById("cabinet");
          shelves = bookCabinet.querySelector(
            `.shelves[level="${shelvesLevel}"]`
          );
          shelves.innerHTML =
            shelves.innerHTML +
            '<div class="book-column">' +
            '<div class="bookItem"></div>' +
            "</div>";
        } else {
          shelves = bookCabinet.querySelector(
            `.shelves[level="${shelvesLevel}"]`
          );
          shelves.innerHTML =
            shelves.innerHTML +
            '<div class="book-column">' +
            '<div class="bookItem"></div>' +
            "</div>";
        }
      }

      bookCabinet = document.getElementById("cabinet");
    });
  }
}

function onClickAddBook() {
  let addBookBtn = document.querySelector("#add-book");
  addBookBtn.addEventListener("click", () => {
    addBookToList(new Book("fsfs", "fsfs", 100));
    updateCabinet();
    onClickAddBook();
    console.log(bookList.length);
  });
}

onClickAddBook();

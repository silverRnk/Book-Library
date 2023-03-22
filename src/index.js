import Book from "./Book.js";

const addBookFormInputs = {
  bookTitle: document.querySelector("#title"),
  bookAuthor: document.querySelector("#author"),
  pageNo: document.querySelector("#page-no"),
  coverColor: document.querySelector("#cover-color"),
  isRead: document.querySelector("#read"),
  btnSubmit: document.querySelector("#submit"),
  btnCancel: document.querySelector("#cancel"),
};

addBookFormInputs.bookAuthor.addEventListener("click", () => {});

addBookFormInputs.btnSubmit.addEventListener("click", () => {
  let newBookItem = new Book(
    addBookFormInputs.bookTitle.value,
    addBookFormInputs.bookAuthor.value,
    addBookFormInputs.pageNo.value,
    addBookFormInputs.isRead.checked,
    addBookFormInputs.coverColor.value
  );

  console.log(newBookItem);
  addBookToList(newBookItem);
  updateCabinet();
});

addBookFormInputs.btnCancel.addEventListener("click", () => {
  let addBookForm = document.querySelector(".add-book-form");
  addBookForm.classList.toggle("hidden");
});

let bookList = [];

function addBookToList(book) {
  if (bookList.length != 0) {
    bookList = [book].concat(bookList);
  } else {
    bookList = [book];
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
  const bookElement = ({ bookTitle, author, page, coverColor }) => {
    let element =
      '<div class="book-column">' +
      '<div class="bookItem"' +
      `style=background-color:${coverColor}>` +
      `<h1>${bookTitle}</h1>` +
      `<h3>${author}</h3>` +
      `<h4>${page}</h4>` +
      "</div>" +
      "</div>";
    return element;
  };
  /*
      case 0 < list.length < 3

      case 2 < list.length < 6

      case 6 < list.length
      */
  bookCabinet.innerHTML =
    '<div class="shelves" level="1">' +
    '<div class="book-column">' +
    '<div id="add-book"></div>' +
    '</div></div><div class="shelves" level="2">' +
    "</div></div>";

  if (bookList.length != 0) {
    bookList.forEach((element, index) => {
      if (-1 < index && index <= 1) {
        let shelves = bookCabinet.querySelector(
          '.shelves[level="1"]'
        );
        shelves.innerHTML = shelves.innerHTML + bookElement(element);
        console.log(shelves);
      } else if (2 <= index && index <= 4) {
        let shelves = bookCabinet.querySelector(
          '.shelves[level="2"]'
        );
        shelves.innerHTML = shelves.innerHTML + bookElement(element);
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
            shelves.innerHTML + bookElement(element);
        } else {
          shelves = bookCabinet.querySelector(
            `.shelves[level="${shelvesLevel}"]`
          );
          shelves.innerHTML =
            shelves.innerHTML + bookElement(element);
        }
      }

      bookCabinet = document.getElementById("cabinet");
    });
  }
}

function onClickAddBook() {
  let addBookBtn = document.querySelector("#add-book");
  let addBookForm = document.querySelector(".add-book-form");
  console.log(addBookForm);
  addBookBtn.addEventListener("click", () => {
    addBookForm.classList.toggle("hidden");
  });
}

onClickAddBook();

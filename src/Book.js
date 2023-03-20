function Book(
  bookTitle = '',
  author = '',
  page = 0,
  isDoneReading = false,
  coverColor = "#ffffff"
) {
  this.bookTitle = bookTitle;
  this.author = author;
  this.page = page;
  this.isDoneReading = isDoneReading;
  this.coverColor = coverColor;
}

export default Book;

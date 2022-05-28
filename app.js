var bookName = document.getElementById("BookName");
var booklink = document.getElementById("BookLink");
var books = [];
var storedBooks = JSON.parse(localStorage.getItem("books"));

if (storedBooks != null) {
  books = storedBooks;
  displayBooks();
}

function addBook() {
  if (
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
      booklink.value
    ) &&
    bookName.value != ""
  ) {
    var book = {
      name: bookName.value,
      link: booklink.value,
    };
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
    clearForm();
  } else {
    alert("Invalid URL or Book Name");
  }
}

function displayBooks() {
  var table = "";
  for (var i = 0; i < books.length; i++) {
    table += `<tr>
                <td>${i + 1}</td>
                <td> ${books[i].name} </td>
                <td>${books[i].link} </td>
                <td><button class="btn btn-warning"
                onclick="handleVisit()"

                >visit</button></td>
                <td><button class="btn btn-danger"
                onclick="handleDelete()"
                >Deleted</button></td>
            </tr>`;
  }
  document.getElementById("myBooks").innerHTML = table;
}
function clearForm() {
  bookName.value = "";
  booklink.value = "";
}
function handleDelete() {
  var book = event.target.parentElement.parentElement;
  var bookIndex = book.rowIndex - 1;
  books.splice(bookIndex, 1);
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
}

function handleVisit() {
  var book = event.target.parentElement.parentElement;
  var bookIndex = book.rowIndex - 1;
  window.open(books[bookIndex].link);
}

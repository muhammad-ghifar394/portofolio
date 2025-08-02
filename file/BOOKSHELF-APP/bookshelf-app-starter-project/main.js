// Inisialisasi array buku
let books = JSON.parse(localStorage.getItem("books")) || [];

// Ambil elemen DOM
const bookForm = document.getElementById("bookForm");
const incompleteBookList = document.getElementById("incompleteBookList");
const completeBookList = document.getElementById("completeBookList");

// Fungsi untuk menambah buku
bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = document.getElementById("bookFormYear").value;
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  const newBook = {
    id: Date.now(),
    title,
    author,
    year: Number(year), // Pastikan year menjadi angka
    isComplete,
  };

  books.push(newBook);
  saveBooksToLocalStorage();
  renderBooks();
  bookForm.reset();
});

// Fungsi untuk menyimpan buku ke localStorage
function saveBooksToLocalStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}

// Fungsi untuk merender buku
function renderBooks() {
  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  books.forEach(book => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book-item");
    bookElement.setAttribute("data-bookid", book.id);
    bookElement.setAttribute("data-testid", "bookItem");

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;
    bookTitle.setAttribute("data-testid", "bookItemTitle");

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `Penulis: ${book.author}`;
    bookAuthor.setAttribute("data-testid", "bookItemAuthor");

    const bookYear = document.createElement("p");
    bookYear.textContent = `Tahun: ${book.year}`;
    bookYear.setAttribute("data-testid", "bookItemYear");

    const buttonContainer = document.createElement("div");

    const completeButton = document.createElement("button");
    completeButton.textContent = book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca";
    completeButton.setAttribute("data-testid", "bookItemIsCompleteButton");
    completeButton.onclick = () => toggleBookCompletion(book.id);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus buku";
    deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
    deleteButton.onclick = () => deleteBook(book.id);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit buku";
    editButton.setAttribute("data-testid", "bookItemEditButton");
    editButton.onclick = () => editBook(book.id);

    buttonContainer.append(completeButton, deleteButton, editButton);

    bookElement.append(bookTitle, bookAuthor, bookYear, buttonContainer);

    if (book.isComplete) {
      completeBookList.appendChild(bookElement);
    } else {
      incompleteBookList.appendChild(bookElement);
    }
  });
}

// Fungsi untuk mengubah status selesai dibaca
function toggleBookCompletion(bookId) {
  const book = books.find(b => b.id === bookId);
  book.isComplete = !book.isComplete;
  saveBooksToLocalStorage();
  renderBooks();
}

// Fungsi untuk menghapus buku
function deleteBook(bookId) {
  const index = books.findIndex(b => b.id === bookId);
  books.splice(index, 1);
  saveBooksToLocalStorage();
  renderBooks();
}

// Fungsi untuk mengedit buku
function editBook(bookId) {
    const book = books.find(b => b.id === bookId);
    const title = prompt("Edit Judul Buku", book.title);
    const author = prompt("Edit Penulis Buku", book.author);
    let year = prompt("Edit Tahun Buku", book.year);
  
    // Pastikan year diubah menjadi number jika valid
    year = Number(year);
    
    // Validasi agar hanya tahun yang berupa number yang diterima
    if (title && author && !isNaN(year)) {
      book.title = title;
      book.author = author;
      book.year = year; // Set nilai tahun yang sudah dikonversi ke number
      saveBooksToLocalStorage();
      renderBooks();
    } else {
      alert("Tahun harus berupa angka valid.");
    }
}

// Render buku saat halaman pertama kali dimuat
renderBooks();

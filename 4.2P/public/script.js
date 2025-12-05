const API_URL = '/api/books';

const bookForm = document.getElementById('book-form');
const formMessage = document.getElementById('form-message');
const listMessage = document.getElementById('list-message');
const tableBody = document.getElementById('book-table-body');

async function fetchBooks() {
  listMessage.textContent = 'Loading books...';
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    const books = await response.json();
    renderBooks(books);
    if (books.length === 0) {
      listMessage.textContent = 'No books found. Add your first book using the form!';
    } else {
      listMessage.textContent = '';
    }
  } catch (error) {
    console.error(error);
    listMessage.textContent = 'Error loading books from server.';
    listMessage.classList.add('error');
  }
}

function renderBooks(books) {
  tableBody.innerHTML = '';
  books.forEach((book) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.genre}</td>
      <td>${book.year}</td>
      <td>$${book.price.toFixed(2)}</td>
      <td class="actions">
        <button data-id="${book._id}" class="delete-btn">Delete</button>
      </td>
    `;

    tableBody.appendChild(tr);
  });

  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      deleteBook(id);
    });
  });
}

async function addBook(event) {
  event.preventDefault();
  formMessage.textContent = '';

  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const genre = document.getElementById('genre').value.trim();
  const year = parseInt(document.getElementById('year').value, 10);

  if (!title || !author || isNaN(price) || !genre || isNaN(year)) {
    formMessage.textContent = 'Please fill in all fields correctly.';
    formMessage.className = 'message error';
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, author, price, genre, year })
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    bookForm.reset();
    formMessage.textContent = 'Book added successfully!';
    formMessage.className = 'message success';

    fetchBooks();
  } catch (error) {
    console.error(error);
    formMessage.textContent = 'Error adding book.';
    formMessage.className = 'message error';
  }
}

async function deleteBook(id) {
  if (!confirm('Are you sure you want to delete this book?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
    fetchBooks();
  } catch (error) {
    console.error(error);
    alert('Error deleting book.');
  }
}

bookForm.addEventListener('submit', addBook);
fetchBooks();

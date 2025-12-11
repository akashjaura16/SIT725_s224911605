const statusEl = document.getElementById('status');
const tbodyEl = document.getElementById('books-tbody');
const detailsEl = document.getElementById('details-card');

async function fetchBooks() {
  try {
    setStatus('Loading books...', false);
    const res = await fetch('/api/books');
    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }
    const books = await res.json();
    renderBooksTable(books);
    if (books.length === 0) {
      setStatus('No books found in the database. Did you run seed.js?', true);
    } else {
      setStatus(`Loaded ${books.length} book(s) from MongoDB.`, false);
    }
  } catch (err) {
    console.error('Error fetching books:', err);
    setStatus('Error loading books. See console for details.', true);
  }
}

function setStatus(message, isError) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? 'red' : 'green';
}

function renderBooksTable(books) {
  tbodyEl.innerHTML = '';

  books.forEach((book) => {
    const tr = document.createElement('tr');
    tr.dataset.id = book.id || book._id;

    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.genre}</td>
      <td>${book.year}</td>
      <td>$${Number(book.price).toFixed(2)}</td>
    `;

    tr.addEventListener('click', () => {
      if (tr.dataset.id) {
        fetchBookDetails(tr.dataset.id);
      }
    });

    tbodyEl.appendChild(tr);
  });
}

async function fetchBookDetails(id) {
  try {
    detailsEl.textContent = 'Loading book details...';
    const res = await fetch(`/api/books/${encodeURIComponent(id)}`);
    if (!res.ok) {
      if (res.status === 404) {
        detailsEl.textContent = 'Book not found.';
        return;
      }
      throw new Error(`Status ${res.status}`);
    }
    const book = await res.json();
    renderBookDetails(book);
  } catch (err) {
    console.error('Error fetching book details:', err);
    detailsEl.textContent = 'Error loading book details.';
  }
}

function renderBookDetails(book) {
  detailsEl.innerHTML = `
    <p><strong>Title:</strong> ${book.title}</p>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Genre:</strong> ${book.genre}</p>
    <p><strong>Year:</strong> ${book.year}</p>
    <p><strong>ISBN:</strong> ${book.isbn}</p>
    <p><strong>Price (AUD):</strong> $${Number(book.price).toFixed(2)}</p>
  `;
}

// Initial load
fetchBooks();

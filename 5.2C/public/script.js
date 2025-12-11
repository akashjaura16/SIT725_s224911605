async function fetchBooks() {
  const res = await fetch("/api/books");
  if (!res.ok) {
    console.error("Failed to fetch books");
    return [];
  }
  return await res.json();
}

function formatPrice(price) {
  try {
    const num = parseFloat(price);
    if (isNaN(num)) return "$0.00 AUD";
    return `$${num.toFixed(2)} AUD`;
  } catch {
    return "$0.00 AUD";
  }
}

function renderBooksList(books) {
  const listEl = document.getElementById("books-list");
  listEl.innerHTML = "";

  if (!books.length) {
    listEl.innerHTML = "<p>No books found.</p>";
    return;
  }

  books.forEach((book) => {
    const card = document.createElement("article");
    card.className = "book-card";
    card.dataset.id = book._id;

    const year = book.year ? ` • ${book.year}` : "";
    const title = book.title || "Untitled";

    card.innerHTML = `
      <h3 class="book-title">${title}</h3>
      <p class="book-meta">
        <span class="badge">${book.genre || "Unknown genre"}</span>
      </p>
      <p class="book-meta">By ${book.author || "Unknown author"}${year}</p>
      <p class="price-tag">${formatPrice(book.price)}</p>
    `;

    card.addEventListener("click", () => {
      document
        .querySelectorAll(".book-card.active")
        .forEach((el) => el.classList.remove("active"));
      card.classList.add("active");
      renderBookDetail(book);
    });

    listEl.appendChild(card);
  });
}

function renderBookDetail(book) {
  const detailEl = document.getElementById("book-detail");
  detailEl.classList.remove("empty");

  detailEl.innerHTML = `
    <h3 class="detail-title">${book.title}</h3>
    <p class="detail-row">
      <span class="detail-label">Author:</span> ${book.author}
    </p>
    <p class="detail-row">
      <span class="detail-label">Year:</span> ${book.year}
    </p>
    <p class="detail-row">
      <span class="detail-label">Genre:</span> ${book.genre}
    </p>
    <p class="detail-row">
      <span class="detail-label">Price:</span> ${formatPrice(book.price)}
    </p>
    <p class="detail-row">
      <span class="detail-label">MongoDB _id:</span> ${book._id}
    </p>
  `;
}

async function init() {
  const books = await fetchBooks();
  renderBooksList(books);

  if (books.length) {
    renderBookDetail(books[0]);
    const firstCard = document.querySelector(".book-card");
    if (firstCard) firstCard.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", init);
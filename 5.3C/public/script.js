const btn = document.getElementById("getBooks");
const list = document.getElementById("bookList");
const details = document.getElementById("bookDetails");

btn.onclick = async () => {
  const res = await fetch("/api/books");
  const books = await res.json();

  list.innerHTML = "";
  details.innerHTML = "";

  books.forEach(book => {
    const li = document.createElement("li");
    li.textContent = `${book.title} - ${book.price} AUD`;

    li.onclick = async () => {
      const res = await fetch(`/api/books/${book._id}`);
      const data = await res.json();

      details.innerHTML = `
        <h3>Title: ${data.title}</h3>
        <p><strong>Author:</strong> ${data.author}</p>
        <p><strong>Year:</strong> ${data.year}</p>
        <p><strong>Genre:</strong> ${data.genre}</p>
        <p><strong>Summary:</strong> ${data.summary}</p>
        <p><strong>Price (AUD):</strong> ${data.price}</p>
      `;
    };

    list.appendChild(li);
  });
};

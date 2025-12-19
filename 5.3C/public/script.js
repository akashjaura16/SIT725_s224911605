const list = document.getElementById("bookList");
const details = document.getElementById("bookDetails");

document.getElementById("loadBooks").onclick = async () => {
  // 1️⃣ Fetch all books
  const res = await fetch("/api/books");
  const books = await res.json();

  // 2️⃣ CLEAR previous list AND details
  list.innerHTML = "";
  details.innerHTML = "";

  // 3️⃣ Render ONLY the list (title + price)
  books.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = `${book.title} - ${book.price} AUD`;

    // 4️⃣ On click → show ONLY this book's details
    li.onclick = async () => {
      const r = await fetch(`/api/books/${book._id}`);
      const b = await r.json();

      // 🔴 IMPORTANT: overwrite details, not append
      details.innerHTML = `
        <p><strong>Title:</strong> ${b.title}</p>
        <p><strong>Authors:</strong> ${b.authors}</p>
        <p><strong>Year:</strong> ${b.year}</p>
        <p><strong>Genre:</strong> ${b.genre}</p>
        <p><strong>Summary:</strong> ${b.summary}</p>
        <p><strong>Price (AUD):</strong> ${b.price}</p>
      `;
    };

    list.appendChild(li);
  });
};

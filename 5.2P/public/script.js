window.onload = async function () {
    const res = await fetch("/api/books");
    const books = await res.json();

    const list = document.getElementById("bookList");
    list.innerHTML = books.map(b => `<li>${b.title} — ${b.author}</li>`).join("");
};

document.getElementById("loadBooks").onclick = async () => {
  const res = await fetch("/api/books");
  const books = await res.json();

  const list = document.getElementById("bookList");
  list.innerHTML = "";

  books.forEach(b => {
    const price = parseFloat(b.price.$numberDecimal).toFixed(2);
    const li = document.createElement("li");
    li.textContent = `${b.title} - AUD ${price}`;
    list.appendChild(li);
  });
};

  const $ = (id) => document.getElementById(id);

  function showStatus(msg) {
    $("status").textContent = msg;
  }

  function pretty(obj) {
    try { return JSON.stringify(obj, null, 2); } catch { return String(obj); }
  }

  async function loadBooks() {
    showStatus("Loading books...");
    const r = await fetch("/api/books");
    const data = await r.json();
    showStatus(`GET /api/books → ${r.status} (count: ${data.count})`);

    const list = $("bookList");
    list.innerHTML = "";
    (data.books || []).forEach((b) => {
      const li = document.createElement("li");
      li.textContent = `${b.id}: ${b.title} — ${b.author} (${b.year}) — ${b.genre} — AUD ${b.price}`;
      list.appendChild(li);
    });
  }

  async function pingIntegrity() {
    const r = await fetch("/api/integrity-check42");
    showStatus(`GET /api/integrity-check42 → ${r.status} (expected 204)`);
  }

  $("btnLoad").addEventListener("click", () => loadBooks().catch((e) => showStatus(e.message)));
  $("btnPing").addEventListener("click", () => pingIntegrity().catch((e) => showStatus(e.message)));

  $("createForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = Object.fromEntries(fd.entries());

    // Keep UI simple: let server be source of truth for validation
    payload.year = Number(payload.year);

    const r = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await r.text();
    $("createOut").textContent = `POST /api/books → ${r.status}

${text}`;
    if (r.ok) await loadBooks();
  });

  $("updateForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const all = Object.fromEntries(fd.entries());
    const id = all.id;
    delete all.id;

    // Remove empty fields to avoid overwriting with ""
    for (const k of Object.keys(all)) {
      if (all[k] === "") delete all[k];
    }
    if (all.year !== undefined) all.year = Number(all.year);

    const r = await fetch(`/api/books/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(all),
    });

    const text = await r.text();
    $("updateOut").textContent = `PUT /api/books/${id} → ${r.status}

${text}`;
    if (r.ok) await loadBooks();
  });

  // Auto-load on page open
  loadBooks().catch(() => {});

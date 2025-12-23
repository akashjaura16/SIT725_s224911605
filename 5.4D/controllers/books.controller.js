import { Book, DEVELOPED_BY } from "../models/Book.js";

// Only these fields can be accepted from clients for writes
const ALLOWED_FIELDS = ["id", "title", "author", "year", "genre", "summary", "price"];

function getUnexpectedFields(body) {
  if (!body || typeof body !== "object") return [];
  return Object.keys(body).filter((k) => !ALLOWED_FIELDS.includes(k));
}

function pickAllowed(body) {
  const out = {};
  for (const k of ALLOWED_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(body, k)) out[k] = body[k];
  }
  return out;
}

function validationErrorsToMessage(err) {
  if (!err || !err.errors) return "Validation failed";
  const msgs = Object.values(err.errors).map((e) => e.message);
  return msgs.join("; ");
}

export async function getAllBooks(req, res) {
  try {
    const books = await Book.find({}).sort({ createdAt: 1 }).lean();
    // Convert Decimal128 in lean objects (if any slipped through)
    const cleaned = books.map((b) => ({
      ...b,
      price: b.price?.toString?.() ?? b.price,
    }));
    return res.json({
      developedBy: DEVELOPED_BY,
      count: cleaned.length,
      books: cleaned,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getBookById(req, res) {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ id });
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.json(book.toJSON());
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function createBook(req, res) {
  // 400 if unexpected fields are present
  const unexpected = getUnexpectedFields(req.body);
  if (unexpected.length) {
    return res.status(400).json({
      message: "Unexpected fields are not allowed",
      unexpected,
      allowed: ALLOWED_FIELDS,
    });
  }

  try {
    const payload = pickAllowed(req.body);

    const created = await Book.create({
      ...payload,
      developedBy: DEVELOPED_BY,
    });

    return res.status(201).json(created.toJSON());
  } catch (err) {
    // Duplicate key => 409
    if (err && err.code === 11000) {
      return res.status(409).json({
        message: "Duplicate primary key",
        field: "id",
        value: req.body?.id,
      });
    }

    // Mongoose validation => 400
    if (err && err.name === "ValidationError") {
      return res.status(400).json({
        message: validationErrorsToMessage(err),
        details: Object.fromEntries(
          Object.entries(err.errors).map(([k, v]) => [k, v.message])
        ),
      });
    }

    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateBook(req, res) {
  const { id } = req.params;

  // 400 if unexpected fields are present
  const unexpected = getUnexpectedFields(req.body);
  if (unexpected.length) {
    return res.status(400).json({
      message: "Unexpected fields are not allowed",
      unexpected,
      allowed: ALLOWED_FIELDS.filter((f) => f !== "id"), // id not updatable
    });
  }

  // id is immutable: reject if client tries to send it
  if (Object.prototype.hasOwnProperty.call(req.body || {}, "id")) {
    return res.status(400).json({
      message: "id is immutable and cannot be updated",
    });
  }

  try {
    const payload = pickAllowed(req.body);

    // Ensure id cannot be changed and developedBy cannot be changed
    delete payload.id;
    delete payload.developedBy;

    const updated = await Book.findOneAndUpdate(
      { id },
      { $set: payload },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    if (!updated) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(updated.toJSON());
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.status(400).json({
        message: validationErrorsToMessage(err),
        details: Object.fromEntries(
          Object.entries(err.errors).map(([k, v]) => [k, v.message])
        ),
      });
    }
    return res.status(500).json({ message: "Server error" });
  }
}

export const __internals = { ALLOWED_FIELDS }; // for testing/demo if needed

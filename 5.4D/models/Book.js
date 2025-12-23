import mongoose from "mongoose";

// Student ID marker (must surface in JSON or UI)
export const DEVELOPED_BY = "s224911605";

// Allowed genres (domain-appropriate)
export const ALLOWED_GENRES = [
  "Fiction",
  "Non-Fiction",
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Historical",
  "Biography",
  "Self-Help",
  "Other"
];

const currentYear = new Date().getFullYear();

const bookSchema = new mongoose.Schema(
  {
    // Primary key (immutable)
    id: {
      type: String,
      required: [true, "id is required"],
      trim: true,
      unique: true, // ✅ single source of uniqueness
      match: [
        /^b[0-9A-Za-z_-]{1,10}$/,
        "id must start with 'b' and be 2–11 chars (letters/numbers/_/-)"
      ]
    },

    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      minlength: [1, "title must be at least 1 character"],
      maxlength: [120, "title must be at most 120 characters"]
    },

    author: {
      type: String,
      required: [true, "author is required"],
      trim: true,
      minlength: [2, "author must be at least 2 characters"],
      maxlength: [80, "author must be at most 80 characters"]
    },

    year: {
      type: Number,
      required: [true, "year is required"],
      min: [1450, "year must be >= 1450"],
      max: [currentYear + 1, `year must be <= ${currentYear + 1}`],
      validate: {
        validator: Number.isInteger,
        message: "year must be an integer"
      }
    },

    genre: {
      type: String,
      required: [true, "genre is required"],
      trim: true,
      enum: {
        values: ALLOWED_GENRES,
        message: "genre must be one of the allowed values"
      }
    },

    summary: {
      type: String,
      required: [true, "summary is required"],
      trim: true,
      minlength: [10, "summary must be at least 10 characters"],
      maxlength: [1000, "summary must be at most 1000 characters"]
    },

    // Price stored as Decimal128 (AUD)
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: [true, "price is required"],
      validate: {
        validator: function (v) {
          if (v === null || v === undefined) return false;
          const n = Number(v.toString());
          return Number.isFinite(n) && n >= 0.01 && n <= 9999.99;
        },
        message: "price must be a valid AUD amount between 0.01 and 9999.99"
      }
    },

    developedBy: {
      type: String,
      required: true,
      default: DEVELOPED_BY,
      immutable: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Convert Decimal128 → string for clean JSON output
bookSchema.set("toJSON", {
  transform: (doc, ret) => {
    if (ret.price && ret.price.toString) {
      ret.price = ret.price.toString();
    }
    return ret;
  }
});

export const Book = mongoose.model("Book", bookSchema);

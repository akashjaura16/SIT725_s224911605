import mongoose from 'mongoose';

const { Schema } = mongoose;

// Book schema for SIT725 5.3C
// Includes Decimal128 for price as required.
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 0,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        // Convert Decimal128 to regular number (float) for easier use on the client
        if (ret.price != null && typeof ret.price === 'object') {
          ret.price = parseFloat(ret.price.toString());
        }
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;

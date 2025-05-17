import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    publishedDate: {
      type: Date,
    },
    genre: {
      type: String,
    },
  },
  {
    collection: 'bookLists',
  }
);

export default mongoose.models.Book || mongoose.model('Book', BookSchema);


const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Book = require("../models/Book");

dotenv.config();

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.8,
    category: "Self-Improvement",
    publishedYear: 2018,
    description:
      "Atomic Habits explains how small daily habits can lead to major personal improvement over time. The book focuses on practical systems for building good habits and breaking bad ones.",
    reviews: [
      {
        name: "Ahmed",
        rating: 5,
        comment: "Very practical book. It explains habits in a simple way.",
      },
    ],
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    rating: 4.6,
    category: "Fiction",
    publishedYear: 1988,
    description:
      "The Alchemist follows the journey of Santiago, a young shepherd searching for meaning, purpose, and his personal legend. It is a simple story with strong messages about dreams and self-discovery.",
    reviews: [
      {
        name: "Sara",
        rating: 4,
        comment: "A short but meaningful story about dreams and purpose.",
      },
    ],
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    rating: 4.7,
    category: "Productivity",
    publishedYear: 2016,
    description:
      "Deep Work explains the value of focused, distraction-free work in a world full of interruptions. It teaches how deep concentration can improve learning, creativity, and professional success.",
    reviews: [
      {
        name: "Bilal",
        rating: 5,
        comment: "Very useful if you struggle with focus and distractions.",
      },
    ],
  },
];

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected for seeding");

    await Book.deleteMany();

    console.log("Old books deleted");

    await Book.insertMany(books);

    console.log("Books inserted successfully");

    process.exit();
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedBooks();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("../models/Book");

dotenv.config();

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.8,
    category: "Self Improvement",
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
      "The Alchemist follows the journey of Santiago, a young shepherd searching for meaning, purpose, and his personal legend.",
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
      "Deep Work explains the value of focused, distraction free work in a world full of interruptions.",
    reviews: [
      {
        name: "Bilal",
        rating: 5,
        comment: "Very useful if you struggle with focus and distractions.",
      },
    ],
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    rating: 4.5,
    category: "Finance",
    publishedYear: 1997,
    description:
      "Rich Dad Poor Dad teaches basic financial literacy through lessons about money, investing, assets, and financial mindset.",
    reviews: [
      {
        name: "Hassan",
        rating: 4,
        comment: "Simple and useful introduction to money mindset.",
      },
    ],
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    rating: 4.7,
    category: "History",
    publishedYear: 2011,
    description:
      "Sapiens explores the history of humankind, from early human societies to the modern world.",
    reviews: [
      {
        name: "Mariam",
        rating: 5,
        comment: "A fascinating book that explains human history clearly.",
      },
    ],
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    rating: 4.4,
    category: "Mindset",
    publishedYear: 1937,
    description:
      "Think and Grow Rich is a classic book about success, discipline, desire, and personal achievement.",
    reviews: [
      {
        name: "Usman",
        rating: 4,
        comment: "Old but still motivating and useful.",
      },
    ],
  },
  {
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    rating: 4.3,
    category: "Psychology",
    publishedYear: 1998,
    description:
      "The 48 Laws of Power explores power, influence, strategy, and human behavior through historical examples.",
    reviews: [
      {
        name: "Ali",
        rating: 4,
        comment: "Interesting but should be read critically.",
      },
    ],
  },
  {
    title: "1984",
    author: "George Orwell",
    rating: 4.8,
    category: "Dystopian",
    publishedYear: 1949,
    description:
      "1984 presents a dystopian society shaped by surveillance, control, propaganda, and political oppression.",
    reviews: [
      {
        name: "Ayesha",
        rating: 5,
        comment: "Powerful and still relevant today.",
      },
    ],
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    rating: 4.6,
    category: "Dystopian",
    publishedYear: 1932,
    description:
      "Brave New World imagines a future society shaped by technology, pleasure, conditioning, and social control.",
    reviews: [
      {
        name: "Omar",
        rating: 4,
        comment: "A smart and unsettling vision of the future.",
      },
    ],
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    rating: 4.7,
    category: "Finance",
    publishedYear: 2020,
    description:
      "The Psychology of Money explains how emotions, behavior, and personal experiences shape financial decisions.",
    reviews: [
      {
        name: "Zain",
        rating: 5,
        comment: "One of the best books about money behavior.",
      },
    ],
  },
  {
    title: "Start With Why",
    author: "Simon Sinek",
    rating: 4.5,
    category: "Leadership",
    publishedYear: 2009,
    description:
      "Start With Why explains how leaders and organizations inspire action by communicating purpose clearly.",
    reviews: [
      {
        name: "Nimra",
        rating: 4,
        comment: "Helpful for understanding leadership and purpose.",
      },
    ],
  },
  {
    title: "Can't Hurt Me",
    author: "David Goggins",
    rating: 4.9,
    category: "Motivation",
    publishedYear: 2018,
    description:
      "Can't Hurt Me tells the story of mental toughness, discipline, resilience, and pushing beyond limits.",
    reviews: [
      {
        name: "Danish",
        rating: 5,
        comment: "Extremely intense and motivating.",
      },
    ],
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    rating: 4.4,
    category: "Self Improvement",
    publishedYear: 2016,
    description:
      "This book offers a direct and honest approach to values, priorities, problems, and living a better life.",
    reviews: [
      {
        name: "Fatima",
        rating: 4,
        comment: "Direct, funny, and practical.",
      },
    ],
  },
  {
    title: "Educated",
    author: "Tara Westover",
    rating: 4.6,
    category: "Biography",
    publishedYear: 2018,
    description:
      "Educated is a memoir about family, survival, learning, and the power of education to change a life.",
    reviews: [
      {
        name: "Laiba",
        rating: 5,
        comment: "Emotional and beautifully written.",
      },
    ],
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    rating: 4.8,
    category: "Fantasy",
    publishedYear: 1937,
    description:
      "The Hobbit follows Bilbo Baggins on a fantasy adventure filled with courage, danger, and discovery.",
    reviews: [
      {
        name: "Hamza",
        rating: 5,
        comment: "A classic adventure story and very enjoyable.",
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
    console.log("15 books inserted successfully");

    process.exit();
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedBooks();
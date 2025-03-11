export interface Book {
  title: string;
  author: string;
  coverImage?: string; // URL to book cover image
  completedDate: string; // Format: 'YYYY-MM-DD'
  rating?: number; // Optional rating out of 5
  review?: string; // Optional short review
  url?: string; // Optional link to Goodreads or Amazon
}

export interface CurrentlyReading {
  title: string;
  author: string;
  coverImage?: string;
  startedDate: string; // Format: 'YYYY-MM-DD'
  progress: number; // Percentage complete (0-100)
  url?: string;
}

export const currentlyReading: CurrentlyReading[] = [
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    coverImage: "https://m.media-amazon.com/images/I/81XSN3hA5gL._AC_UF1000,1000_QL80_.jpg",
    startedDate: "2025-03-01",
    progress: 65,
    url: "https://www.goodreads.com/book/show/386162.The_Hitchhiker_s_Guide_to_the_Galaxy"
  },
  {
    title: "Thinking Fast and Slow",
    author: "Daniel Kahneman",
    coverImage: "https://m.media-amazon.com/images/I/61fdrEuPJwL._AC_UF1000,1000_QL80_.jpg",
    startedDate: "2025-02-15",
    progress: 30,
    url: "https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow"
  }
];

export const completedBooks: Book[] = [
  {
    title: "Dune",
    author: "Frank Herbert",
    coverImage: "https://m.media-amazon.com/images/I/A1u+2fY5yTL._AC_UF1000,1000_QL80_.jpg",
    completedDate: "2025-02-10",
    rating: 5,
    review: "An epic masterpiece that blends politics, religion, and ecology into an unforgettable sci-fi saga.",
    url: "https://www.goodreads.com/book/show/44767458-dune"
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverImage: "https://m.media-amazon.com/images/I/91vddsQ9w0L._AC_UF1000,1000_QL80_.jpg",
    completedDate: "2025-01-15",
    rating: 5,
    url: "https://www.goodreads.com/book/show/54493401-project-hail-mary"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UF1000,1000_QL80_.jpg",
    completedDate: "2024-12-20",
    rating: 4,
    review: "Practical insights on building good habits and breaking bad ones.",
    url: "https://www.goodreads.com/book/show/40121378-atomic-habits"
  },
  {
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    coverImage: "https://m.media-amazon.com/images/I/917tI3VCvvL._AC_UF1000,1000_QL80_.jpg",
    completedDate: "2024-11-05",
    rating: 4,
    url: "https://www.goodreads.com/book/show/20518872-the-three-body-problem"
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    coverImage: "https://m.media-amazon.com/images/I/41yu2qXhTXL.jpg",
    completedDate: "2024-10-12",
    rating: 5,
    review: "Fascinating perspective on human history and our cognitive evolution.",
    url: "https://www.goodreads.com/book/show/23692271-sapiens"
  }
];

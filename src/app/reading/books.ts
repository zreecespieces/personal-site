export interface Book {
  title: string;
  author: string;
  coverImage?: string; // URL to book cover image
  completedDate?: string; // Format: 'YYYY-MM-DD'
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
    title: "The Wealth of Nations",
    author: "Adam Smith",
    coverImage: "https://images.penguinrandomhouse.com/cover/9780679783367",
    startedDate: "2025-07-09",
    progress: 0,
    url: "https://www.goodreads.com/book/show/25701.The_Wealth_of_Nations",
  },
];

export const completedBooks: Book[] = [
  {
    title: "An Enquiry Concerning Human Understanding",
    author: "David Hume",
    coverImage: "https://m.media-amazon.com/images/I/71jxu+3sxvL._UF1000,1000_QL80_.jpg",
    completedDate: "2025-07-09",
    url: "https://www.goodreads.com/book/show/20717610",
  },
  {
    title: "Two Treatises of Government",
    author: "John Locke",
    coverImage: "https://m.media-amazon.com/images/I/61n-DUge78L._UF1000,1000_QL80_.jpg",
    completedDate: "2025-06-30",
    url: "https://www.goodreads.com/book/show/61170096-two-treaties-of-government",
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    coverImage: "https://m.media-amazon.com/images/I/81oHM-dzefL._AC_UF1000,1000_QL80_.jpg",
    completedDate: "2025-05-01",
    url: "https://www.goodreads.com/book/show/656.War_and_Peace",
  },
  {
    title: "Make It Stick",
    author: "Peter C. Brown",
    coverImage: "https://m.media-amazon.com/images/I/71R50407NOL._SY522_.jpg",
    url: "https://www.goodreads.com/book/show/18770267-make-it-stick",
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    coverImage: "https://m.media-amazon.com/images/I/71GNqqXuN3L._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/5129.Brave_New_World",
  },
  {
    title: "The Giver",
    author: "Lois Lowry",
    coverImage: "https://m.media-amazon.com/images/I/81Yq5WKWfSL._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/3636.The_Giver",
  },
  {
    title: "1984",
    author: "George Orwell",
    coverImage: "https://m.media-amazon.com/images/I/71rpa1-kyvL._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/40961427-1984",
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    coverImage: "https://m.media-amazon.com/images/I/61zc4fPQbIL._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/4381.Fahrenheit_451",
  },
  {
    title: "The Prince",
    author: "Niccolò Machiavelli",
    completedDate: "2023-09-22",
    coverImage: "https://m.media-amazon.com/images/I/51KV9QHeUBL._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/28862.The_Prince",
  },
  {
    title: "Leviathan",
    author: "Thomas Hobbes",
    coverImage: "https://m.media-amazon.com/images/I/91DrceRCs8L._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/91953.Leviathan",
  },
  {
    title: "The Republic",
    author: "Plato",
    coverImage: "https://m.media-amazon.com/images/I/91nYfNvYa7L._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/30289.The_Republic",
  },
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    coverImage: "https://m.media-amazon.com/images/I/71CkY2uvS+L._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/30659.Meditations",
  },
  {
    title: "East of Eden",
    author: "John Steinbeck",
    coverImage: "https://m.media-amazon.com/images/I/612s8cWOYbL._SL1499_.jpg",
    url: "https://www.goodreads.com/book/show/4406.East_of_Eden",
  },
  {
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    coverImage: "https://m.media-amazon.com/images/I/71ohpQBLDyL._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/4934.The_Brothers_Karamazov",
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    coverImage: "https://m.media-amazon.com/images/I/81BE7eeKzAL._SY522_.jpg",
    url: "https://www.goodreads.com/book/show/69571.Rich_Dad_Poor_Dad",
  },
  {
    title: "Siddhartha",
    author: "Hermann Hesse",
    coverImage: "https://m.media-amazon.com/images/I/71PmXowhdqL._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/52036.Siddhartha",
  },
  {
    title: "Bhagavad Gita",
    author: "Anonymous",
    coverImage: "https://m.media-amazon.com/images/I/81xNWbEk0VL._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/99944.The_Bhagavad_Gita",
  },
  {
    title: "The Happiness Hypothesis",
    author: "Jonathan Haidt",
    coverImage: "https://m.media-amazon.com/images/I/81zC1pSRNIL._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/96884.The_Happiness_Hypothesis",
  },
  {
    title: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    coverImage: "https://m.media-amazon.com/images/I/81p5YYw2DcL._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/12321.Beyond_Good_and_Evil",
  },
  {
    title: "Ecce Homo",
    author: "Friedrich Nietzsche",
    completedDate: "2023-08-16",
    coverImage: "https://m.media-amazon.com/images/I/61DWYdjdMWL._SL1164_.jpg",
    url: "https://www.goodreads.com/book/show/479356.Ecce_Homo",
  },
  {
    title: "On the Genealogy of Morals",
    author: "Friedrich Nietzsche",
    completedDate: "2023-08-08",
    coverImage: "https://m.media-amazon.com/images/I/81EMQitmqvL.jpg",
    url: "https://www.goodreads.com/book/show/80449.On_the_Genealogy_of_Morals",
  },
  {
    title: "Homo Deus",
    author: "Yuval Noah Harari",
    completedDate: "2025-02-18",
    coverImage: "https://m.media-amazon.com/images/I/81mpU5GWymL._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/31138556-homo-deus",
  },
  {
    title: "Multithreaded JavaScript",
    author: "Thomas Hunter II & Bryan English",
    coverImage: "https://m.media-amazon.com/images/I/81EEML3FpdL._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/59199624-multithreaded-javascript",
  },
  {
    title: "A Philosophy of Software Design",
    author: "John Ousterhout",
    coverImage: "https://m.media-amazon.com/images/I/711Qnv05eTL._SL1231_.jpg",
    url: "https://www.goodreads.com/book/show/39996759-a-philosophy-of-software-design",
  },
  {
    title: "The Way of Zen",
    author: "Alan Watts",
    coverImage: "https://m.media-amazon.com/images/I/61pDzhG+wCL._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/514210.The_Way_of_Zen",
  },
  {
    title: "Island",
    author: "Aldous Huxley",
    coverImage: "https://m.media-amazon.com/images/I/71zv1NFS4qL._SL1360_.jpg",
    url: "https://www.goodreads.com/book/show/5130.Island",
  },
  {
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    coverImage: "https://m.media-amazon.com/images/I/81yN7h6yG-L._SL1500_.jpg",
    url: "https://www.goodreads.com/book/show/18114322-the-grapes-of-wrath",
  },
  {
    title: "Be Here Now",
    author: "Ram Dass",
    coverImage: "https://m.media-amazon.com/images/I/810cf8Tv5-L._SL1183_.jpg",
    url: "https://www.goodreads.com/book/show/41580312-be-here-now",
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    coverImage: "https://m.media-amazon.com/images/I/81XSN3hA5gL._AC_UF1000,1000_QL80_.jpg",
    url: "https://www.goodreads.com/book/show/386162.The_Hitchhiker_s_Guide_to_the_Galaxy",
  },
];

export const wishlist: Book[] = [
  // Add your wishlist books here
];

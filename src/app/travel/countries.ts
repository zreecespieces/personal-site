// Define interfaces for our data
export interface Country {
  name: string;
  flag: string; // Flag emoji or URL to flag image
  coverImage: string;
  visits: Visit[];
  favoriteSpots: FavoriteSpot[];
  description?: string;
}

export interface Visit {
  startDate: string; // YYYY-MM-DD format
  endDate: string; // YYYY-MM-DD format
  purpose: string; // e.g., "Tourism", "Business", "Study", etc.
}

export interface FavoriteSpot {
  name: string;
  description: string;
  image?: string;
  location?: string; // City or region
  rating?: number; // 1-5
}

// Helper function to calculate total days spent
export const calculateDaysSpent = (visits: Visit[]): number => {
  return visits.reduce((total, visit) => {
    const startDate = new Date(visit.startDate);
    const endDate = new Date(visit.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return total + diffDays;
  }, 0);
};

// Sample data
export const countries: Country[] = [
  {
    name: "Japan",
    flag: "🇯🇵",
    coverImage: "https://images.unsplash.com/photo-1492571350019-22de08371fd3",
    visits: [
      {
        startDate: "2024-03-01",
        endDate: "2024-03-14",
        purpose: "Tourism"
      },
      {
        startDate: "2022-07-10",
        endDate: "2022-07-25",
        purpose: "Cultural Exchange"
      }
    ],
    favoriteSpots: [
      {
        name: "Fushimi Inari Shrine",
        description: "The iconic shrine with thousands of vermilion torii gates that wind up the mountain.",
        image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36",
        location: "Kyoto",
        rating: 5
      },
      {
        name: "Tokyo Skytree",
        description: "One of the tallest structures in the world with breathtaking views of Tokyo.",
        image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc",
        location: "Tokyo",
        rating: 4
      }
    ],
    description: "Japan blends ancient traditions with cutting-edge technology. From serene temples and gardens to bustling urban centers, it offers an unforgettable cultural experience."
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    coverImage: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
    visits: [
      {
        startDate: "2023-06-05",
        endDate: "2023-06-20",
        purpose: "Tourism"
      }
    ],
    favoriteSpots: [
      {
        name: "Colosseum",
        description: "The iconic ancient amphitheater in the center of Rome, a testament to Roman engineering.",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
        location: "Rome",
        rating: 5
      },
      {
        name: "Amalfi Coast",
        description: "A stunning stretch of coastline known for its dramatic cliffs, colorful villages, and Mediterranean charm.",
        image: "https://images.unsplash.com/photo-1533587045756-fcbd3fe21f0c",
        location: "Campania",
        rating: 5
      }
    ],
    description: "Italy captivates with its rich history, world-renowned cuisine, and stunning landscapes. From ancient ruins to Renaissance masterpieces, it's a feast for all senses."
  },
  {
    name: "France",
    flag: "🇫🇷",
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    visits: [
      {
        startDate: "2023-09-10",
        endDate: "2023-09-18",
        purpose: "Tourism"
      },
      {
        startDate: "2021-04-15",
        endDate: "2021-04-25",
        purpose: "Business"
      }
    ],
    favoriteSpots: [
      {
        name: "Eiffel Tower",
        description: "The iconic wrought-iron tower that has become a global symbol of Paris and France.",
        image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e",
        location: "Paris",
        rating: 4
      },
      {
        name: "Mont Saint-Michel",
        description: "A medieval monastery perched on a rocky island, creating one of France's most stunning landmarks.",
        image: "https://images.unsplash.com/photo-1596394723269-c70be7ed4914",
        location: "Normandy",
        rating: 5
      }
    ],
    description: "France enchants with its sophisticated culture, exquisite cuisine, and picturesque landscapes. From the romantic streets of Paris to the lavender fields of Provence, it offers diverse experiences for every traveler."
  },
  {
    name: "New Zealand",
    flag: "🇳🇿",
    coverImage: "https://images.unsplash.com/photo-1504746125576-39e25e6bdd72",
    visits: [
      {
        startDate: "2023-01-05",
        endDate: "2023-01-25",
        purpose: "Adventure Travel"
      }
    ],
    favoriteSpots: [
      {
        name: "Milford Sound",
        description: "A breathtaking fjord known for its towering peaks, waterfalls, and wildlife.",
        image: "https://images.unsplash.com/photo-1537968990071-5b520fa8f2a3",
        location: "South Island",
        rating: 5
      },
      {
        name: "Hobbiton Movie Set",
        description: "The preserved set from The Lord of the Rings and The Hobbit films, offering a glimpse into Middle-earth.",
        image: "https://images.unsplash.com/photo-1546706887-a6c891fb77b8",
        location: "North Island",
        rating: 4
      }
    ],
    description: "New Zealand is a paradise for nature lovers and adventure seekers alike. With its dramatic landscapes, from snow-capped mountains to pristine beaches, it offers countless opportunities for outdoor exploration."
  },
  {
    name: "Thailand",
    flag: "🇹🇭",
    coverImage: "https://images.unsplash.com/photo-1528181304800-259b08848526",
    visits: [
      {
        startDate: "2022-11-10",
        endDate: "2022-11-25",
        purpose: "Tourism"
      }
    ],
    favoriteSpots: [
      {
        name: "Grand Palace",
        description: "A complex of buildings in Bangkok serving as the official residence of the Kings of Thailand.",
        image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed",
        location: "Bangkok",
        rating: 4
      },
      {
        name: "Phi Phi Islands",
        description: "Stunning archipelago known for its crystal-clear waters, white sandy beaches, and limestone cliffs.",
        image: "https://images.unsplash.com/photo-1549894379-c53984b25fb2",
        location: "Krabi",
        rating: 5
      }
    ],
    description: "Thailand charms with its tropical beaches, opulent royal palaces, ancient ruins, and ornate temples. Its vibrant street life, delicious cuisine, and warm hospitality make it a favorite destination for travelers."
  }
];

// Get countries sorted by most recent visit
export const getCountriesByRecent = (): Country[] => {
  return [...countries].sort((a, b) => {
    const aLatestVisit = new Date(a.visits.sort((v1, v2) => 
      new Date(v2.startDate).getTime() - new Date(v1.startDate).getTime())[0].startDate);
    const bLatestVisit = new Date(b.visits.sort((v1, v2) => 
      new Date(v2.startDate).getTime() - new Date(v1.startDate).getTime())[0].startDate);
    return bLatestVisit.getTime() - aLatestVisit.getTime();
  });
};

// Get total countries visited
export const getTotalCountriesVisited = (): number => {
  return countries.length;
};

// Get total days spent traveling
export const getTotalDaysSpent = (): number => {
  return countries.reduce((total, country) => {
    return total + calculateDaysSpent(country.visits);
  }, 0);
};

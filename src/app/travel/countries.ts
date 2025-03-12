// Define interfaces for our data
export interface Country {
  name: string;
  flag: string; // Flag emoji or URL to flag image
  coverImage: string;
  visits: Visit[];
  favoriteSpots: FavoriteSpot[];
  description?: string;
  states?: string[]; // For tracking US states visited
  isHomeCountry?: boolean; // To identify the user's home country
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

// Simple list:
// Greece - July 14 2019 - July 28 2019
//  - Meteora, Mykonos, Santorini, Athens, Olympia, Corinth, Epidaurus, Delphi, 
// Canada - February 8 2023 - February 12 2023
//  - Niagara Falls, Toronto, Aquarium, Casa Loma, CN Tower
// Portugal - All of September 2023
//  - Lisbon, Sintra, Arrabida Park, Evora, Peneda-Gerês National Park, Côa Valley, Cabo de Roca, Almendres Cromlech
// Spain - All of October 2023
//  - Barcelona, Seville, Parque de la Ciutadella, Montserrat, Parc Güell, Sagrada Familia, Figueres, Salvador Dalí Museum, Girona, FC Barcelona home game
// Italy - All of November 2023
//  - Rome, Florence, Venice, Pompeii, Pisa, Vatican City, Naples
// Bosnia - All of December 2023
//  - Sarajevo
// Bulgaria - All of January 2024
//  - Sofia, Belogradchik, Magura Cave, Rila Monastery,
// Romania - All of February 2024
//  - Bucharest, Peles Castle, Bran Castle (Dracula's castle), Braşov, Salina Turda, 
// Hungary - First week of March 2024
//  - Budapest, Buda Castle, Fisherman's Bastion, Hungarian Parliament Building
// Czechia - Second week of March 2024
//  - Prague, Prague Castle, Charles Bridge, Old Town Square, Kutna Hora
// United States - My home country
// - States Visited: [Kansas, Colorado, Ohio, Missouri, Oklahoma, Arkansas, Louisiana, Florida, Texas, New York, Illinois, California, Washington, Washington DC, Virginia, Maryland, Pennsylvania, Nevada, Utah, Michigan, Indiana, Tennessee, Georgia]

export const countries: Country[] = [
  {
    name: "United States",
    flag: "🇺🇸",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Flag_of_the_United_States_%28Pantone%29.svg/1200px-Flag_of_the_United_States_%28Pantone%29.svg.png",
    visits: [],
    favoriteSpots: [],
    description: "My home country",
    states: ["Kansas", "Colorado", "Ohio", "Missouri", "Oklahoma", "Arkansas", "Louisiana", "Florida", "Texas", "New York", "Illinois", "California", "Washington", "Washington DC", "Virginia", "Maryland", "Pennsylvania", "Nevada", "Utah", "Michigan", "Indiana", "Tennessee", "Georgia", "Kentucky"],
    isHomeCountry: true
  },
  {
    name: "Greece",
    flag: "🇬🇷",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Santorini%2C_Greece.jpg",
    visits: [
      {
        startDate: "2019-07-14",
        endDate: "2019-07-28",
        purpose: "Tourism"
      }
    ],
    favoriteSpots: [
      {
        name: "Meteora",
        description: "Spectacular rock formations with monasteries built on top",
      },
      {
        name: "Mykonos",
        description: "Beautiful island with iconic windmills and vibrant culture",
      },
      {
        name: "Santorini",
        description: "Island with stunning white buildings and blue domes",
      },
      {
        name: "Athens",
        description: "Historic capital with the Acropolis and ancient ruins",
      },
      {
        name: "Olympia",
        description: "Birthplace of the Olympic Games",
      },
      {
        name: "Corinth",
        description: "Ancient city with impressive archaeological sites",
      },
      {
        name: "Epidaurus",
        description: "Home to an ancient theater with remarkable acoustics",
      },
      {
        name: "Delphi",
        description: "Ancient sanctuary dedicated to Apollo",
      }
    ],
    description: "Known for its rich history, stunning islands, Mediterranean cuisine, and ancient ruins."
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Toronto_Skyline_Summer_2020.jpg",
    visits: [
      {
        startDate: "2023-02-08",
        endDate: "2023-02-12",
        purpose: "Tourism"
      }
    ],
    favoriteSpots: [
      {
        name: "Niagara Falls",
        description: "Stunning natural waterfalls at the Canada-US border",
      },
      {
        name: "Toronto",
        description: "Canada's largest city with diverse culture and attractions",
      },
      {
        name: "Ripley's Aquarium",
        description: "Public aquarium with a diverse collection of marine life",
      },
      {
        name: "Casa Loma",
        description: "Gothic Revival castle-style mansion and garden",
      },
      {
        name: "CN Tower",
        description: "Iconic communications and observation tower",
      }
    ],
    description: "The world's second-largest country by total area, known for its diverse culture, natural beauty, and friendly people."
  },
  {
    name: "Portugal",
    flag: "🇵🇹",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Porto_June_2014-1a.jpg",
    visits: [
      {
        startDate: "2023-09-01",
        endDate: "2023-09-30",
        purpose: "Tourism"
      }
    ],
    favoriteSpots: [
      {
        name: "Lisbon",
        description: "Historic coastal capital city with colorful architecture",
      },
      {
        name: "Sintra",
        description: "Romantic town with fairytale palaces and lush forests",
      },
      {
        name: "Arrabida Park",
        description: "Natural park with beautiful mountains and beaches",
      },
      {
        name: "Evora",
        description: "Historic city with Roman temple and medieval walls",
      },
      {
        name: "Peneda-Gerês National Park",
        description: "Portugal's only national park with stunning landscapes",
      },
      {
        name: "Côa Valley",
        description: "Home to prehistoric rock art",
      },
      {
        name: "Cabo de Roca",
        description: "Westernmost point of continental Europe",
      },
      {
        name: "Almendres Cromlech",
        description: "Megalithic complex from the 6th millennium BC",
      }
    ],
    description: "Home to beautiful beaches, historic cities, delicious cuisine, and port wine."
  },
  {
    name: "Spain",
    flag: "🇪🇸",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/8/84/Barcelona_skyline_and_sagrada_familia.jpg",
    visits: [
      {
        startDate: "2023-10-01",
        endDate: "2023-10-31",
        purpose: "Tourism"
      }
    ],
    favoriteSpots: [
      {
        name: "Barcelona",
        description: "Coastal city known for stunning architecture and vibrant culture",
      },
      {
        name: "Seville",
        description: "City known for flamenco dancing and Moorish architecture",
      },
      {
        name: "Parque de la Ciutadella",
        description: "Historic park with a lake and beautiful gardens",
      },
      {
        name: "Montserrat",
        description: "Mountain range with a famous monastery",
      },
      {
        name: "Parc Güell",
        description: "Public park system with Gaudí's architectural works",
      },
      {
        name: "Sagrada Familia",
        description: "Gaudí's famous unfinished basilica",
      },
      {
        name: "Figueres",
        description: "Town known as the birthplace of Salvador Dalí",
      },
      {
        name: "Salvador Dalí Museum",
        description: "Museum dedicated to the surrealist artist Salvador Dalí",
      },
      {
        name: "Girona",
        description: "City with medieval architecture and Jewish quarter",
      },
      {
        name: "FC Barcelona Match",
        description: "Home game of the famous FC Barcelona football team",
      }
    ],
    description: "Known for its rich culture, beautiful beaches, historic cities, and vibrant nightlife."
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/5/53/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg",
    visits: [
      {
        startDate: "2023-11-01",
        endDate: "2023-11-30",
        purpose: "Tourism"
      }
    ],
    favoriteSpots: [
      {
        name: "Rome",
        description: "Eternal city with ancient ruins and historic landmarks",
      },
      {
        name: "Florence",
        description: "Birthplace of the Renaissance with impressive art and architecture",
      },
      {
        name: "Venice",
        description: "City of canals with unique architecture and romantic atmosphere",
      },
      {
        name: "Pompeii",
        description: "Ancient Roman city preserved by the eruption of Mount Vesuvius",
      },
      {
        name: "Pisa",
        description: "Home to the famous Leaning Tower",
      },
      {
        name: "Vatican City",
        description: "Smallest independent state with St. Peter's Basilica and Vatican Museums"
      },
      {
        name: "Naples",
        description: "Historic city known for its culture and cuisine",
      }
    ],
    description: "Famous for its art, architecture, food, wine, beautiful coastlines, and ancient ruins."
  },
  {
    name: "Bosnia and Herzegovina",
    flag: "🇧🇦",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Sarajevo_City_Panorama.JPG",
    visits: [
      {
        startDate: "2023-12-01",
        endDate: "2023-12-31",
        purpose: "Tourism"
      }
    ],
    favoriteSpots: [
      {
        name: "Sarajevo",
        description: "Capital city with rich history and diverse cultural influences",
      },
      {
        name: "Latin Bridge",
        description: "Historic bridge where Archduke Franz Ferdinand was assassinated, sparking World War I",
      },
      { name: "Trebević",
        description: "Beautiful mountain overlooking Sarajevo with a cable car connecting it to the city",
      }
    ],
    description: "Rich in natural beauty with rugged mountains, medieval villages, and a fascinating blend of Ottoman and Austro-Hungarian influences."
  },
  {
    name: "Bulgaria",
    flag: "🇧🇬",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Alexander_Nevsky_Cathedral%2C_Sofia_%2840124497392%29.jpg",
    visits: [
      {
        startDate: "2024-01-01",
        endDate: "2024-01-31",
        purpose: "Tourism"
      }
    ],
    favoriteSpots: [
      {
        name: "Sofia",
        description: "Capital city with a blend of Ottoman, Soviet, and modern influences",
      },
      {
        name: "Belogradchik",
        description: "Town known for its unique rock formations and fortress",
      },
      {
        name: "Magura Cave",
        description: "Cave with prehistoric paintings dating from the Epipaleolithic era",
      },
      {
        name: "Rila Monastery",
        description: "Largest and most famous Eastern Orthodox monastery in Bulgaria",
      }
    ],
    description: "Beautiful country with diverse landscapes, from Black Sea beaches to mountains, with rich history and cultural heritage."
  },
  {
    name: "Romania",
    flag: "🇷🇴",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Bran_Castle_-_view_from_west.jpg",
    visits: [
      {
        startDate: "2024-02-01",
        endDate: "2024-02-29",
        purpose: "Tourism"
      }
    ],
    favoriteSpots: [
      {
        name: "Bucharest",
        description: "Capital city with elegant architecture and vibrant culture",
      },
      {
        name: "Peles Castle",
        description: "Neo-Renaissance castle with intricate details and beautiful surroundings",
      },
      {
        name: "Bran Castle",
        description: "Often associated with the Dracula legend",
      },
      {
        name: "Brașov",
        description: "Medieval city surrounded by the Carpathian Mountains",
      },
      {
        name: "Salina Turda",
        description: "Ancient salt mine transformed into an underground theme park",
      }
    ],
    description: "Home to medieval towns, Dracula's castle, the Carpathian Mountains, and beautiful countryside."
  },
  {
    name: "Hungary",
    flag: "🇭🇺",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/6/60/Budapest_Hungarian_Parliament_%2831363963556%29.jpg",
    visits: [
      {
        startDate: "2024-03-01",
        endDate: "2024-03-07",
        purpose: "Tourism"
      }
    ],
    favoriteSpots: [
      {
        name: "Budapest",
        description: "Capital city with beautiful architecture and rich history",
      },
      {
        name: "Buda Castle",
        description: "Historic castle with stunning views of the Danube",
      },
      {
        name: "Fisherman's Bastion",
        description: "Scenic lookout with beautiful architecture",
      },
      {
        name: "Hungarian Parliament Building",
        description: "Impressive Neo-Gothic building with beautiful architecture",
      }
    ],
    description: "Known for its rich history, thermal spas, impressive architecture, and unique cuisine."
  },
  {
    name: "Czech Republic",
    flag: "🇨🇿",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/0/09/Prague%2C_Czech_Republic_skyline.jpg",
    visits: [
      {
        startDate: "2024-03-08",
        endDate: "2024-03-14",
        purpose: "Tourism"
      }
    ],
    favoriteSpots: [
      {
        name: "Prague",
        description: "Capital city with rich history and beautiful architecture",
      },
      {
        name: "Prague Castle",
        description: "Historic castle with stunning views of the city",
      },
      {
        name: "Charles Bridge",
        description: "Iconic bridge with beautiful architecture and great views",
      },
      {
        name: "Old Town Square",
        description: "Historic square with beautiful architecture and lively atmosphere",
      },
      {
        name: "Kutna Hora",
        description: "Medieval town with beautiful architecture and a stunning Gothic cathedral",
      }
    ],
    description: "Home to hundreds of museums, countless churches, and beautiful architecture, with Prague's historic center a UNESCO World Heritage site."
  }
];

// Get countries sorted by most recent visit
export const getCountriesByRecent = (): Country[] => {
  return [...countries].sort((a, b) => {
    const aLatestVisit = a.visits.length > 0 ? new Date(a.visits.sort((v1, v2) => 
      new Date(v2.endDate).getTime() - new Date(v1.endDate).getTime())[0].endDate) : new Date(0);
    const bLatestVisit = b.visits.length > 0 ? new Date(b.visits.sort((v1, v2) => 
      new Date(v2.endDate).getTime() - new Date(v1.endDate).getTime())[0].endDate) : new Date(0);
    return bLatestVisit.getTime() - aLatestVisit.getTime();
  });
};

// Get total countries visited
export const getTotalCountriesVisited = (): number => {
  return countries.filter(country => country.visits.length > 0).length;
};

// Get total days spent traveling
export const getTotalDaysSpent = (): number => {
  return countries.reduce((total, country) => {
    return total + calculateDaysSpent(country.visits);
  }, 0);
};

export const getTotalStatesVisited = (): number => {
  return countries.reduce((total, country) => {
    return total + (country.states ? country.states.length : 0);
  }, 0);
};
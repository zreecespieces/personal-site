// Define interfaces for comedian data
export interface Comedian {
  name: string;
  image: string; // URL to comedian's image
  bio?: string;
  shows: Show[];
  favorite?: boolean;
}

export interface Show {
  date: string; // YYYY-MM-DD format
  venue: string;
  city: string;
  tourName?: string;
  notes?: string;
  ticketImage?: string; // Optional image of ticket stub
}

// simple list:
// Bo Burnham - Nov 19 2012 - Wichita KS
// Joe Rogan - Nov 14 2020 - Wichita KS
// Tom Segura - June 7 2024 Kansas City
// Mark Normand - Sept 6 2024 - Colorado Springs CO
// Ari Matti - February 7 2025 - Denver CO
// Ari Shaffir - February 28 2025 - Denver CO
// TJ Miller - February 12 2025 -Colorado Springs
// Adam Ray - April 19 2024 - Denver CO
// Adam Ray is Dr. Phil LIVE - February 13 & 14 2025 - Denver CO
// Shane Gillis - March 14 2025 - Colorado Springs
// Duncan Trussell - March 21 2025 - Denver CO
// Louis C.K. - June 2 2025 - Denver CO
// Ian Fidance - December 7 2024 - Denver CO
// Kill Tony - May 10 2024 - Los Angeles

// Sample data
export const comedians: Comedian[] = [
  {
    name: "Tom Segura",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Tom_Segura_Happy_Birthday.jpg",
    bio: "Stand-up comedian and podcaster known for his deadpan delivery and often dark, observational humor.",
    shows: [
      {
        date: "2024-06-07",
        venue: "T-Mobile Center",
        city: "Kansas City, MO",
        notes: "His new material was even better than his specials. Great crowd work too."
      }
    ],
    favorite: true
  },
  {
    name: "Bo Burnham",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/62/Bo_Burnham_Interview_%28cropped%29.jpg",
    bio: "Musical comedian, filmmaker, actor, and poet known for his innovative comedy specials and introspective humor.",
    shows: [
      {
        date: "2012-11-19",
        venue: "Orpheum Theatre",
        city: "Wichita, KS",
        notes: "Incredible musical comedy performance"
      }
    ],
    favorite: true
  },
  {
    name: "Joe Rogan",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Joe_Rogan_-_2019_%28cropped%29.jpg",
    bio: "Stand-up comedian, UFC commentator, and host of one of the world's most popular podcasts, 'The Joe Rogan Experience'.",
    shows: [
      {
        date: "2020-11-14",
        venue: "Intrust Bank Arena",
        city: "Wichita, KS",
        notes: "Controversial but entertaining"
      }
    ]
  },
  {
    name: "Mark Normand",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Mark_Normand_2019_%28cropped%29.jpg",
    bio: "Stand-up comedian known for his quick wit, clever wordplay, and traditional joke-telling style.",
    shows: [
      {
        date: "2024-09-06",
        venue: "Pikes Peak Center",
        city: "Colorado Springs, CO",
        notes: "Rapid-fire jokes and great crowd work"
      }
    ]
  },
  {
    name: "Ari Matti",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Wikipedia-logo-v2-en.svg/500px-Wikipedia-logo-v2-en.svg.png", // Placeholder as no Wikipedia image found
    bio: "Stand-up comedian known for his unique perspective and hilarious takes on everyday life.",
    shows: [
      {
        date: "2025-02-07",
        venue: "Comedy Works",
        city: "Denver, CO",
        notes: "Fresh perspective and high energy"
      }
    ]
  },
  {
    name: "Ari Shaffir",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Ari_Shaffir_Comedy_Store_2018.jpg",
    bio: "Stand-up comedian, podcaster, and writer known for his storytelling comedy and controversial humor.",
    shows: [
      {
        date: "2025-02-28",
        venue: "Comedy Works",
        city: "Denver, CO",
        notes: "Raw and unfiltered comedy"
      }
    ]
  },
  {
    name: "TJ Miller",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/69/T._J._Miller_by_Gage_Skidmore.jpg",
    bio: "Actor, stand-up comedian, and voice actor known for his absurdist humor and roles in Silicon Valley and Deadpool.",
    shows: [
      {
        date: "2025-02-12",
        venue: "Loonees Comedy Corner",
        city: "Colorado Springs, CO",
        notes: "Energetic and eccentric performance"
      }
    ]
  },
  {
    name: "Adam Ray",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/be/Adam_Ray_by_Gage_Skidmore.jpg",
    bio: "Actor, comedian, and podcaster known for his impressions and character work.",
    shows: [
      {
        date: "2024-04-19",
        venue: "Comedy Works",
        city: "Denver, CO",
        notes: "Great impressions and character work"
      },
      {
        date: "2025-02-13",
        venue: "Paramount Theatre",
        city: "Denver, CO",
        tourName: "Adam Ray is Dr. Phil LIVE",
        notes: "Amazing Dr. Phil impression show"
      },
      {
        date: "2025-02-14",
        venue: "Paramount Theatre",
        city: "Denver, CO",
        tourName: "Adam Ray is Dr. Phil LIVE",
        notes: "Amazing Dr. Phil impression show"
      }
    ]
  },
  {
    name: "Shane Gillis",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Shane_Gillis_in_2019.jpg",
    bio: "Stand-up comedian, podcast host, and sketch comedy writer known for his observational humor.",
    shows: [
      {
        date: "2025-03-14",
        venue: "Pikes Peak Center",
        city: "Colorado Springs, CO",
        notes: "Brutally funny and honest comedy"
      }
    ],
    favorite: true
  },
  {
    name: "Duncan Trussell",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Duncan_Trussell_2012_Cropped.jpg",
    bio: "Comedian, podcaster, and actor known for his psychedelic comedy and philosophical discussions.",
    shows: [
      {
        date: "2025-03-21",
        venue: "Oriental Theater",
        city: "Denver, CO",
        notes: "Mind-expanding comedy and spiritual insights"
      }
    ]
  },
  {
    name: "Louis C.K.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Louis_CK_2012_Shankbone.JPG",
    bio: "Stand-up comedian, writer, actor, and filmmaker known for his observational and self-deprecating humor.",
    shows: [
      {
        date: "2025-06-02",
        venue: "Bellco Theatre",
        city: "Denver, CO",
        notes: "Controversial but masterful storytelling"
      }
    ]
  },
  {
    name: "Ian Fidance",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Wikipedia-logo-v2-en.svg/500px-Wikipedia-logo-v2-en.svg.png", // Placeholder as no Wikipedia image found
    bio: "Up-and-coming comedian known for his energetic performances and appearances on Comedy Central.",
    shows: [
      {
        date: "2024-12-07",
        venue: "Comedy Works",
        city: "Denver, CO",
        notes: "Fresh perspective and high energy"
      }
    ]
  },
  {
    name: "Kill Tony",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Wikipedia-logo-v2-en.svg/500px-Wikipedia-logo-v2-en.svg.png", // Placeholder as no Wikipedia image found
    bio: "Popular comedy podcast hosted by Tony Hinchcliffe where amateur comedians perform and receive feedback.",
    shows: [
      {
        date: "2024-05-10",
        venue: "The Comedy Store",
        city: "Los Angeles, CA",
        notes: "Hilarious roasting of open mic comedians"
      }
    ]
  }
];

// Helper functions

// Get total number of comedy shows attended
export function getTotalShows(): number {
  return comedians.reduce((total, comedian) => total + comedian.shows.length, 0);
}

// Get total number of comedians seen
export function getTotalComediansSeen(): number {
  return comedians.length;
}

// Get favorite comedians
export function getFavoriteComedians(): Comedian[] {
  return comedians.filter(comedian => comedian.favorite);
}

// Get comedians sorted by earliest seen
export function getComediansByEarliestSeen(): Comedian[] {
  return [...comedians].sort((a, b) => {
    const aEarliestShow = a.shows.reduce((earliest, show) => 
      !earliest || show.date < earliest ? show.date : earliest, "");
    const bEarliestShow = b.shows.reduce((earliest, show) => 
      !earliest || show.date < earliest ? show.date : earliest, "");
    return aEarliestShow.localeCompare(bEarliestShow);
  });
}

// Format date
export function formatDate(dateString: string): string {
  // Add a time component to ensure correct date in all timezones
  const dateTimeString = `${dateString}T12:00:00`;
  const date = new Date(dateTimeString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
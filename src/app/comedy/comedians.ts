// Define interfaces for comedian data
export interface Comedian {
  name: string;
  image: string; // URL to comedian's image
  bio?: string;
  shows: Show[];
  specialsToWatch?: string[];
  favorite?: boolean;
  socialMedia?: SocialMedia;
}

export interface Show {
  date: string; // YYYY-MM-DD format
  venue: string;
  city: string;
  tourName?: string;
  rating?: number; // 1-5
  notes?: string;
  ticketImage?: string; // Optional image of ticket stub
}

export interface SocialMedia {
  instagram?: string;
  twitter?: string;
  website?: string;
}

// Sample data
export const comedians: Comedian[] = [
  {
    name: "Dave Chappelle",
    image: "https://images.unsplash.com/photo-1608734265656-f035d3e7bcbf", // Placeholder image
    bio: "Iconic stand-up comedian, actor, writer, and producer known for his sharp social commentary and sketch comedy.",
    shows: [
      {
        date: "2024-01-15",
        venue: "Comedy Cellar",
        city: "New York, NY",
        tourName: "Surprise Appearance",
        rating: 5,
        notes: "Incredible surprise drop-in that lasted over an hour. Tested new material that had the room in stitches."
      },
      {
        date: "2022-09-20",
        venue: "Madison Square Garden",
        city: "New York, NY",
        tourName: "Untitled Tour 2022",
        rating: 5,
        notes: "Sold-out arena show that touched on everything from cancel culture to personal growth."
      }
    ],
    specialsToWatch: [
      "The Closer",
      "Sticks & Stones",
      "Equanimity & The Bird Revelation"
    ],
    favorite: true,
    socialMedia: {
      instagram: "davechappelle",
      twitter: "DaveChappelle",
      website: "davechappelle.com"
    }
  },
  {
    name: "John Mulaney",
    image: "https://images.unsplash.com/photo-1600176842408-51efe98c9ee0", // Placeholder image
    bio: "Former Saturday Night Live writer turned stand-up comedian known for his self-deprecating, observational comedy and sharp suits.",
    shows: [
      {
        date: "2023-11-10",
        venue: "Radio City Music Hall",
        city: "New York, NY",
        tourName: "From Scratch",
        rating: 4.5,
        notes: "Hilarious and surprisingly vulnerable show about his recent life changes."
      }
    ],
    specialsToWatch: [
      "Baby J",
      "Kid Gorgeous",
      "The Comeback Kid",
      "New in Town"
    ],
    favorite: true,
    socialMedia: {
      instagram: "johnmulaney",
      twitter: "mulaney",
      website: "johnmulaney.com"
    }
  },
  {
    name: "Ali Wong",
    image: "https://images.unsplash.com/photo-1610319370416-c76568d73dc7", // Placeholder image
    bio: "Stand-up comedian, actress, and writer known for her Netflix specials and raw, hilarious takes on pregnancy, marriage, and motherhood.",
    shows: [
      {
        date: "2024-02-14",
        venue: "The Wiltern",
        city: "Los Angeles, CA",
        tourName: "Valentine's Day Special",
        rating: 4,
        notes: "Special Valentine's Day show with all new material about dating after divorce."
      }
    ],
    specialsToWatch: [
      "Don Wong",
      "Hard Knock Wife",
      "Baby Cobra"
    ],
    socialMedia: {
      instagram: "aliwong",
      twitter: "aliwong",
      website: "aliwong.com"
    }
  },
  {
    name: "Tom Segura",
    image: "https://images.unsplash.com/photo-1598135753163-6167c1a1ad65", // Placeholder image
    bio: "Stand-up comedian and podcaster known for his deadpan delivery and often dark, observational humor.",
    shows: [
      {
        date: "2023-07-22",
        venue: "The Chicago Theatre",
        city: "Chicago, IL",
        tourName: "I'm Coming Everywhere Tour",
        rating: 4.5,
        notes: "Absolutely killed with his new hour. His crowd work was especially impressive."
      },
      {
        date: "2021-09-15",
        venue: "Comedy Store",
        city: "Los Angeles, CA",
        rating: 4,
        notes: "Intimate venue where he worked on new material. Great to see his process."
      }
    ],
    specialsToWatch: [
      "Sledgehammer",
      "Ball Hog",
      "Disgraceful",
      "Mostly Stories"
    ],
    socialMedia: {
      instagram: "seguratom",
      twitter: "tomsegura",
      website: "tomsegura.com"
    }
  },
  {
    name: "Nikki Glaser",
    image: "https://images.unsplash.com/photo-1557577262-1b431d0c9d1b", // Placeholder image
    bio: "Stand-up comedian, actress, and podcast host known for her no-holds-barred comedy tackling sex, relationships, and pop culture.",
    shows: [
      {
        date: "2023-10-05",
        venue: "The Paramount",
        city: "Austin, TX",
        tourName: "The Good Girl Tour",
        rating: 4,
        notes: "Fearless comedy that had the audience both shocked and in tears from laughing."
      }
    ],
    specialsToWatch: [
      "Good Clean Filth",
      "Bangin'",
      "Perfect"
    ],
    socialMedia: {
      instagram: "nikkiglaser",
      twitter: "NikkiGlaser",
      website: "nikkiglaser.com"
    }
  },
  {
    name: "Taylor Tomlinson",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf7a", // Placeholder image
    bio: "Rising star in comedy known for her self-deprecating humor and insights on young adulthood and mental health.",
    shows: [
      {
        date: "2024-03-01",
        venue: "Beacon Theatre",
        city: "New York, NY",
        tourName: "Have It All Tour",
        rating: 4.5,
        notes: "Impressively polished new hour with great insights on therapy and relationships."
      }
    ],
    specialsToWatch: [
      "Look At You",
      "Quarter-Life Crisis"
    ],
    favorite: true,
    socialMedia: {
      instagram: "taylortomlinson",
      twitter: "taylortomlinson",
      website: "ttomcomedy.com"
    }
  }
];

// Helper functions

// Get total number of comedy shows attended
export const getTotalShows = (): number => {
  return comedians.reduce((total, comedian) => total + comedian.shows.length, 0);
};

// Get total number of comedians seen
export const getTotalComediansSeen = (): number => {
  return comedians.length;
};

// Get favorite comedians
export const getFavoriteComedians = (): Comedian[] => {
  return comedians.filter(comedian => comedian.favorite);
};

// Get comedians sorted by most recently seen
export const getComediansByRecent = (): Comedian[] => {
  return [...comedians].sort((a, b) => {
    const aLatestShow = new Date(a.shows.sort((s1, s2) => 
      new Date(s2.date).getTime() - new Date(s1.date).getTime())[0].date);
    const bLatestShow = new Date(b.shows.sort((s1, s2) => 
      new Date(s2.date).getTime() - new Date(s1.date).getTime())[0].date);
    return bLatestShow.getTime() - aLatestShow.getTime();
  });
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};
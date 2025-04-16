// Define interfaces for comedian data
export interface Comedian {
  name: string;
  image: string; // URL to comedian's image
  shows: Show[];
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
    image: "https://i.scdn.co/image/ab6761610000e5eb83df373a06fab7659dfd9d1c",
    shows: [
      {
        date: "2024-06-07",
        venue: "T-Mobile Center",
        city: "Kansas City, MO"
      }
    ]
  },
  {
    name: "Bo Burnham",
    image: "https://media.newyorker.com/photos/60c11e82c8eec4d1031d5fe1/4:3/w_1440,h_1080,c_limit/Brody-BoBurnham.jpg",
    shows: [
      {
        date: "2012-11-19",
        venue: "Orpheum Theatre",
        city: "Wichita, KS",
        notes: "I feel super lucky to have gotten to see Bo when I was just 14. This was my first real exposure to stand up comedy."
      }
    ]
  },
  {
    name: "Joe Rogan",
    image: "https://images.squarespace-cdn.com/content/v1/587aec812994ca23948fd074/b9f7c96f-39b0-46d6-90f1-4fb38212fd83/L1020217.jpg",
    shows: [
      {
        date: "2020-11-14",
        venue: "Intrust Bank Arena",
        city: "Wichita, KS"
      }
    ]
  },
  {
    name: "Mark Normand",
    image: "https://i.ytimg.com/vi/SVC03r3ZqIE/maxresdefault.jpg",
    shows: [
      {
        date: "2024-09-06",
        venue: "Pikes Peak Center",
        city: "Colorado Springs, CO"
      }
    ]
  },
  {
    name: "Ari Matti",
    image: "https://s1.ticketm.net/dam/a/315/8188260f-7e0c-4194-bf6e-2a99dbc9d315_RETINA_PORTRAIT_3_2.jpg",
    shows: [
      {
        date: "2025-02-07",
        venue: "Comedy Works",
        city: "Denver, CO",
      }
    ]
  },
  {
    name: "Ari Shaffir",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Ari_Shaffir_2016.jpg/1200px-Ari_Shaffir_2016.jpg",
    shows: [
      {
        date: "2025-02-28",
        venue: "Comedy Works",
        city: "Denver, CO"
      }
    ]
  },
  {
    name: "TJ Miller",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/T._J._Miller_by_Gage_Skidmore_2.jpg/1200px-T._J._Miller_by_Gage_Skidmore_2.jpg",
    shows: [
      {
        date: "2025-02-12",
        venue: "Loonees Comedy Corner",
        city: "Colorado Springs, CO"
      }
    ]
  },
  {
    name: "Adam Ray",
    image: "https://seated.imgix.net/82178804-4012-459d-9ad8-eee9b643160a/e35e28ba-2918-4fde-bbaa-037c57d9545b.jpg",
    shows: [
      {
        date: "2024-04-19",
        venue: "Comedy Works",
        city: "Denver, CO",
      },
      {
        date: "2025-02-13",
        venue: "Paramount Theatre",
        city: "Denver, CO",
        tourName: "Adam Ray is Dr. Phil LIVE",
      },
      {
        date: "2025-02-14",
        venue: "Paramount Theatre",
        city: "Denver, CO",
        tourName: "Adam Ray is Dr. Phil LIVE",
      }
    ]
  },
  {
    name: "Shane Gillis",
    image: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/1174614_v9_aa.jpg",
    shows: [
      {
        date: "2025-03-14",
        venue: "The Broadmoor World Arena",
        city: "Colorado Springs, CO"
      }
    ]
  },
  {
    name: "Duncan Trussell",
    image: "https://www.news-herald.com/wp-content/uploads/2023/04/TNH-L-DuncanTrussell-WBOX-040723-01.jpg?w=1800&resize=1800,1800",
    shows: [
      {
        date: "2025-03-21",
        venue: "Comedy Works",
        city: "Denver, CO"
      }
    ]
  },
  {
    name: "Louis C.K.",
    image: "https://static01.nyt.com/images/2019/11/05/arts/04louis-ck/04louis-ck-superJumbo.jpg",
    shows: [
      {
        date: "2025-06-02",
        venue: "Red Rocks Amphitheatre",
        city: "Morrison, CO"
      }
    ]
  },
  {
    name: "Ian Fidance",
    image: "https://i.ticketweb.com/i/00/08/85/50/11/Original.jpg?v=2?v=2",
    shows: [
      {
        date: "2024-12-07",
        venue: "Comedy Works",
        city: "Denver, CO"
      }
    ]
  },
  {
    name: "Kill Tony",
    image: "https://komi-production-assets.s3-accelerate.amazonaws.com/photos/DFA9Vz8YgL5IVmT2aNH38.png?tr=w-564%2Ch-709%2Ccm-extract%2Cx-0%2Cy-1&crp=%7B%22x%22%3A0%2C%22y%22%3A0%2C%22zoomVal%22%3A1%7D",
    shows: [
      {
        date: "2024-05-10",
        venue: "The Kia Forum",
        city: "Los Angeles, CA"
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
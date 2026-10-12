// Define interfaces for comedian data
export interface Comedian {
  name: string;
  image: string; // URL to comedian's image
  shows: Show[];
}

export interface Show {
  date: string; // YYYY-MM-DD format
  startTime?: string; // HH:mm, local to the venue
  venue: string;
  address?: string;
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

// Attended shows. The 2026 records come from new_comedy_1.jpg and new_comedy_2.jpg.
export const comedians: Comedian[] = [
  {
    name: "Tom Segura",
    image: "https://i.scdn.co/image/ab6761610000e5eb83df373a06fab7659dfd9d1c",
    shows: [
      {
        date: "2024-06-07",
        venue: "T-Mobile Center",
        city: "Kansas City, MO",
      },
    ],
  },
  {
    name: "Bo Burnham",
    image:
      "https://media.newyorker.com/photos/60c11e82c8eec4d1031d5fe1/4:3/w_1440,h_1080,c_limit/Brody-BoBurnham.jpg",
    shows: [
      {
        date: "2012-11-19",
        venue: "Orpheum Theatre",
        city: "Wichita, KS",
        notes:
          "I feel super lucky to have gotten to see Bo when I was just 14. This was my first real exposure to stand up comedy.",
      },
    ],
  },
  {
    name: "Joe Rogan",
    image:
      "https://images.squarespace-cdn.com/content/v1/587aec812994ca23948fd074/b9f7c96f-39b0-46d6-90f1-4fb38212fd83/L1020217.jpg",
    shows: [
      {
        date: "2020-11-14",
        venue: "Intrust Bank Arena",
        city: "Wichita, KS",
      },
    ],
  },
  {
    name: "Mark Normand",
    image: "https://i.ytimg.com/vi/SVC03r3ZqIE/maxresdefault.jpg",
    shows: [
      {
        date: "2026-10-03",
        startTime: "21:15",
        venue: "Comedy Works Downtown (Larimer Square)",
        city: "Denver, CO",
      },
      {
        date: "2024-09-06",
        venue: "Pikes Peak Center",
        city: "Colorado Springs, CO",
      },
    ],
  },
  {
    name: "Ari Matti",
    image:
      "https://s1.ticketm.net/dam/a/315/8188260f-7e0c-4194-bf6e-2a99dbc9d315_RETINA_PORTRAIT_3_2.jpg",
    shows: [
      {
        date: "2025-02-07",
        venue: "Comedy Works",
        city: "Denver, CO",
      },
    ],
  },
  {
    name: "Ari Shaffir",
    // Public portrait from his Comedy Works listing; use the permanent blob URL.
    image:
      "https://comedyworks.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTQwOCwicHVyIjoiYmxvYl9pZCJ9fQ==--47cb8b63352b98771f0a134fc656907054d24367/AriShaffir-comedian-denver-1_14_.jpg",
    shows: [
      {
        date: "2025-02-28",
        venue: "Comedy Works",
        city: "Denver, CO",
      },
    ],
  },
  {
    name: "TJ Miller",
    // Public portrait from his Comedy Works listing; use the permanent blob URL.
    image:
      "https://comedyworks.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NTMxLCJwdXIiOiJibG9iX2lkIn19--69557308352be5564c50584377a945e1f260a0b6/TJ_Miller_Sq.jpg",
    shows: [
      {
        date: "2025-02-12",
        venue: "Loonees Comedy Corner",
        city: "Colorado Springs, CO",
      },
    ],
  },
  {
    name: "Adam Ray",
    image:
      "https://seated.imgix.net/82178804-4012-459d-9ad8-eee9b643160a/e35e28ba-2918-4fde-bbaa-037c57d9545b.jpg",
    shows: [
      {
        date: "2026-04-18",
        startTime: "19:00",
        venue: "Paramount Theatre",
        address: "1621 Glenarm St",
        city: "Denver, CO",
        tourName: "WHO IS ME Tour",
      },
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
      },
    ],
  },
  {
    name: "Shane Gillis",
    image:
      "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/1174614_v9_aa.jpg",
    shows: [
      {
        date: "2025-03-14",
        venue: "The Broadmoor World Arena",
        city: "Colorado Springs, CO",
      },
    ],
  },
  {
    name: "Duncan Trussell",
    image:
      "https://www.news-herald.com/wp-content/uploads/2023/04/TNH-L-DuncanTrussell-WBOX-040723-01.jpg?w=1800&resize=1800,1800",
    shows: [
      {
        date: "2026-03-27",
        startTime: "21:45",
        venue: "Comedy Works Downtown (Larimer Square)",
        city: "Denver, CO",
        notes: "Showtime moved from 7:30 PM to 9:45 PM the same night.",
      },
      {
        date: "2025-03-21",
        venue: "Comedy Works",
        city: "Denver, CO",
      },
    ],
  },
  {
    name: "Louis C.K.",
    image: "https://static01.nyt.com/images/2019/11/05/arts/04louis-ck/04louis-ck-superJumbo.jpg",
    shows: [
      {
        date: "2025-06-02",
        venue: "Red Rocks Amphitheatre",
        city: "Morrison, CO",
      },
    ],
  },
  {
    name: "Ian Fidance",
    image: "https://i.ticketweb.com/i/00/08/85/50/11/Original.jpg?v=2?v=2",
    shows: [
      {
        date: "2024-12-07",
        venue: "Comedy Works",
        city: "Denver, CO",
      },
    ],
  },
  {
    name: "Kill Tony",
    image:
      "https://komi-production-assets.s3-accelerate.amazonaws.com/photos/DFA9Vz8YgL5IVmT2aNH38.png?tr=w-564%2Ch-709%2Ccm-extract%2Cx-0%2Cy-1&crp=%7B%22x%22%3A0%2C%22y%22%3A0%2C%22zoomVal%22%3A1%7D",
    shows: [
      {
        date: "2024-05-10",
        venue: "The Kia Forum",
        city: "Los Angeles, CA",
      },
    ],
  },
  {
    name: "Bryan Callen",
    image:
      "https://comedyworks.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTQxMCwicHVyIjoiYmxvYl9pZCJ9fQ==--c756b190490381f7627bfb5bbdda67c62791df9d/BryanCallen-comedian-denver-1.jpg",
    shows: [
      {
        date: "2026-03-07",
        startTime: "19:00",
        venue: "Comedy Works Downtown (Larimer Square)",
        address: "1226 15th St",
        city: "Denver, CO",
      },
    ],
  },
  {
    name: "James McCann",
    image:
      "https://comedyworks.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MzE2NywicHVyIjoiYmxvYl9pZCJ9fQ==--f724cf413dd035c719850a4f10caf9e2774ad49c/JamesMcCann-comedian-denver-1.jpg",
    shows: [
      {
        date: "2026-05-29",
        startTime: "19:15",
        venue: "Comedy Works Downtown (Larimer Square)",
        city: "Denver, CO",
      },
    ],
  },
  {
    name: "Jeremiah Watkins",
    image:
      "https://comedyworks.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NTY1MSwicHVyIjoiYmxvYl9pZCJ9fQ==--c6528de7ead3c54f04cc3dc72ce758d177bc27a4/Jeremiah-Watkins-comedian-denver-1.jpg",
    shows: [
      {
        date: "2026-06-05",
        startTime: "19:15",
        venue: "Comedy Works South (The Landmark DTC)",
        address: "5345 Landmark Place",
        city: "Greenwood Village, CO",
      },
    ],
  },
  {
    name: "Timmy No Brakes",
    image:
      "https://comedyworks.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MzM4MSwicHVyIjoiYmxvYl9pZCJ9fQ==--650faf52d19a71b2376c7758cb9c3819281894fd/Timmy-No-Breaks-comedian-denver-1.jpg",
    shows: [
      {
        date: "2026-07-30",
        startTime: "19:00",
        venue: "Comedy Works Downtown (Larimer Square)",
        city: "Denver, CO",
      },
    ],
  },
];

export function formatShowTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
}

export function getTotalShows(): number {
  return comedians.reduce((total, comedian) => total + comedian.shows.length, 0);
}

export function getTotalComediansSeen(): number {
  return comedians.length;
}

export function getComediansByLatestSeen(): Comedian[] {
  const latestShowDate = (comedian: Comedian) =>
    comedian.shows.reduce((latest, show) => (show.date > latest ? show.date : latest), "");
  return [...comedians].sort((a, b) => latestShowDate(b).localeCompare(latestShowDate(a)));
}

export function getMostRecentlySeenComedian(): Comedian | undefined {
  return getComediansByLatestSeen()[0];
}

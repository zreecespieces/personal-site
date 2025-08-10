export interface Hike {
  name: string;
  location: string;
  date: string; // Format: 'YYYY-MM-DD'
  distance: number; // In miles
  elevation?: number; // In feet
  difficulty: "Easy" | "Moderate" | "Hard" | "Very Hard";
  description?: string;
  images: string[]; // URLs to images
  time?: [number, number]; // [hours, minutes]
}

export interface FavoriteSpot {
  name: string;
  description: string;
  imageUrl?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Create location-based interfaces for grouping
export interface LocationGroup {
  id: string; // Unique identifier
  name: string; // Display name (e.g., "California", "Portugal")
  type: "domestic" | "international"; // Type of location
  totalHikes: number;
  totalDistance: number;
  totalElevation: number;
  hikes: Hike[];
}

export interface HikingStats {
  totalHikes: number;
  totalDistance: number; // In miles
  totalElevation: number; // In feet
  locations: number; // Number of unique locations
  countries: number; // Number of unique countries
  states: number; // Number of unique states (US)
  hardestHike?: string; // Name of hardest hike
  longestHike?: string; // Name of longest hike
}

export const hikes: Hike[] = [
  {
    name: "Cloud's Rest",
    location: "Yosemite, California",
    date: "2020-08-07",
    distance: 12.4,
    elevation: 3116,
    difficulty: "Hard",
    images: ["https://www.citrusmilo.com/yosemite2017/joebraun_cloudsrest14.jpg"],
  },
  {
    name: "Vernal and Nevada Falls via Misty Trail",
    location: "Yosemite, California",
    date: "2020-08-04",
    distance: 6.4,
    elevation: 2208,
    difficulty: "Moderate",
    images: ["https://hikingguy.com/wp-content/uploads/mist-trail-hike-featured.jpg"],
  },
  {
    name: "Upper Yosemite Falls trail",
    location: "Yosemite, California",
    date: "2020-08-05",
    distance: 6.6,
    elevation: 3254,
    difficulty: "Hard",
    images: ["https://www.yosemite.com/wp-content/uploads/2016/05/Yosemite-Falls-in-Fall-Autumn-topaz-enhance-4x-scaled.jpeg"],
  },
  {
    name: "Mariposa Grove of Giant Sequoias",
    location: "Yosemite, California",
    date: "2020-08-06",
    distance: 6.7,
    elevation: 1217,
    difficulty: "Moderate",
    images: ["https://www.yosemite.com/wp-content/uploads/2023/04/bachelor-3-graces-1024x600-AdobeStock_383292495.jpg"],
  },
  {
    name: "The Ozarks",
    location: "Missouri",
    date: "2011-07-01",
    distance: 50,
    difficulty: "Very Hard",
    images: [
      "https://i0.wp.com/www.travelworldmagazine.com/wp-content/uploads/2024/06/LOTO_hahatonka-boat-and-cliff.jpg?fit=1200%2C900&ssl=1",
    ],
  },
  {
    name: "Mt. Yale",
    location: "Colorado",
    date: "2013-07-03",
    distance: 10.3,
    elevation: 4980,
    difficulty: "Very Hard",
    images: ["https://www.14ers.com/images/peaks/p10021.jpg"],
  },
  {
    name: "Trilho da Geira Romana",
    location: "Peneda-Gerês National Park, Portugal",
    date: "2023-09-16",
    distance: 4.4,
    elevation: 780,
    difficulty: "Moderate",
    images: [
      "https://www.alltrails.com/_next/image?url=https%3A%2F%2Fimages.alltrails.com%2FeyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNDg1OTQ2NDcvNzliYmVlODViNmU3Zjg0ZTE4OGRmMDY0NTU2NTc4MDQuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0%3D&w=3840&q=75",
    ],
  },
  {
    name: "Royal Arch Trail",
    location: "Boulder, Colorado",
    date: "2024-09-21",
    distance: 3.3,
    elevation: 1404,
    difficulty: "Hard",
    images: ["https://www.gore-tex.com/sites/default/files/blog_images/royal-arch-trail-guide.jpg"],
  },
  {
    name: "Walker Ranch Loop",
    location: "Boulder, Colorado",
    date: "2024-09-28",
    distance: 7.9,
    elevation: 1610,
    time: [3, 13],
    difficulty: "Hard",
    images: ["https://i0.wp.com/travel2walk.com/wp-content/uploads/2021/09/20_9_walker_ranch-2.jpg?resize=750%2C563&ssl=1"],
  },
  {
    name: "Eldorado Canyon: Eastern Section",
    location: "Boulder, Colorado",
    date: "2024-10-05",
    distance: 4.5,
    elevation: 866,
    difficulty: "Moderate",
    images: ["https://coloradobirdingtrail.com/wp-content/uploads/2024/05/Eldorado-Canyon-State-Park-Boulder-Creek.jpg"],
  },
  {
    name: "South Boulder Creek",
    location: "Boulder, Colorado",
    date: "2024-10-12",
    distance: 3.5,
    elevation: 636,
    difficulty: "Moderate",
    images: [
      "https://bouldercolorado.gov/sites/default/files/styles/hero_image_977x557/public/2021-11/sbcw-trailhead-wildenberg.jpg?itok=AHvphVvm",
    ],
  },
  {
    name: "Castle and Walker's Dream and Meadow",
    location: "Boulder, Colorado",
    date: "2024-10-26",
    distance: 3.9,
    elevation: 465,
    difficulty: "Moderate",
    images: [
      "https://www.alltrails.com/_next/image?url=https%3A%2F%2Fimages.alltrails.com%2FeyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvODIyODcxODUvZGI3NmRmMmUzOTZhODQ4ZTJmOTM1Y2Q4NjE4NjMyNzcuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0%3D&w=3840&q=75",
    ],
  },
  {
    name: "Mount Falcon Park Upper Loop",
    location: "Boulder, Colorado",
    date: "2024-11-02",
    distance: 3.9,
    elevation: 544,
    time: [1, 42],
    difficulty: "Moderate",
    images: ["https://peakvisor.com/img/news/Mount-Falcon-Park-Red-Rocks-Park.jpg"],
  },
  {
    name: "Coyote Song Trail",
    location: "Boulder, Colorado",
    date: "2024-11-09",
    distance: 2.9,
    elevation: 321,
    difficulty: "Easy",
    time: [1, 9],
    images: [
      "https://i.ytimg.com/vi/4YfUa0DynMg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCYGLv-fs2Zs_HXtXiX_MHC1VlJSA",
    ],
  },
  {
    name: "High Dune (Partial)",
    location: "Great Sand Dunes National Park, Colorado",
    date: "2025-05-17",
    distance: 1.4,
    elevation: 164,
    time: [0, 49],
    difficulty: "Easy",
    images: [
      "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNzk1NDQzOTAvMjdiYTE3NmNjZjhlYjdmYWM0OGE4YzMxN2E1MDJjNWMuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ==",
    ],
  },
  {
    name: "Mosca Pass Trail",
    location: "Great Sand Dunes National Park, Colorado",
    date: "2025-05-18",
    distance: 6.2,
    elevation: 1407,
    time: [2, 35],
    difficulty: "Moderate",
    images: [
      "https://www.alltrails.com/api/alltrails/v2/trails/10031845/photos/0?size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i",
    ],
  },
  {
    name: "Sand Canyon Trail",
    location: "Canyon of The Ancients, Colorado",
    date: "2025-05-19",
    distance: 4.4,
    elevation: 531,
    time: [2, 3],
    difficulty: "Moderate",
    images: [
      "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNzM1MzU0NzEvZTA2ZTc5NmNmNDg0MDFhMjVhM2FiNmZmMzFlOWUwMzUuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0=",
    ],
  },
  {
    name: "Square Tower Group Loop",
    location: "Hovenweep National Monument, Utah",
    date: "2025-05-19",
    distance: 1.8,
    elevation: 157,
    time: [0, 55],
    difficulty: "Easy",
    images: [
      "https://www.alltrails.com/api/alltrails/v2/maps/314654233/photos/0?size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i",
    ],
  },
  {
    name: "Corona and Bowtie Arch Trail",
    location: "Moab, Utah",
    date: "2025-05-21",
    distance: 1.9,
    elevation: 463,
    time: [0, 59],
    difficulty: "Moderate",
    images: [
      "https://www.alltrails.com/api/alltrails/v2/trails/10072196/photos/0?size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i",
    ],
  },
  {
    name: "Pinto Arch Trail",
    location: "Moab, Utah",
    date: "2025-05-21",
    distance: 1.7,
    elevation: 318,
    time: [0, 50],
    difficulty: "Easy",
    images: [
      "https://www.alltrails.com/api/alltrails/v2/trails/10304149/photos/0?size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i",
    ],
  },
  {
    name: "Grandstaff Trail",
    location: "Moab, Utah",
    date: "2025-05-22",
    distance: 4.8,
    elevation: 459,
    time: [2, 22],
    difficulty: "Moderate",
    images: [
      "https://www.alltrails.com/api/alltrails/v2/trails/10024284/photos/0?size=larger_wide&key=3p0t5s6b5g4g0e8k3c1j3w7y5c3m4t8i",
    ],
  },
  {
    name: "Dinosaur Ridge",
    location: "Morrison, Colorado",
    date: "2025-07-20",
    distance: 3.8,
    elevation: 696,
    time: [1, 32],
    difficulty: "Easy",
    images: [
      "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNDgzNjcxOTAvMGQzYWVjYTlkMWNmNTA3NDk1OTEzNjA5NTY0NTQ5ZTQuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ==",
    ],
  },
  {
    name: "Lost Lake via Hessie Trail",
    location: "Nederland, Colorado",
    date: "2025-08-09",
    distance: 4.7,
    elevation: 843,
    time: [2, 20],
    difficulty: "Moderate",
    images: ["https://cdn.5280.com/2015/07/lostlake.jpg"],
  },
];

// Group hikes by location using last word in location string
export const groupHikesByLocation = (): LocationGroup[] => {
  const locationMap = new Map<string, { hikes: Hike[]; type: "domestic" | "international" }>();

  hikes.forEach((hike) => {
    // Extract state or country from location
    const parts = hike.location.split(", ");
    let locationKey = parts[parts.length - 1]; // Get the last part (state or country)

    // Determine if domestic or international
    const type = ["California", "Colorado", "Missouri", "Utah"].includes(locationKey) ? "domestic" : "international";

    if (!locationMap.has(locationKey)) {
      locationMap.set(locationKey, { hikes: [], type });
    }

    locationMap.get(locationKey)?.hikes.push(hike);
  });

  // Convert map to array of location groups
  return Array.from(locationMap.entries())
    .map(([name, data]) => {
      const { hikes: locationHikes, type } = data;

      // Calculate statistics for this location
      const totalHikes = locationHikes.length;
      const totalDistance = locationHikes.reduce((sum, hike) => sum + hike.distance, 0);
      const totalElevation = locationHikes.reduce((sum, hike) => sum + (hike.elevation || 0), 0);

      // Sort hikes by date (most recent first)
      const sortedHikes = [...locationHikes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return {
        id: name.toLowerCase().replace(/\s+/g, "-"),
        name,
        type,
        totalHikes,
        totalDistance,
        totalElevation,
        hikes: sortedHikes,
      };
    })
    .sort((a, b) => {
      // Sort domestic locations first, then by name
      if (a.type !== b.type) {
        return a.type === "domestic" ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
};

// Calculate hiking stats
export const calculateHikeStats = (): HikingStats => {
  const totalHikes = hikes.length;
  const totalDistance = hikes.reduce((sum, hike) => sum + hike.distance, 0);
  const totalElevation = hikes.reduce((sum, hike) => sum + (hike.elevation || 0), 0);

  // Find hardest hike
  const difficultyMap = { Easy: 1, Moderate: 2, Hard: 3, "Very Hard": 4 };
  const hardestHike = hikes.reduce((hardest, current) => {
    return difficultyMap[current.difficulty] > difficultyMap[hardest.difficulty] ? current : hardest;
  }, hikes[0]);

  // Find longest hike
  const longestHike = hikes.reduce((longest, current) => {
    return current.distance > longest.distance ? current : longest;
  }, hikes[0]);

  // Count unique locations
  const uniqueLocations = new Set(hikes.map((hike) => hike.location));

  // Count countries and states
  const countries = new Set();
  const states = new Set();

  hikes.forEach((hike) => {
    const parts = hike.location.split(", ");
    const lastPart = parts[parts.length - 1];

    if (["California", "Colorado", "Missouri"].includes(lastPart)) {
      states.add(lastPart);
    } else {
      countries.add(lastPart);
    }
  });

  return {
    totalHikes,
    totalDistance,
    totalElevation,
    locations: uniqueLocations.size,
    countries: countries.size,
    states: states.size,
    hardestHike: hardestHike.name,
    longestHike: longestHike.name,
  };
};

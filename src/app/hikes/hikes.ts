export interface Hike {
  name: string;
  location: string;
  date: string; // Format: 'YYYY-MM-DD'
  distance: number; // In miles
  elevation: number; // In feet
  duration: string; // e.g., '3h 45m'
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Very Hard';
  rating: number; // 1-5
  description?: string;
  images: string[]; // URLs to images
  trailMapUrl?: string; // Optional link to AllTrails or other trail maps
  favoriteSpots?: FavoriteSpot[];
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

export interface HikeStats {
  totalHikes: number;
  totalDistance: number; // miles
  totalElevation: number; // feet
  hardestHike?: string; // Name of hardest hike
  highestRated?: string; // Name of highest rated hike
  longestHike?: string; // Name of longest hike
}

export const hikes: Hike[] = [
  {
    name: "Angel's Landing",
    location: "Zion National Park, Utah",
    date: "2024-05-15",
    distance: 5.4,
    elevation: 1488,
    duration: "4h 30m",
    difficulty: "Hard",
    rating: 5,
    description: "One of the most thrilling hikes in the US, featuring chain-assisted sections along steep drop-offs and breathtaking views of Zion Canyon.",
    images: [
      "https://www.nps.gov/zion/planyourvisit/images/Angels-Landing-from-across-the-canyon_1.jpg",
      "https://www.nps.gov/zion/planyourvisit/images/Angels-Landing_1.jpg",
      "https://www.nps.gov/zion/planyourvisit/images/Angels-Landing-Photo-by-CJYoung_1.jpg"
    ],
    trailMapUrl: "https://www.alltrails.com/trail/us/utah/angels-landing-trail",
    favoriteSpots: [
      {
        name: "Scout Lookout",
        description: "The stopping point before the chains section begins, offering panoramic views and a great place to rest.",
        imageUrl: "https://www.nps.gov/zion/planyourvisit/images/Angels-Landing_1.jpg"
      },
      {
        name: "The Spine",
        description: "The final ridge to the summit with chains and stunning 360-degree views.",
        imageUrl: "https://www.nps.gov/zion/planyourvisit/images/Angels-Landing-from-across-the-canyon_1.jpg"
      }
    ]
  },
  {
    name: "Half Dome",
    location: "Yosemite National Park, California",
    date: "2024-07-22",
    distance: 16.0,
    elevation: 4800,
    duration: "12h 00m",
    difficulty: "Very Hard",
    rating: 5,
    description: "An iconic hike featuring cable-assisted climbing to the summit of the famous Half Dome. The panoramic views of Yosemite Valley are unparalleled.",
    images: [
      "https://www.yosemite.com/wp-content/uploads/2016/04/half-dome-permits.jpg",
      "https://www.nps.gov/yose/planyourvisit/images/hd-cables.jpg",
      "https://www.nps.gov/yose/planyourvisit/images/half-dome-view-from-glacier.jpg"
    ],
    trailMapUrl: "https://www.alltrails.com/trail/us/california/half-dome-trail",
    favoriteSpots: [
      {
        name: "Nevada Fall",
        description: "A stunning 594-foot waterfall along the trail with beautiful views of Liberty Cap.",
        imageUrl: "https://www.nps.gov/common/uploads/grid_builder/yose/crop1_1/F8EF46BA-A854-9BCD-7044D5C1B6F1E74E.jpg"
      },
      {
        name: "The Cables",
        description: "The famous steel cables that allow hikers to climb the final 400 vertical feet to the summit without rock climbing equipment.",
        imageUrl: "https://www.nps.gov/yose/planyourvisit/images/hd-cables.jpg"
      }
    ]
  },
  {
    name: "Delicate Arch",
    location: "Arches National Park, Utah",
    date: "2023-10-05",
    distance: 3.0,
    elevation: 480,
    duration: "2h 00m",
    difficulty: "Moderate",
    rating: 4.5,
    description: "A beautiful hike to Utah's most famous natural arch. The arch is particularly stunning at sunset when the red rock glows.",
    images: [
      "https://www.nps.gov/arch/learn/nature/images/delicate-arch-1200px.jpg",
      "https://www.nps.gov/arch/planyourvisit/images/tugy0619.jpg",
      "https://www.nps.gov/arch/planyourvisit/images/delicate-arch-stars.jpg"
    ],
    trailMapUrl: "https://www.alltrails.com/trail/us/utah/delicate-arch-trail",
    favoriteSpots: [
      {
        name: "Viewpoint Bowl",
        description: "The natural amphitheater surrounding Delicate Arch, perfect for sitting and admiring the arch.",
        imageUrl: "https://www.nps.gov/arch/learn/nature/images/delicate-arch-1200px.jpg"
      }
    ]
  },
  {
    name: "Emerald Lake",
    location: "Rocky Mountain National Park, Colorado",
    date: "2023-08-12",
    distance: 3.6,
    elevation: 650,
    duration: "2h 30m",
    difficulty: "Moderate",
    rating: 4.5,
    description: "A popular trail passing by several beautiful alpine lakes including Nymph Lake, Dream Lake, and finally Emerald Lake, all set against a backdrop of stunning peaks.",
    images: [
      "https://www.nps.gov/romo/planyourvisit/images/Bear-Lake-Area_1.jpg",
      "https://www.nps.gov/common/uploads/grid_builder/imr/crop16_9/FCCA8F69-1DD8-B71B-0BF8FBB30E20A9DE.jpg",
      "https://www.nps.gov/romo/learn/nature/images/dream-lake_1.jpg"
    ],
    trailMapUrl: "https://www.alltrails.com/trail/us/colorado/emerald-lake-trail",
    favoriteSpots: [
      {
        name: "Dream Lake",
        description: "A spectacular mountain lake along the trail with perfect reflections of the surrounding peaks.",
        imageUrl: "https://www.nps.gov/romo/learn/nature/images/dream-lake_1.jpg"
      },
      {
        name: "Emerald Lake Vista",
        description: "The end of the trail with amazing views of Hallett Peak and Flattop Mountain reflected in the lake.",
        imageUrl: "https://www.nps.gov/common/uploads/grid_builder/imr/crop16_9/FCCA8F69-1DD8-B71B-0BF8FBB30E20A9DE.jpg"
      }
    ]
  },
  {
    name: "Avalanche Lake",
    location: "Glacier National Park, Montana",
    date: "2023-07-07",
    distance: 4.5,
    elevation: 730,
    duration: "3h 15m",
    difficulty: "Moderate",
    rating: 4.8,
    description: "A beautiful hike along Avalanche Creek through cedar and hemlock forest, ending at a stunning lake surrounded by steep cliffs with cascading waterfalls.",
    images: [
      "https://www.nps.gov/glac/planyourvisit/images/Avalanche-Lake.jpg",
      "https://www.nps.gov/common/uploads/grid_builder/glac/crop16_9/FD49899A-1DD8-B71B-0BD1B9A1EBB29E23.jpg",
      "https://www.nps.gov/glac/planyourvisit/images/DSC00288-copy.jpg"
    ],
    trailMapUrl: "https://www.alltrails.com/trail/us/montana/avalanche-lake-via-the-trail-of-the-cedars",
    favoriteSpots: [
      {
        name: "Trail of the Cedars",
        description: "A beautiful boardwalk section through ancient cedars at the beginning of the trail.",
        imageUrl: "https://www.nps.gov/glac/planyourvisit/images/trail-cedars-10.jpg"
      },
      {
        name: "Avalanche Gorge",
        description: "A narrow, crystal-clear turquoise stream cutting through a gorge with stunning views.",
        imageUrl: "https://www.nps.gov/common/uploads/grid_builder/glac/crop16_9/FD49899A-1DD8-B71B-0BD1B9A1EBB29E23.jpg"
      }
    ]
  }
];

// Calculate hiking stats
export const calculateHikeStats = (): HikeStats => {
  const totalHikes = hikes.length;
  const totalDistance = hikes.reduce((sum, hike) => sum + hike.distance, 0);
  const totalElevation = hikes.reduce((sum, hike) => sum + hike.elevation, 0);
  
  // Find hardest hike
  const difficultyMap = { 'Easy': 1, 'Moderate': 2, 'Hard': 3, 'Very Hard': 4 };
  const hardestHike = hikes.reduce((hardest, current) => {
    return difficultyMap[current.difficulty] > difficultyMap[hardest.difficulty] ? current : hardest;
  }, hikes[0]);
  
  // Find highest rated hike
  const highestRated = hikes.reduce((highest, current) => {
    return current.rating > highest.rating ? current : highest;
  }, hikes[0]);
  
  // Find longest hike
  const longestHike = hikes.reduce((longest, current) => {
    return current.distance > longest.distance ? current : longest;
  }, hikes[0]);
  
  return {
    totalHikes,
    totalDistance,
    totalElevation,
    hardestHike: hardestHike.name,
    highestRated: highestRated.name,
    longestHike: longestHike.name
  };
};

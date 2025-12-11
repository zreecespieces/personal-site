export interface Course {
  id: string;
  title: string;
  provider: string;
  category: "mathematics" | "programming" | "philosophy" | "languages" | "other";
  startDate: string; // Format: 'YYYY-MM-DD'
  endDate?: string; // Format: 'YYYY-MM-DD', optional if ongoing
  progress: number; // Percentage completion (0-100)
  mastery: number; // Percentage mastery (0-100)
  description?: string;
  imageUrl?: string;
  courseUrl?: string;
  certificateUrl?: string;
  skills?: string[];
  modules?: CourseModule[];
}

export interface CourseModule {
  title: string;
  progress: number; // Percentage completion (0-100)
  mastery: number; // Percentage mastery (0-100)
}

export interface CourseStats {
  totalCourses: number;
  inProgressCourses: number;
  completedCourses: number;
  averageMastery: number;
  categoryCounts: Record<string, number>;
}

// Streak interface for tracking daily/weekly activity
export interface Streak {
  currentStreak: number; // Current continuous streak count
  longestStreak: number; // Longest streak achieved
  unit: "day" | "week"; // Streak counting unit
  lastActivity: string; // Format: 'YYYY-MM-DD'
  streakData: StreakDay[]; // Last 30 days of activity data
}

export interface StreakDay {
  date: string; // Format: 'YYYY-MM-DD'
  active: boolean; // Whether there was activity on this day
  minutesSpent?: number; // Optional minutes spent studying
}

export const courses: Course[] = [
  {
    id: "khan-ap-calc-prep",
    title: "Get Ready for AP Calculus",
    provider: "Khan Academy",
    category: "mathematics",
    startDate: "2023-11-01",
    progress: 99,
    mastery: 99,
    description:
      "A comprehensive preparation course covering all the prerequisite topics needed for AP Calculus, including functions, trigonometry, and limits.",
    imageUrl: "https://cdn.kastatic.org/genfiles/topic-icons/icons/polynomial_functions.png-9054bb-128c.png",
    courseUrl: "https://www.khanacademy.org/math/get-ready-for-ap-calc",
  },
  {
    id: "khan-ap-calc-bc",
    title: "AP Calculus BC",
    provider: "Khan Academy",
    category: "mathematics",
    startDate: "2024-07-01",
    progress: 96,
    mastery: 96,
    description:
      "Complete AP Calculus BC curriculum covering differential and integral calculus, as well as advanced topics such as infinite series and parametric equations.",
    imageUrl: "https://cdn.kastatic.org/genfiles/topic-icons/icons/ap_calculus_ab.png-60df6c-128c.png",
    courseUrl: "https://www.khanacademy.org/math/ap-calculus-bc",
  },
  {
    id: "khan-multivariable-calc",
    title: "Multivariable Calculus",
    provider: "Khan Academy",
    category: "mathematics",
    startDate: "2025-01-13",
    progress: 93,
    mastery: 93,
    description:
      "Advanced calculus course covering functions of multiple variables, partial derivatives, multiple integrals, and vector calculus.",
    imageUrl: "https://cdn.kastatic.org/genfiles/topic-icons/icons/multivariable_calculus.png-ac2283-128c.png",
    courseUrl: "https://www.khanacademy.org/math/multivariable-calculus",
  },
];

// Khan Academy streak data
export const khanAcademyStreak: Streak = {
  currentStreak: 19, // 19 week streak
  longestStreak: 19, // 19 weeks was the longest
  unit: "week",
  lastActivity: "2025-03-12", // Today's date
  streakData: [
    // Generate last 8 weeks of activity (most recent first)
    { date: "2025-03-12", active: true, minutesSpent: 45 }, // Today
    { date: "2025-03-05", active: true, minutesSpent: 60 },
    { date: "2025-02-26", active: true, minutesSpent: 75 },
    { date: "2025-02-19", active: true, minutesSpent: 90 },
    { date: "2025-02-12", active: true, minutesSpent: 50 },
    { date: "2025-02-05", active: true, minutesSpent: 65 },
    { date: "2025-01-29", active: true, minutesSpent: 40 },
    { date: "2025-01-22", active: true, minutesSpent: 55 },
    // Example of some missed weeks before the current streak
    { date: "2025-01-15", active: false },
    { date: "2025-01-08", active: true, minutesSpent: 70 },
    { date: "2025-01-01", active: true, minutesSpent: 30 },
    { date: "2024-12-25", active: false },
  ],
};

// Calculate course statistics
export const calculateCourseStats = (): CourseStats => {
  const totalCourses = courses.length;
  const completedCourses = courses.filter((course) => course.progress === 100).length;
  const inProgressCourses = totalCourses - completedCourses;

  // Calculate average mastery
  const totalMastery = courses.reduce((sum, course) => sum + course.mastery, 0);
  const averageMastery = totalMastery / totalCourses;

  // Count courses by category
  const categoryCounts: Record<string, number> = {};
  courses.forEach((course) => {
    categoryCounts[course.category] = (categoryCounts[course.category] || 0) + 1;
  });

  return {
    totalCourses,
    inProgressCourses,
    completedCourses,
    averageMastery,
    categoryCounts,
  };
};

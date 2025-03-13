export interface Course {
  id: string;
  title: string;
  provider: string;
  category: 'mathematics' | 'programming' | 'philosophy' | 'languages' | 'other';
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

export const courses: Course[] = [
  {
    id: "khan-ap-calc-prep",
    title: "Getting Ready for AP Calculus",
    provider: "Khan Academy",
    category: "mathematics",
    startDate: "2025-01-15",
    progress: 85,
    mastery: 78,
    description: "A comprehensive preparation course covering all the prerequisite topics needed for AP Calculus, including functions, trigonometry, and limits.",
    imageUrl: "https://cdn.kastatic.org/images/khan-logo-dark-background.new.png",
    courseUrl: "https://www.khanacademy.org/math/get-ready-for-ap-calc",
    skills: ["Algebra", "Trigonometry", "Functions", "Limits"],
    modules: [
      { title: "Foundational Concepts", progress: 100, mastery: 92 },
      { title: "Functions & Graphs", progress: 100, mastery: 85 },
      { title: "Trigonometric Functions", progress: 90, mastery: 78 },
      { title: "Limits & Continuity", progress: 65, mastery: 62 },
    ]
  },
  {
    id: "khan-ap-calc-bc",
    title: "AP Calculus BC",
    provider: "Khan Academy",
    category: "mathematics",
    startDate: "2025-02-01",
    progress: 62,
    mastery: 58,
    description: "Complete AP Calculus BC curriculum covering differential and integral calculus, as well as advanced topics such as infinite series and parametric equations.",
    imageUrl: "https://cdn.kastatic.org/images/khan-logo-dark-background.new.png",
    courseUrl: "https://www.khanacademy.org/math/ap-calculus-bc",
    skills: ["Derivatives", "Integrals", "Series", "Parametric Equations", "Polar Coordinates"],
    modules: [
      { title: "Limits & Derivatives", progress: 100, mastery: 87 },
      { title: "Applications of Derivatives", progress: 85, mastery: 76 },
      { title: "Integration", progress: 75, mastery: 68 },
      { title: "Applications of Integration", progress: 60, mastery: 54 },
      { title: "Sequences & Series", progress: 35, mastery: 32 },
      { title: "Parametric & Polar", progress: 20, mastery: 15 },
    ]
  },
  {
    id: "khan-multivariable-calc",
    title: "Multivariable Calculus",
    provider: "Khan Academy",
    category: "mathematics",
    startDate: "2025-02-20",
    progress: 35,
    mastery: 31,
    description: "Advanced calculus course covering functions of multiple variables, partial derivatives, multiple integrals, and vector calculus.",
    imageUrl: "https://cdn.kastatic.org/images/khan-logo-dark-background.new.png",
    courseUrl: "https://www.khanacademy.org/math/multivariable-calculus",
    skills: ["Partial Derivatives", "Multiple Integrals", "Vector Calculus", "Line Integrals", "Green's Theorem"],
    modules: [
      { title: "Vectors & Spaces", progress: 90, mastery: 82 },
      { title: "Multivariable Functions", progress: 75, mastery: 68 },
      { title: "Partial Derivatives", progress: 40, mastery: 33 },
      { title: "Multiple Integrals", progress: 15, mastery: 12 },
      { title: "Vector Calculus", progress: 0, mastery: 0 },
    ]
  },
];

// Calculate course statistics
export const calculateCourseStats = (): CourseStats => {
  const totalCourses = courses.length;
  const completedCourses = courses.filter(course => course.progress === 100).length;
  const inProgressCourses = totalCourses - completedCourses;
  
  // Calculate average mastery
  const totalMastery = courses.reduce((sum, course) => sum + course.mastery, 0);
  const averageMastery = totalMastery / totalCourses;
  
  // Count courses by category
  const categoryCounts: Record<string, number> = {};
  courses.forEach(course => {
    categoryCounts[course.category] = (categoryCounts[course.category] || 0) + 1;
  });
  
  return {
    totalCourses,
    inProgressCourses,
    completedCourses,
    averageMastery,
    categoryCounts
  };
};

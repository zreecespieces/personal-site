import { formatCalendarDate } from "@/lib/dates";

export interface TeachingCourse {
  slug: string;
  title: string;
  url: string;
  image: string;
  releaseDate: string; // YYYY-MM; release months supplied by Zach, not last-updated dates.
  duration: string;
  lectures: number;
  description: string;
  topics: string[];
}

/** Combined reach supplied by Zach; not a live sum of public enrollment counts. */
export const teachingImpact = {
  students: "22,500+",
  countries: 150,
  reviews: "Over 3,000",
};

export const udemyProfileUrl = "https://www.udemy.com/user/zacharyreece/";
export const udemyProjectUrl = "/projects/udemy-courses";

export const formatReleaseMonth = (date: string) =>
  formatCalendarDate(`${date}-01`, { month: "long", year: "numeric" });

// Course artwork, curriculum, and length checked against the official Udemy pages.
export const teachingCourses: TeachingCourse[] = [
  {
    slug: "high-fidelity-designs",
    title: "Implement High Fidelity Designs with Material-UI and ReactJS",
    url: "https://www.udemy.com/course/implement-high-fidelity-designs-with-material-ui-and-reactjs/",
    image: "https://img-c.udemycdn.com/course/480x270/2534378_1ac2_2.jpg",
    releaseDate: "2020-01",
    duration: "40h 41m",
    lectures: 247,
    description:
      "Build a polished React application from a high-fidelity design, translating layouts into responsive Material-UI components. Follow the project through theming, animation, a migration to Next.js, and production deployment.",
    topics: [
      "Material-UI v4 components, theming, and responsive layouts",
      "UI/UX design, animation, and cross-browser styling",
      "Next.js, SEO, Firebase functions, and Google Analytics",
    ],
  },
  {
    slug: "jamstack-e-commerce",
    title: "A Complete Guide to the JAMstack and React E-Commerce",
    url: "https://www.udemy.com/course/a-complete-guide-to-the-jamstack-and-react-e-commerce/",
    image: "https://img-c.udemycdn.com/course/480x270/3480632_eb33_3.jpg",
    releaseDate: "2021-07",
    duration: "78h 56m",
    lectures: 483,
    description:
      "Build a complete online store with React, Gatsby, and a Strapi headless CMS. Connect frontend and backend with GraphQL, then implement customer accounts, product inventory, checkout, and payments before deploying the application.",
    topics: [
      "Gatsby, Strapi, GraphQL, Apollo, and Material-UI",
      "JWT authentication, React Context, and social sign-in",
      "Stripe checkout, reviews, favorites, subscriptions, and deployment",
    ],
  },
  {
    slug: "mastering-mui",
    title: "Mastering MUI (Material UI): Component Customization [2024]",
    url: "https://www.udemy.com/course/mastering-mui-component-customization/",
    image: "https://img-c.udemycdn.com/course/480x270/5716276_dbcc_3.jpg",
    releaseDate: "2024-02",
    duration: "25h 19m",
    lectures: 215,
    description:
      "Go beyond MUI's default appearance with a component-by-component guide to customization. Learn the styling and theming foundations, inspect how components work under the hood, and practice with assignments, quizzes, and a final mastery assessment.",
    topics: [
      "Component props, style overrides, the sx prop, and reusable themes",
      "Responsive design and Grid-based layouts",
      "Input, display, feedback, surface, navigation, and utility components",
    ],
  },
];

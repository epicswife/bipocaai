import { Course } from "@/lib/types";

// Mock data for BlackFacts lessons
const mockLessons: Course[] = [
  {
    id: "1",
    title: "The Civil Rights Movement",
    source: "BlackFacts.com",
    isFeatured: true,
    description: "",
    contentType: "video",
    language: ""
  },
  {
    id: "2",
    title: "African American Inventors",
    source: "BlackFacts.com",
    isFeatured: true,
    description: "",
    contentType: "video",
    language: ""
  },
  {
    id: "3",
    title: "Harlem Renaissance",
    source: "BlackFacts.com",
    isFeatured: true,
    description: "",
    contentType: "video",
    language: ""
  },
  {
    id: "4",
    title: "Black History in STEM",
    source: "BlackFacts.com",
    isFeatured: false,
    description: "",
    contentType: "video",
    language: ""
  },
];

export const fetchBlackFactsLessons = async () => {
  // Simulate API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockLessons;
};
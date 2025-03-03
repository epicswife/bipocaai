import { Course } from "@/lib/types";

export async function fetchBlackFactsLessons(): Promise<Course[]> {
  // Mock API call simulating BlackFacts.com data
  return new Promise((resolve) => {
    setTimeout(() => {
      const lessons: Course[] = [
        {
          id: "blackfacts-1",
          title: "Civil Rights Movement",
          description: "Explore the key events and figures of the Civil Rights Movement in the United States.",
          source: "BlackFacts.com",
          contentType: "video",
          language: "English",
          isFeatured: true,
        },
        {
          id: "blackfacts-2",
          title: "Harlem Renaissance",
          description: "Learn about the cultural explosion of art, music, and literature in Harlem during the 1920s.",
          source: "BlackFacts.com",
          contentType: "text",
          language: "English",
          isFeatured: true,
        },
        {
          id: "blackfacts-3",
          title: "Rosa Parks’ Legacy",
          description: "Discover the impact of Rosa Parks’ activism on the Civil Rights Movement.",
          source: "BlackFacts.com",
          contentType: "pdf",
          language: "English",
          isFeatured: false,
        },
      ];
      resolve(lessons);
    }, 1000); // Simulate network delay
  });
}
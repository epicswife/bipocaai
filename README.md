# BIPOCA AI - Revolutionizing Education with AI and Inclusion

BIPOCA AI is a transformative educational platform designed to empower Black, Indigenous, People of Color (BIPOC), and Allies worldwide through cutting-edge AI-driven learning. Built with a futuristic aesthetic featuring neon gold (#FFD700) and cyan (#00CED1) colors, glassmorphism effects, and a culturally responsive approach, our platform delivers personalized education, accessibility, and inclusivity. Our mission is to break down educational barriers by providing a globally accessible, secure, and inclusive learning environment for all, regardless of location, device, or ability.

## What Is Being Built

### Project Overview
BIPOCA AI aims to create a next-generation educational platform that leverages AI to deliver personalized learning experiences while prioritizing accessibility, inclusivity, and cultural relevance. The platform is being developed as a single-page application (SPA) using Next.js 15, with a focus on the following core objectives:
- **Personalized Education**: AI-driven learning paths, adaptive quizzes, and smart search functionality to cater to individual student needs.
- **Global Accessibility**: Support for multiple languages, right-to-left (RTL) layouts, offline capability, and accessibility features for users with disabilities, including those with Intellectual and Developmental Disabilities (IDD).
- **Teacher Empowerment**: Customizable teacher classrooms managed via Sanity.io, allowing educators to create and style their own content, with upcoming support for live classes.
- **Cultural Relevance**: Integration of content from partners like BlackFacts.com, Friends of the African Union, and Legacy Education to provide culturally rich educational materials.
- **Scalability and Performance**: Hosted on Cloudflare Pages with optimizations via Cloudflare Workers, Stream, and KV for global reach, fast performance, and video streaming.

### Transparency Statement
We are committed to full transparency in the development of BIPOCA AI. Here’s the current status as of March 05, 2025:
- **Completed Features**:
  - Personalized learning paths and adaptive quizzes using AI.
  - Responsive design with light/dark themes, featuring a futuristic neon aesthetic (gold/cyan palette, glassmorphism effects).
  - Secure user authentication and data storage via Firebase.
  - Live Classes System:
    * Real-time class listing with status tracking for students
    * Class creation and management for teachers
    * Start/end functionality with real-time updates
  - Assignments System:
    * Assignment creation and management for teachers
    * Student submission tracking and grading
    * Real-time updates and progress tracking
  - Achievements System:
    * Student progress tracking
    * Real-time achievement updates
  - AI-driven IEP support for students with special needs.
  - Integration with BlackFacts.com content (currently using mock data due to lack of a public API).
  - Teacher classrooms managed via Sanity.io, allowing teachers to add content and customize colors.
  - Fixed logo background in `app/page.tsx` with a radial gradient.
  - Adjusted text colors in dark mode for optimal visibility.
- **In Progress**:
  - Multilingual support with `next-intl` for translations, RTL layouts, and text-to-speech accessibility.
- **Challenges**:
  - BlackFacts.com lacks a public API, so we’re using Sanity to store lesson data manually. We plan to explore scraping with permission or build a custom API via Cloudflare Workers.
  - Testing framework setup is deferred until core features are complete to focus on functionality.
- **Development Approach**:
  - We’re building iteratively, prioritizing user-facing features (e.g., multilingual support, accessibility) before backend optimizations (e.g., API integrations).
  - All changes are version-controlled via Git, with detailed commit messages for transparency.
  - We’re following a futuristic design philosophy, ensuring all UI components use Tailwind CSS with neon colors and glassmorphism effects.

### Architecture Overview
BIPOCA AI is architected as a modern web application with the following structure:
- **Frontend**:
  - Built with Next.js 15.2 and React 19, using TypeScript for type safety.
  - Styled with Tailwind CSS, featuring a neon gold/cyan color scheme and glassmorphism effects (e.g., `backdrop-blur-md` for frosted glass).
  - Animations powered by Framer Motion for smooth transitions (e.g., hero section fade-ins, card hover effects).
  - State management handled by Zustand for lightweight, global state.
- **Content Management**:
  - Sanity.io manages dynamic content, including lessons, teacher classrooms, and upcoming live class details.
  - Schemas defined in `sanity-studio/schemas/` (e.g., `classroom`, `teacher`) allow teachers to customize content and colors.
- **Backend & Data**:
  - Firebase handles user authentication (Email/Password), Firestore for user data, and Storage for file uploads.
  - Cloudflare Workers are used for custom APIs, caching, and content moderation.
  - Cloudflare KV provides key-value storage for caching (e.g., lesson data).
- **Hosting & Optimization**:
  - Hosted on Cloudflare Pages for global CDN distribution and fast load times.
  - Cloudflare Stream will power live class video streaming with recording and captioning.
- **File Structure**:
  - `src`: Source code for the application.
  - `public`: Static assets (e.g., images, icons).
  - `sanity-studio`: Studio configuration for Sanity.io. (too be installed)
  - `app`: Next.js application pages.
  - `components`: Reusable UI components.
  - `lib`: Shared libraries (e.g., authentication, database).


## Key Features (Detailed Breakdown)

- 🎓 **AI-Powered Learning**:
- Personalized learning paths tailored to each student’s pace and style.
- Adaptive quizzes that adjust difficulty based on performance.
- Smart search functionality (placeholder for Perplexity AI integration) to help students find resources instantly.

- 🌈 **Accessibility First**:
- Light and dark themes with neon gold (#FFD700) and cyan (#00CED1) colors.
- Screen reader support and keyboard navigation (to be enhanced with All in One Accessibility plugin).
- Upcoming user settings for font size, contrast, and other preferences, stored in Firebase.

- 📱 **Responsive Design**:
- Fully responsive across all devices (desktop, tablet, smartphone).
- Upcoming offline capability using Next.js SSG/ISR, Cloudflare caching, and Firebase offline support.

- 🔒 **Secure Authentication**:
- Firebase Authentication with Email/Password provider.
- User role management (student/teacher) with protected routes.
- Firestore for user data, protected with comprehensive security rules.
- Storage bucket for secure file uploads.

- 🎯 **IEP Support**:
- AI-driven Individualized Education Programs (IEPs) for students with special needs.
- Support for Intellectual and Developmental Disabilities (IDD) with calming tools and voice navigation (upcoming).

- 🌍 **Cultural Integration**:
- Content from BlackFacts.com (currently mock data in `src/services/blackfacts.ts`).
- Partnerships with Friends of the African Union and Legacy Education for culturally rich materials.
- Displayed in the "Featured Lessons" section on the homepage (`app/page.tsx`).

- 🏫 **Teacher Classrooms**:
- Teachers can create and manage classrooms via Sanity.io.
- Customizable colors (primary and secondary) for classroom styling, applied to cards, borders, and buttons.
- Displayed in the "Explore Teacher Classrooms" section on the homepage (`app/page.tsx`).

- 🎥 **Live Class Support**:
- Real-time video streaming using Cloudflare Stream, with recording and captioning.
- Real-time chat via Firebase for student interaction.
- Live class details (e.g., stream URL, chat history) will be managed in Sanity.io.

- 🌐 **Multilingual Support** (In Progress):
- Translations using `next-intl` for multiple languages.
- Right-to-left (RTL) layouts for languages like Arabic, using Tailwind CSS.
- Text-to-speech accessibility via the Web Speech API.

## Tech Stack

- **Frontend**: Next.js 15.2, React 19, TypeScript
- **UI & Animation**: Tailwind CSS, Radix UI, Framer Motion
- **Content Management**: Sanity.io (for lessons, teacher classrooms, live class details)
- **Backend & Data**: Firebase (Authentication, Firestore, Storage), Cloudflare Workers (custom APIs, caching), Cloudflare KV (key-value storage)
- **State Management**: Zustand
- **Accessibility**: All in One Accessibility plugin, Web Speech API (for text-to-speech)
- **Hosting & Optimization**: Cloudflare Pages, Cloudflare Stream (video streaming)
- **Styling Guidelines**: Neon gold (#FFD700) and cyan (#00CED1) palette, glassmorphism effects, futuristic design

## Prerequisites

- **Node.js**: 20.x or higher
- **npm**: 10.x or higher
- **Firebase Account**: Configured project with Authentication, Firestore, and Storage enabled
- **Sanity.io Account**: For content management (free tier sufficient for development)

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/epicswife/bipoca_ai_new.git
   cd bipoca_ai_new
   ```

2. **Install Dependencies**
   ```bash
   npm install

3. **Set up Firebase**
- Create a Firebase project in the Firebase Console
- Enable Authentication, Firestore, and Storage
- Add Firebase configuration to `src/lib/firebase.ts`

4. **Set up Sanity.io**
- Create a Sanity.io project
- Configure the studio in `sanity-studio` directory
- Add necessary schemas for content management

5. **Run the Application**
   ```bash
   npm run dev
   ```   
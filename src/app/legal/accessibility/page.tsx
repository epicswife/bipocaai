export default function AccessibilityPage() {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-orbitron font-bold text-black dark:text-white mb-8">Accessibility Statement</h1>
        <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
          <p className="text-gray-700 dark:text-gray-300">
            BIPOCA AI is committed to accessibility for all users, including those with intellectual, mental, physical, and sensory disabilities.
          </p>
          <h2 className="text-2xl font-semibold text-black dark:text-white mt-6 mb-4">Features</h2>
          <p className="text-gray-700 dark:text-gray-300">
            - **Intellectual Disabilities:** Simple mode with easy words and visuals.<br />
            - **Mental Disabilities:** Calming tools for distress.<br />
            - **Physical Disabilities:** Voice and motion controls.<br />
            - **Sensory Disabilities:** Captions, image descriptions, audio enhancements.<br />
            - **Visually Impaired:** High-contrast mode, screen reader support, font size adjustment.
          </p>
        </div>
      </div>
    );
  }
export default function PrivacyPage() {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-orbitron font-bold text-black dark:text-white mb-8">Privacy Policy</h1>
        <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
          <p className="text-gray-700 dark:text-gray-300">
            BIPOCA AI is committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your data in compliance with GDPR, CCPA, and HIPAA.
          </p>
          <h2 className="text-2xl font-semibold text-black dark:text-white mt-6 mb-4">Worldwide Notices</h2>
          <p className="text-gray-700 dark:text-gray-300">
            - **GDPR (EU):** You have the right to access and delete your data.<br />
            - **CCPA (California):** You can opt out of data sharing.<br />
            - **HIPAA (USA):** We protect health-related data.<br />
            - **APPI (Japan):** We comply with Japan’s data protection laws.
          </p>
        </div>
      </div>
    );
  }
export default function CompliancePage() {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-orbitron font-bold text-black dark:text-white mb-8">Compliance</h1>
        <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
          <p className="text-gray-700 dark:text-gray-300">
            BIPOCA AI complies with GDPR, CCPA, and HIPAA. Learn more about our data protection measures.
          </p>
          <h2 className="text-2xl font-semibold text-black dark:text-white mt-6 mb-4">Worldwide Compliance</h2>
          <p className="text-gray-700 dark:text-gray-300">
            - **GDPR (EU):** Data protection and user rights.<br />
            - **CCPA (California):** Consumer privacy rights.<br />
            - **HIPAA (USA):** Health data security.<br />
            - **APPI (Japan):** Compliance with Japan’s data laws.
          </p>
        </div>
      </div>
    );
  }
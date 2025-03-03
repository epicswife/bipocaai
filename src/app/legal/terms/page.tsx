export default function TermsPage() {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-orbitron font-bold text-black dark:text-white mb-8">Terms of Service</h1>
        <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
          <p className="text-gray-700 dark:text-gray-300">
            By using BIPOCA AI, you agree to these terms. Free access for students, teachers, parents, and counselors; districts require a paid subscription.
          </p>
          <h2 className="text-2xl font-semibold text-black dark:text-white mt-6 mb-4">Worldwide Notices</h2>
          <p className="text-gray-700 dark:text-gray-300">
            - **EU Users:** Terms comply with GDPR requirements.<br />
            - **US Users:** Subject to CCPA and HIPAA where applicable.<br />
            - **Global Users:** We adhere to local data protection laws.
          </p>
        </div>
      </div>
    );
  }
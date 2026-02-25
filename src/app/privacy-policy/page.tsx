import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Sarkari Scan mobile application. Learn how we collect, use, and protect your information.",
  alternates: {
    canonical: "https://sarkariscan.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0B63A8] to-[#084B80] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-blue-100">
            Last updated: December 25, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Sarkari Scan (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
            respects your privacy and is committed to protecting it through this
            Privacy Policy. This policy explains how we collect, use, and
            safeguard your information when you use the Sarkari Scan mobile
            application.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            By using the app, you agree to the collection and use of information
            in accordance with this Privacy Policy.
          </p>
        </div>

        {/* Section 1 - Information We Collect */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="bg-blue-50 text-[#0B63A8] w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold">
              1
            </span>
            Information We Collect
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Personal Information (Provided by User)
            </h3>
            <p className="text-gray-700 mb-4">
              We may collect limited personal information that you voluntarily
              provide, such as:
            </p>
            <ul className="space-y-2 ml-6 list-disc text-gray-700">
              <li>Education details (qualification, field of study)</li>
              <li>Age or date of birth</li>
              <li>
                Category or reservation type (General, OBC, SC, ST, EWS)
              </li>
              <li>Work experience (if entered)</li>
              <li>
                Email address (if provided for support or communication)
              </li>
            </ul>
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-gray-700">
                <strong className="text-blue-900">Purpose:</strong> This
                information is used solely to provide eligibility checks,
                personalized job recommendations, and related app features.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Non-Personal Information
            </h3>
            <p className="text-gray-700 mb-4">
              We may automatically collect non-personal information such as:
            </p>
            <ul className="space-y-2 ml-6 list-disc text-gray-700">
              <li>Device type and operating system version</li>
              <li>
                App usage statistics (screens visited, feature usage frequency)
              </li>
              <li>Crash or error logs for debugging purposes</li>
            </ul>
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-gray-700">
                <strong className="text-blue-900">Purpose:</strong> This data
                is used only to improve app performance, stability, and user
                experience. No personal identification is collected through
                these mechanisms.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 - How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="bg-blue-50 text-[#0B63A8] w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold">
              2
            </span>
            How We Use Your Information
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <p className="text-gray-700 mb-4">
              We use collected information to:
            </p>
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">
                    Provide Core Services
                  </p>
                  <p className="text-gray-700">
                    Deliver eligibility analysis and personalized job
                    recommendations based on your profile.
                  </p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">
                    Improve App Functionality
                  </p>
                  <p className="text-gray-700">
                    Enhance app performance, fix bugs, and optimize user
                    experience based on usage patterns.
                  </p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">
                    Send Important Notifications
                  </p>
                  <p className="text-gray-700">
                    Deliver job alerts and application deadlines (only if
                    notifications are enabled by user).
                  </p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">
                    Provide Support
                  </p>
                  <p className="text-gray-700">
                    Respond to user queries, feedback, and support requests in a
                    timely manner.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-gray-900 font-semibold">
                We do NOT sell, rent, or trade your personal information to
                third parties.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 - Government Disclaimer */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="bg-blue-50 text-[#0B63A8] w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold">
              3
            </span>
            Government Information Disclaimer
          </h2>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl shadow-md p-8">
            <h3 className="text-xl font-bold text-orange-900 mb-2">
              Important Notice
            </h3>
            <p className="text-gray-800 font-semibold mb-3">
              Sarkari Scan is NOT an official government app and is NOT
              affiliated with any government entity.
            </p>
            <p className="text-gray-700 mb-3">
              All government job-related information displayed in the app is
              collected from publicly available official government websites and
              recruitment portals. This information is provided for
              informational and convenience purposes only.
            </p>
            <p className="text-gray-700">
              Users are strongly advised to verify all job details, application
              deadlines, eligibility criteria, and official notifications
              directly on the respective official government websites before
              applying.
            </p>
          </div>
        </section>

        {/* Section 4 - Data Sharing */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="bg-blue-50 text-[#0B63A8] w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold">
              4
            </span>
            Data Sharing and Disclosure
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <p className="text-gray-700 mb-4 font-semibold">
              We do not share personal user data with third parties except in
              the following limited circumstances:
            </p>
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-gray-300 bg-gray-50 rounded">
                <p className="font-semibold text-gray-900">
                  Legal Requirements
                </p>
                <p className="text-gray-700">
                  When required by law, court order, or government regulation.
                </p>
              </div>
              <div className="p-4 border-l-4 border-gray-300 bg-gray-50 rounded">
                <p className="font-semibold text-gray-900">
                  Safety and Security
                </p>
                <p className="text-gray-700">
                  To protect the rights, property, safety, or security of
                  users, the app, or the public.
                </p>
              </div>
              <div className="p-4 border-l-4 border-gray-300 bg-gray-50 rounded">
                <p className="font-semibold text-gray-900">
                  Legal Compliance
                </p>
                <p className="text-gray-700">
                  To comply with legal obligations, enforce terms of service, or
                  respond to lawful requests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 - Data Security */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="bg-blue-50 text-[#0B63A8] w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold">
              5
            </span>
            Data Security
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <p className="text-gray-700 mb-4">
              We take reasonable technical and organizational measures to
              protect user data from unauthorized access, misuse, alteration, or
              disclosure. These measures include:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-900 mb-1">
                  Secure Data Storage
                </p>
                <p className="text-gray-700 text-sm">
                  Encrypted storage for sensitive user information
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-900 mb-1">
                  Access Controls
                </p>
                <p className="text-gray-700 text-sm">
                  Restricted access to user data by authorized personnel only
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-900 mb-1">
                  Security Monitoring
                </p>
                <p className="text-gray-700 text-sm">
                  Regular security audits and monitoring for vulnerabilities
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-900 mb-1">
                  Secure Transmission
                </p>
                <p className="text-gray-700 text-sm">
                  Encrypted data transmission over secure channels
                </p>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <p className="text-gray-700">
                <strong className="text-yellow-900">Please note:</strong> While
                we implement industry-standard security practices, no method of
                electronic storage or transmission over the internet is 100%
                secure. We cannot guarantee absolute security.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 - Data Retention */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="bg-blue-50 text-[#0B63A8] w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold">
              6
            </span>
            Data Retention
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <p className="text-gray-700 mb-4">
              We retain user data only for as long as necessary to provide app
              functionality, improve services, and comply with legal
              obligations.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#0B63A8]">
                <p className="font-semibold text-gray-900 mb-2">
                  Active User Data
                </p>
                <p className="text-gray-700">
                  Retained while your account is active and you continue using
                  the app&apos;s services.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#0B63A8]">
                <p className="font-semibold text-gray-900 mb-2">
                  Inactive Accounts
                </p>
                <p className="text-gray-700">
                  Data may be deleted after a reasonable period of inactivity,
                  typically after 24 months of no app usage.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#0B63A8]">
                <p className="font-semibold text-gray-900 mb-2">
                  User-Requested Deletion
                </p>
                <p className="text-gray-700">
                  Users may request deletion of their data at any time by
                  contacting us. We will process such requests within 30 days.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 - Children's Privacy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="bg-blue-50 text-[#0B63A8] w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold">
              7
            </span>
            Children&apos;s Privacy
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <p className="text-gray-700 mb-4">
              Sarkari Scan is intended for users who are preparing for
              government job examinations, typically individuals aged 18 years
              and above.
            </p>
            <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
              <p className="text-gray-700">
                <strong className="text-purple-900">Important:</strong> We do
                not knowingly collect personal data from children under the age
                of 13. If we become aware that we have inadvertently collected
                information from a child under 13, we will take steps to delete
                such information promptly.
              </p>
            </div>
            <p className="text-gray-700 mt-4">
              If you are a parent or guardian and believe your child has provided
              us with personal information, please contact us immediately at the
              email address provided below.
            </p>
          </div>
        </section>

        {/* Section 8 - Your Rights */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="bg-blue-50 text-[#0B63A8] w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold">
              8
            </span>
            Your Rights and Choices
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <p className="text-gray-700 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-semibold text-gray-900">Access:</p>
                <p className="text-gray-700">
                  Request access to the personal information we hold about you.
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-semibold text-gray-900">Correction:</p>
                <p className="text-gray-700">
                  Request correction of inaccurate or incomplete information.
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-semibold text-gray-900">Deletion:</p>
                <p className="text-gray-700">
                  Request deletion of your personal data from our systems.
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-semibold text-gray-900">Opt-Out:</p>
                <p className="text-gray-700">
                  Opt out of receiving promotional notifications (job alerts can
                  be managed in app settings).
                </p>
              </div>
            </div>
            <p className="text-gray-700 mt-4">
              To exercise any of these rights, please contact us using the
              contact information provided below.
            </p>
          </div>
        </section>

        {/* Section 9 - Changes */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="bg-blue-50 text-[#0B63A8] w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold">
              9
            </span>
            Changes to This Privacy Policy
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, technology, legal requirements, or other
              factors.
            </p>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong className="text-blue-900">
                  Notification of Changes:
                </strong>{" "}
                Any changes will be reflected on this page with an updated
                &quot;Last updated&quot; date at the top of the policy.
              </p>
              <p className="text-gray-700">
                For significant changes, we may notify users through the app or
                via email (if provided). We encourage you to review this Privacy
                Policy periodically to stay informed about how we protect your
                information.
              </p>
            </div>
          </div>
        </section>

        {/* Section 10 - Contact */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="bg-blue-50 text-[#0B63A8] w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold">
              10
            </span>
            Contact Us
          </h2>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-md border-2 border-blue-300 p-8">
            <p className="text-gray-700 mb-6">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or how your data is handled, please don&apos;t
              hesitate to contact us:
            </p>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div>
                  <p className="text-sm text-gray-600">Email Support</p>
                  <a
                    href="mailto:adi.sh5442@gmail.com"
                    className="text-xl font-semibold text-[#0B63A8] hover:text-[#084B80]"
                  >
                    adi.sh5442@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  We aim to respond to all inquiries within 48 hours during
                  business days.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="bg-gray-100 rounded-xl p-6 border border-gray-300">
          <p className="text-gray-700 text-center">
            <strong>Note:</strong> This Privacy Policy applies exclusively to
            the Sarkari Scan mobile application. It does not apply to any
            third-party websites, services, or applications that may be linked
            from our app.
          </p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | serverNetwork',
  description: 'Privacy Policy for serverNetwork',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      {/* Navigation */}
      <nav className="w-full flex justify-between items-center p-6 lg:px-12 bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 z-50">
        <Link href="/" className="flex items-center text-2xl font-bold tracking-tight cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-3"
          >
            <g className="stroke-brand-500">
              <path d="M12 3V2" />
              <path d="M4 10h16" />
              <path d="M5 10a7 7 0 0 1 14 0" />
            </g>
            <g className="stroke-black dark:stroke-white">
              <path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5" />
              <path d="M2 14h12a2 2 0 0 1 0 4h-2" />
              <path d="M5 14v6a1 1 0 0 1-1 1H2" />
            </g>
          </svg>
          <span className="text-black dark:text-white">server</span>
          <span className="text-brand-500">Network</span>
        </Link>
      </nav>

      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 lg:py-20 w-full">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
          <p className="text-sm text-gray-500 mb-8 font-medium">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">1. Introduction</h2>
          <p className="mb-6">
            Welcome to serverNetwork ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (collectively, the "Services").
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">2. Information We Collect</h2>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li><strong>Personal Information:</strong> We may collect personal information such as your name, email address, profile picture (avatar), and professional experience when you register for an account.</li>
            <li><strong>Location Data:</strong> With your permission, we collect and process your precise or approximate location information to show you relevant job opportunities and servers within a 45-mile radius.</li>
            <li><strong>User-Generated Content:</strong> We collect information you post on our platform, including job listings, availability statuses, messages, and photos.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>Provide, operate, and maintain our Services.</li>
            <li>Facilitate connections between servers and restaurants based on geographic proximity.</li>
            <li>Enable our direct messaging and chat features.</li>
            <li>Improve, personalize, and expand our Services.</li>
            <li>Communicate with you for customer support and updates.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">4. Sharing Your Information</h2>
          <p className="mb-6">
            We share your profile information and posts with other users (servers or restaurants) on the platform to facilitate networking and hiring. We do not sell your personal information to third parties. We may share information with trusted third-party service providers (such as hosting or chat providers) solely to operate our Services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">5. Data Retention and Deletion</h2>
          <p className="mb-6">
            We retain your information for as long as your account is active. You may request the deletion of your account and associated data at any time through the app settings or by contacting us directly.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">6. Contact Us</h2>
          <p className="mb-6">
            If you have questions or comments about this Privacy Policy, please contact us at <strong>support@servernetwork.org</strong>.
          </p>
        </div>
      </main>

      <footer className="py-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} serverNetwork. All rights reserved.</p>
      </footer>
    </div>
  );
}

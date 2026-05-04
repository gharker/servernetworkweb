"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed w-full top-0 left-0 right-0 flex justify-between items-center p-6 lg:px-12 bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 z-50 transition-all">
        <div className="flex items-center text-2xl font-bold tracking-tight cursor-pointer">
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
            {/* Cover / Platter (Orange) */}
            <g className="stroke-brand-500">
              <path d="M12 3V2" />
              <path d="M4 10h16" />
              <path d="M5 10a7 7 0 0 1 14 0" />
            </g>
            {/* Hand (Black in light mode, White in dark mode) */}
            <g className="stroke-black dark:stroke-white">
              <path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5" />
              <path d="M2 14h12a2 2 0 0 1 0 4h-2" />
              <path d="M5 14v6a1 1 0 0 1-1 1H2" />
            </g>
          </svg>
          <span className="text-black dark:text-white">server</span>
          <span className="text-brand-500">Network</span>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden sm:inline-block text-gray-600 dark:text-gray-300 hover:text-brand-500 font-medium transition-colors"
          >
            Sign In / Register
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 sm:px-5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all hover-scale shadow-lg shadow-brand-500/30"
          >
            Get Started
          </button>
        </div>
      </nav>

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative pt-8 pb-20 lg:pt-24 lg:pb-32 overflow-hidden flex flex-col items-center text-center px-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-brand-500/20 blur-[120px] rounded-full -z-10" />

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 max-w-4xl">
            reimagining <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">restaurant staffing</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-10 font-light max-w-3xl">
            connecting restaurants with servers when they need them the most
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover-scale shadow-xl shadow-brand-500/30">
              Pick Up a Shift
            </button>
            <button className="w-full sm:w-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-full text-lg font-bold transition-all hover-scale shadow-xl">
              Find a Server
            </button>
          </div>
        </section>

        {/* Banner Section */}
        <section className="px-4 pb-12 max-w-7xl mx-auto -mt-8 relative z-10">
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
            <Image
              src="/restaurant_servers_banner_v2.png"
              alt="Warm cozy local restaurant with servers"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </section>

        {/* Tagline Section */}
        <section className="py-16 sm:py-20 lg:py-28 px-6 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
              <span className="text-gray-800 dark:text-gray-100">Whether you're a </span>
              <span className="text-brand-500">server</span>
              <span className="text-gray-800 dark:text-gray-100"> looking to pick up extra shifts or a </span>
              <span className="text-brand-500">restaurant</span>
              <span className="text-gray-800 dark:text-gray-100"> needing coverage for the dinner rush, </span>
              <span className="text-brand-500">we've got you covered.</span>
            </p>
          </div>
        </section>

        {/* Photo Cards Section */}
        <section className="py-16 px-4 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Card 1 — For Servers */}
            <div className="rounded-3xl overflow-hidden shadow-2xl group relative flex flex-col">
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <Image
                  src="/server_delivering_food_v2.png"
                  alt="African American female server delivering food to a table"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white flex items-center gap-2">
                  For Servers
                </h3>
              </div>
              <div className="bg-white dark:bg-gray-900 p-8 flex-1 space-y-6">
                <div>
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-700 uppercase tracking-wider">The Problem</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-start"><span className="mr-2 text-brand-500 mt-1">•</span>Want to pick up extra shifts but don't know who is hiring right now.</li>
                    <li className="flex items-start"><span className="mr-2 text-brand-500 mt-1">•</span>Hard to find shifts in your immediate area on short notice.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-700 uppercase tracking-wider">Our Solution</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-start"><span className="mr-2 text-brand-500 mt-1">✓</span><span><strong className="text-gray-800 dark:text-gray-200">You are your own boss.</strong> Pick up shifts when and where you want.</span></li>
                    <li className="flex items-start"><span className="mr-2 text-brand-500 mt-1">✓</span>Fit work seamlessly into your schedule.</li>
                    <li className="flex items-start"><span className="mr-2 text-brand-500 mt-1">✓</span>Support local businesses. Our app is geofenced to list only those needing help within a 60-mile radius.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 2 — For Restaurants */}
            <div className="rounded-3xl overflow-hidden shadow-2xl group relative flex flex-col">
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <Image
                  src="/restaurant_host_stand.png"
                  alt="Female host standing at a restaurant check-in stand"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white flex items-center gap-2">
                  For Restaurants
                </h3>
              </div>
              <div className="bg-white dark:bg-gray-900 p-8 flex-1 space-y-6">
                <div>
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-700 uppercase tracking-wider">The Problem</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-start"><span className="mr-2 text-brand-500 mt-1">•</span>Someone called out sick and you need a server for the rush, stat.</li>
                    <li className="flex items-start"><span className="mr-2 text-brand-500 mt-1">•</span>No easy way to connect with experienced individuals ready to step in.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-700 uppercase tracking-wider">Our Solution</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-start"><span className="mr-2 text-brand-500 mt-1">✓</span>Get the staff you need, exactly when you need them.</li>
                    <li className="flex items-start"><span className="mr-2 text-brand-500 mt-1">✓</span>Find high-rated, experienced servers nearby.</li>
                    <li className="flex items-start"><span className="mr-2 text-brand-500 mt-1">✓</span>Connect instantly and keep your floor running smoothly.</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">Simple, transparent pricing</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">Join the network today. Try it risk-free.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Server Card */}
              <div className="glass-card p-8 lg:p-10 relative overflow-hidden border-2 border-brand-500/50 shadow-2xl flex flex-col">
                <div className="absolute top-0 right-0 bg-brand-500 text-white text-sm font-bold px-4 py-1 rounded-bl-lg shadow-md">
                  50% Discounted Rate
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2"> Server Membership</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Unlock full access to the shift network, unlimited messaging, and priority listings.</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-extrabold text-gray-900 dark:text-white">$9.99</span>
                    <span className="text-xl text-gray-500">/month</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-6">or <span className="font-semibold text-gray-700 dark:text-gray-300">$99/year</span></div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-brand-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <strong>30-day free trial</strong>&nbsp;included
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-brand-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Access to geofenced local shift feed
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-brand-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Secure in-app messaging
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-brand-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Post your resume and availability
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all hover-scale shadow-lg shadow-brand-500/30 text-center"
                  >
                    Start Free Trial
                  </button>
                  <p className="text-xs text-center text-gray-500">Secure payment via Stripe</p>
                </div>
              </div>

              {/* Restaurant Card */}
              <div className="glass-card p-8 lg:p-10 relative overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-2xl flex flex-col">
                <div className="absolute top-0 right-0 bg-gray-900 text-white text-sm font-bold px-4 py-1 rounded-bl-lg shadow-md">
                  50% Discounted Price
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Restaurant Membership</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Post open shifts, browse verified servers nearby, and keep your floor fully staffed — on demand.</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-extrabold text-gray-900 dark:text-white">$99</span>
                    <span className="text-xl text-gray-500">/month</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-6">or <span className="font-semibold text-gray-700 dark:text-gray-300">$999/year</span></div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-brand-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <strong>30-day free trial</strong>&nbsp;included
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-brand-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Post unlimited shift openings
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-brand-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Browse high-rated, verified servers
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-brand-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Secure in-app messaging
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-gray-900 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all hover-scale shadow-lg text-center"
                  >
                    Start Free Trial
                  </button>
                  <p className="text-xs text-center text-gray-500">Secure payment via Stripe</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">We're here to help you keep your restaurant fully staffed.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              <form className="glass-card p-8 text-left space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="w-full bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-lg font-bold transition-all hover-scale shadow-lg">
                Send Message
              </button>
              </form>

              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[400px]">
                <Image
                  src="/servers_kitchen_pickup_v2.png"
                  alt="Three diverse servers picking up food from the kitchen"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>

            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} serverNetwork. All rights reserved.</p>
      </footer>

      {/* Account Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create an Account</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Join the shift network today.</p>

            <form className="space-y-4">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center mb-3 overflow-hidden relative group cursor-pointer hover:border-brand-500 transition-colors">
                  <div className="text-gray-400 group-hover:text-brand-500 flex flex-col items-center">
                    <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span className="text-[10px] font-medium uppercase">Upload</span>
                  </div>
                  {/* File input would go here */}
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                </div>
                <p className="text-xs text-gray-500">Upload your avatar</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" />
              </div>

              <button type="button" className="w-full bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-lg font-bold transition-all hover-scale shadow-lg shadow-brand-500/30 mt-4 flex items-center justify-center gap-2">
                Continue with Clerk
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

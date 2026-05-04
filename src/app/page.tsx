"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 lg:px-12 glass z-10 sticky top-0">
        <div className="text-2xl font-bold tracking-tight"><span className="text-black dark:text-white">server</span><span className="text-brand-500">Network</span></div>
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

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center text-center px-4">
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
              src="/restaurant_servers_banner.png" 
              alt="Warm cozy local restaurant with servers" 
              fill
              className="object-cover object-center"
            />
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">How it works</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Whether you're a server looking to pick up extra shifts or a restaurant needing coverage for the dinner rush, we've got you covered.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Servers */}
              <div className="glass-card p-8 sm:p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
                <h3 className="text-2xl font-bold text-brand-500 mb-6 flex items-center gap-3">
                  <span className="p-2 bg-brand-100 dark:bg-brand-900/50 rounded-lg">🍽️</span> For Servers
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">The Problem</h4>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start"><span className="mr-2 text-brand-500">•</span>Want to pick up extra shifts but don't know who is hiring right now.</li>
                      <li className="flex items-start"><span className="mr-2 text-brand-500">•</span>Hard to find shifts in your immediate area on short notice.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">Our Solution</h4>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start"><span className="mr-2 text-brand-500">✓</span><strong>You are your own boss.</strong> Pick up shifts when and where you want.</li>
                      <li className="flex items-start"><span className="mr-2 text-brand-500">✓</span>Fit work seamlessly into your schedule.</li>
                      <li className="flex items-start"><span className="mr-2 text-brand-500">✓</span>Support local businesses. Our app is geofenced to list only those needing help within a 60-mile radius.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Restaurants */}
              <div className="glass-card p-8 sm:p-12 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl -ml-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
                <h3 className="text-2xl font-bold text-brand-500 mb-6 flex items-center gap-3">
                  <span className="p-2 bg-brand-100 dark:bg-brand-900/50 rounded-lg">🏪</span> For Restaurants
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">The Problem</h4>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start"><span className="mr-2 text-brand-500">•</span>Someone called out sick and you need a server for the rush, stat.</li>
                      <li className="flex items-start"><span className="mr-2 text-brand-500">•</span>No easy way to connect with experienced individuals ready to step in.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">Our Solution</h4>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start"><span className="mr-2 text-brand-500">✓</span>Get the staff you need, exactly when you need them.</li>
                      <li className="flex items-start"><span className="mr-2 text-brand-500">✓</span>Find high-rated, experienced servers nearby.</li>
                      <li className="flex items-start"><span className="mr-2 text-brand-500">✓</span>Connect instantly and keep your floor running smoothly.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">Simple, transparent pricing</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">Join the network today. Try it risk-free.</p>
            </div>

            <div className="glass-card p-8 lg:p-12 relative overflow-hidden border-2 border-brand-500/50 shadow-2xl">
              <div className="absolute top-0 right-0 bg-brand-500 text-white text-sm font-bold px-4 py-1 rounded-bl-lg shadow-md">
                50% Discounted Rate
              </div>
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pro Membership</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Unlock full access to the shift network, unlimited messaging, and priority listings.</p>
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-extrabold text-gray-900 dark:text-white">$9.99</span>
                    <span className="text-xl text-gray-500">/month</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-6">or <span className="font-semibold text-gray-700 dark:text-gray-300">$99/year</span></div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-brand-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <strong>30-day free trial</strong> included
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-brand-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Access to Geofenced local shift feed
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-brand-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Secure in-app messaging
                    </li>
                  </ul>
                </div>
                
                <div className="w-full lg:w-auto flex flex-col gap-4">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full lg:w-64 bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all hover-scale shadow-lg shadow-brand-500/30 text-center"
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
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Contact Us</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">We're here to help you keep your restaurant fully staffed.</p>
            
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

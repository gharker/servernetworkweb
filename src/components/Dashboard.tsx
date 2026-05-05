"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import UpdateProfileModal from "@/components/UpdateProfileModal";
import CreatePostModal from "@/components/CreatePostModal";

export default function Dashboard({ profile }: { profile: any }) {
  const isServer = profile.accountType === "SERVER";
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Top Navbar */}
      <nav className="w-full flex justify-between items-center p-6 lg:px-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center text-2xl font-bold tracking-tight">
          <span className="text-black dark:text-white">server</span>
          <span className="text-brand-500">Network</span>
        </div>
        <div className="flex items-center space-x-4">
          <UserButton />
        </div>
      </nav>

      <main className="flex-grow p-6 lg:p-12 max-w-7xl mx-auto w-full space-y-8">
        {/* Header Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/feed"
              className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-transform hover:scale-105 w-full sm:w-auto text-center"
            >
              {isServer ? "View Available Gigs" : "View Available Servers"}
            </Link>
            
            <button 
              onClick={() => setIsPostModalOpen(true)}
              className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 px-6 py-3 rounded-lg font-bold shadow-md transition-transform hover:scale-105 w-full sm:w-auto"
            >
              {isServer ? "Post to the Server Feed" : "Post Available Opportunities"}
            </button>
          </div>

          <button 
            onClick={() => setIsUpdateModalOpen(true)}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-bold shadow-sm transition-transform hover:scale-105 w-full sm:w-auto"
          >
            Update Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notification Section */}
          <section className="lg:col-span-1 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-3">
              Direct Messages
            </h2>
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
              <p className="text-gray-500 dark:text-gray-400 font-medium">New Messages</p>
              <p className="text-sm text-gray-400 mt-1">You have no new messages.</p>
            </div>
          </section>

          {/* Feed Section */}
          <section className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-3">
              Your Current Posts
            </h2>
            
            {profile.posts && profile.posts.length > 0 ? (
              <div className="space-y-6">
                {profile.posts.map((post: any) => (
                  <div key={post.id} className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-900">
                    {post.imageUrl && (
                      <div className="w-full aspect-video sm:aspect-[4/3] bg-gray-100 dark:bg-gray-800 relative">
                        <img src={post.imageUrl} alt="Post image" className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <img src={profile.avatarUrl || `https://ui-avatars.com/api/?name=${profile.username || 'U'}`} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
                        <div>
                          <span className="font-bold text-gray-900 dark:text-white block leading-tight">
                            {profile.username}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/30 p-4 rounded-lg">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-1">Looking for</h4>
                          <p className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-wrap leading-relaxed">{post.gigsDescription}</p>
                        </div>
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700/50">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-1">Server Experience</h4>
                          <p className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-wrap leading-relaxed">{post.experienceDescription}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-3">
                  {isServer 
                    ? "You haven't posted your availability yet." 
                    : "You haven't posted any open shifts yet."}
                </p>
                <button 
                  onClick={() => setIsPostModalOpen(true)}
                  className="text-brand-500 font-bold hover:underline transition-colors"
                >
                  Create a new post
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <UpdateProfileModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        profile={profile}
      />

      <CreatePostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        profile={profile}
      />
    </div>
  );
}

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { getCustomAvatarUrl } from "@/lib/avatar";

export default async function ServerFeedPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Fetch all posts from SERVER accounts
  const posts = await prisma.post.findMany({
    where: {
      author: {
        accountType: "SERVER"
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      author: true
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Top Navbar */}
      <nav className="w-full flex justify-between items-center p-6 lg:px-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-sm">
        <Link href="/" className="flex items-center text-2xl font-bold tracking-tight">
          <span className="text-black dark:text-white">server</span>
          <span className="text-brand-500">Network</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-brand-500 font-medium mr-4 transition-colors">
            Dashboard
          </Link>
          <UserButton />
        </div>
      </nav>

      <main className="flex-grow p-6 lg:p-12 max-w-3xl mx-auto w-full space-y-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
          Server Feed
        </h1>
        
        {posts.length === 0 ? (
          <div className="text-center p-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No servers available yet</h3>
            <p className="text-gray-500 dark:text-gray-400">Posts from servers looking for gigs will appear here.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <div key={post.id} className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-900">
                {post.imageUrl && (
                  <div className="w-full aspect-video sm:aspect-[4/3] bg-gray-100 dark:bg-gray-800 relative">
                    <img src={post.imageUrl} alt="Post image" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <img 
                        src={post.author.avatarUrl || getCustomAvatarUrl(post.author.username)} 
                        alt="Avatar" 
                        className="w-12 h-12 rounded-full object-cover border-2 border-brand-500 shadow-sm" 
                      />
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white text-lg block leading-tight">
                          {post.author.username}
                        </span>
                        <span className="text-sm text-gray-500">
                          Posted on {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button className="bg-brand-50 hover:bg-brand-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-brand-600 dark:text-brand-400 px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-colors flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                      Message
                    </button>
                  </div>
                  
                  <div className="space-y-4 bg-gray-50 dark:bg-gray-800/30 p-4 rounded-xl">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-1">Looking for</h4>
                      <p className="text-gray-800 dark:text-gray-200 text-base whitespace-pre-wrap leading-relaxed">{post.gigsDescription}</p>
                    </div>
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700/50">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-1">Server Experience</h4>
                      <p className="text-gray-800 dark:text-gray-200 text-base whitespace-pre-wrap leading-relaxed">{post.experienceDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/actions/post";
import { getCustomAvatarUrl } from "@/lib/avatar";

export default function CreatePostModal({
  isOpen,
  onClose,
  profile
}: {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
}) {
  const router = useRouter();

  const [imageBase64, setImageBase64] = useState("");
  const [gigsDescription, setGigsDescription] = useState("");
  const [experienceDescription, setExperienceDescription] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gigsDescription || !experienceDescription) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createPost({
        gigsDescription,
        experienceDescription,
        imageUrl: imageBase64 || undefined,
      });

      setGigsDescription("");
      setExperienceDescription("");
      setImageBase64("");

      router.refresh();
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fallbackAvatar = getCustomAvatarUrl(profile?.username || "U");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Create Post
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Area */}
          <div className="relative w-full aspect-video sm:aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-brand-500 transition-colors cursor-pointer group flex flex-col items-center justify-center">
            {imageBase64 ? (
              <img src={imageBase64} alt="Post preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 flex flex-col items-center pointer-events-none group-hover:text-brand-500 transition-colors">
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span className="font-medium text-center px-4">Add an image (optional)</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {/* Under the image: Avatar and Username */}
          <div className="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-800">
            <img src={profile?.avatarUrl || fallbackAvatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
            <span className="font-bold text-gray-900 dark:text-white">
              {profile?.accountType === "RESTAURANT" && profile?.restaurantName
                ? `${profile.username} from ${profile.restaurantName}`
                : profile?.username}
            </span>
          </div>

          {/* Inputs */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              {profile?.accountType === "RESTAURANT"
                ? "Gigs I need filled."
                : "What gigs are you looking to fill?"}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={gigsDescription}
              onChange={(e) => setGigsDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all resize-none"
              placeholder="e.g. I'm looking for server opportunities ..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              {profile?.accountType === "RESTAURANT"
                ? "Required experience."
                : "Describe your server experience?"}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={experienceDescription}
              onChange={(e) => setExperienceDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all resize-none"
              placeholder="e.g. 5 years in high-volume settings, knowledgeable in wine pairing..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all hover-scale shadow-lg mt-2 text-lg"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { createProfile } from "@/actions/profile";
import { getCustomAvatarUrl } from "@/lib/avatar";
import { useRouter } from "next/navigation";

export default function OnboardingModal({ isOpen }: { isOpen: boolean }) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  
  const [accountType, setAccountType] = useState<"SERVER" | "RESTAURANT" | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [avatarBase64, setAvatarBase64] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress && !email) {
      setEmail(user.primaryEmailAddress.emailAddress);
    }
  }, [user, email]);

  if (!isOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountType) return;
    if (!username) {
      setError("Username is required");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      let finalAvatarUrl = avatarBase64 || undefined;

      if (avatarFile && user) {
        await user.setProfileImage({ file: avatarFile });
      } else if (!avatarFile && user && username) {
        const generatedUrl = getCustomAvatarUrl(username);
        finalAvatarUrl = generatedUrl;
        
        try {
          const response = await fetch(generatedUrl);
          const blob = await response.blob();
          const file = new File([blob], "avatar.png", { type: "image/png" });
          await user.setProfileImage({ file });
        } catch (e) {
          console.error("Failed to upload generated avatar to Clerk:", e);
        }
      }

      const result = await createProfile({
        accountType,
        username,
        email,
        restaurantName: accountType === "RESTAURANT" ? restaurantName : undefined,
        streetAddress: accountType === "RESTAURANT" ? streetAddress : undefined,
        city: accountType === "RESTAURANT" ? city : undefined,
        state: accountType === "RESTAURANT" ? state : undefined,
        zipCode: accountType === "RESTAURANT" ? zipCode : undefined,
        avatarUrl: finalAvatarUrl,
      });
      
      if (result && 'error' in result) {
        setError(result.error as string);
        setLoading(false);
        return;
      }
      
      // Force a hard reload to completely clear Next.js layout cache
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          Complete Your Profile
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center font-medium">
          This is required to create an account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Type Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Do you want to create a server account or a restaurant account?
            </label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex-1 justify-center hover:border-brand-500 transition-colors">
                <input
                  type="radio"
                  name="accountType"
                  value="SERVER"
                  checked={accountType === "SERVER"}
                  onChange={() => setAccountType("SERVER")}
                  className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500"
                />
                <span className="text-gray-900 dark:text-gray-100 font-medium">Server</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex-1 justify-center hover:border-brand-500 transition-colors">
                <input
                  type="radio"
                  name="accountType"
                  value="RESTAURANT"
                  checked={accountType === "RESTAURANT"}
                  onChange={() => setAccountType("RESTAURANT")}
                  className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500"
                />
                <span className="text-gray-900 dark:text-gray-100 font-medium">Restaurant</span>
              </label>
            </div>
          </div>

          {accountType && (
            <div className="space-y-4 animate-in fade-in duration-300 pt-2 border-t border-gray-100 dark:border-gray-800">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                  placeholder="e.g. johndoe"
                  autoCapitalize="none"
                />
              </div>

              {/* Restaurant Details (Only for Restaurant) */}
              {accountType === "RESTAURANT" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Restaurant Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                      placeholder="e.g. The Local Diner"
                    />
                  </div>
                  
                  <div className="space-y-4 pt-2">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                      Location <span className="text-gray-500 font-normal">(for local server discovery)</span>
                    </h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                        placeholder="e.g. 123 Main St"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                          placeholder="e.g. Boston"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            State <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                            placeholder="e.g. MA"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Zip <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                            placeholder="e.g. 02118"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 outline-none transition-all cursor-not-allowed"
                  placeholder="john@example.com"
                />
              </div>

              {/* Avatar Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Avatar Image
                </label>
                <div className="flex items-center gap-4 mt-2">
                  {avatarBase64 ? (
                    <img src={avatarBase64} alt="Avatar Preview" className="w-16 h-16 rounded-full object-cover border-2 border-brand-500 shadow-sm" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-gray-800 dark:file:text-brand-400 cursor-pointer transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center mt-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!accountType || loading}
            className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-all hover-scale shadow-lg mt-6"
          >
            {loading ? "Saving Profile..." : "Submit"}
          </button>
          
          <button
            type="button"
            onClick={() => signOut({ redirectUrl: '/' })}
            className="w-full mt-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm font-medium transition-colors"
          >
            Cancel & Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}

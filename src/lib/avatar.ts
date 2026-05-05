/**
 * Generates a custom avatar URL using ui-avatars.com.
 * Uses a deterministic background color based on the username.
 */
export const avatarColorMap: Record<string, string> = {
    "0": "#8b5cf6", "1": "#a855f7", "2": "#d946ef", "3": "#ec4899", "4": "#f43f5e",
    "5": "#64748b", "6": "#6b7280", "7": "#71717a", "8": "#ef4444", "9": "#f97316",
    "A": "#ef4444", "B": "#f97316", "C": "#f59e0b", "D": "#eab308", "E": "#84cc16",
    "F": "#22c55e", "G": "#10b981", "H": "#14b8a6", "I": "#06b6d4", "J": "#0ea5e9",
    "K": "#3b82f6", "L": "#6366f1", "M": "#8b5cf6", "N": "#a855f7", "O": "#d946ef",
    "P": "#ec4899", "Q": "#f43f5e", "R": "#64748b", "S": "#6b7280", "T": "#71717a",
    "U": "#ef4444", "V": "#f97316", "W": "#f59e0b", "X": "#eab308", "Y": "#84cc16",
    "Z": "#22c55e", "a": "#10b981", "b": "#14b8a6", "c": "#06b6d4", "d": "#0ea5e9",
    "e": "#3b82f6", "f": "#6366f1", "g": "#8b5cf6", "h": "#a855f7", "i": "#d946ef",
    "j": "#ec4899", "k": "#f43f5e", "l": "#64748b", "m": "#6b7280", "n": "#71717a",
    "o": "#ef4444", "p": "#f97316", "q": "#f59e0b", "r": "#eab308", "s": "#84cc16",
    "t": "#22c55e", "u": "#10b981", "v": "#14b8a6", "w": "#06b6d4", "x": "#0ea5e9",
    "y": "#3b82f6", "z": "#6366f1", "!": "#f59e0b", "#": "#eab308", "$": "#84cc16",
    "%": "#22c55e", "&": "#10b981", "'": "#14b8a6", "*": "#06b6d4", "+": "#0ea5e9",
    "-": "#3b82f6", "/": "#6366f1", "=": "#8b5cf6", "?": "#a855f7", "^": "#d946ef",
    "_": "#ec4899", "`": "#f43f5e", "{": "#64748b", "|": "#6b7280", "}": "#71717a",
    "~": "#ef4444"
};

export function getCustomAvatarUrl(username: string): string {
    const displayName = username?.trim() || "User";
    
    // Find the first alphabetic character (a-z, A-Z)
    const match = displayName.match(/[a-zA-Z]/);
    
    // Fallback to the first character if the username is entirely numbers/symbols
    const firstAlphaChar = match ? match[0] : displayName.charAt(0);
    
    const initials = firstAlphaChar.toUpperCase();

    // Color linked to the first alphabetic character
    const hexColor = (avatarColorMap[firstAlphaChar] || "#64748b").replace("#", "");

    const baseUrl = "https://ui-avatars.com/api/";
    const params = new URLSearchParams({
        name: initials,
        background: hexColor,
        color: "fff",
        size: "128",
        bold: "true",
        format: "png",
        length: "1"
    });

    return `${baseUrl}?${params.toString()}`;
}

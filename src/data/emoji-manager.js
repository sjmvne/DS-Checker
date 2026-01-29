import emojiData from './emoji_mapping.json';

class EmojiManager {
    constructor() {
        this.emojiMap = new Map();
        this.init();
    }

    init() {
        // Flatten the categories into a single map for O(1) lookup
        Object.values(emojiData).forEach(categoryList => {
            categoryList.forEach(emoji => {
                if (emoji.name && emoji.url) {
                    this.emojiMap.set(emoji.name.toLowerCase(), emoji.url);
                }
            });
        });
        console.log(`EmojiManager initialized with ${this.emojiMap.size} animated emojis.`);
    }

    /**
     * Get the URL for an emoji by name.
     * @param {string} name - The name of the emoji (e.g., "Red Heart")
     * @returns {string|null} URL or null if not found
     */
    getUrl(name) {
        if (!name) return null;
        return this.emojiMap.get(name.toLowerCase());
    }
}

// Export a singleton instance
export const emojiManager = new EmojiManager();

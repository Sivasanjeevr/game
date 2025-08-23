/**
 * Age Manager Service
 * Handles age-based UI experience and session management
 */

const AGE_STORAGE_KEY = 'openblocks_age_selection';
const AGE_GROUPS = {
    YOUNG: '4+',
    OLDER: '7+'
};

class AgeManager {
    constructor() {
        this.currentAge = this.getStoredAge();
        this.listeners = [];
    }

    /**
     * Get the currently selected age group
     * @returns {string} The age group ('4+' or '7+')
     */
    getCurrentAge() {
        return this.currentAge;
    }

    /**
     * Set the age group and notify listeners
     * @param {string} ageGroup - The age group to set ('4+' or '7+')
     */
    setAge(ageGroup) {
        if (!Object.values(AGE_GROUPS).includes(ageGroup)) {
            console.warn(`Invalid age group: ${ageGroup}`);
            return;
        }

        this.currentAge = ageGroup;
        this.storeAge(ageGroup);
        this.notifyListeners(ageGroup);
    }

    /**
     * Check if user has selected an age group
     * @returns {boolean} True if age is selected
     */
    hasAgeSelected() {
        return !!this.currentAge;
    }

    /**
     * Check if current age is young learners (4+)
     * @returns {boolean} True if age is 4+
     */
    isYoungLearner() {
        return this.currentAge === AGE_GROUPS.YOUNG;
    }

    /**
     * Check if current age is older learners (7+)
     * @returns {boolean} True if age is 7+
     */
    isOlderLearner() {
        return this.currentAge === AGE_GROUPS.OLDER;
    }

    /**
     * Get the appropriate layout type based on age
     * @returns {string} 'horizontal' or 'vertical'
     */
    getLayoutType() {
        return this.isYoungLearner() ? 'horizontal' : 'vertical';
    }

    /**
     * Get the appropriate toolbox type based on age
     * @returns {string} 'horizontal' or 'vertical'
     */
    getToolboxType() {
        return this.isYoungLearner() ? 'horizontal' : 'vertical';
    }

    /**
     * Get the appropriate toolbox generator based on age
     * @returns {string} 'young' or 'standard'
     */
    getToolboxGenerator() {
        // Use the standard toolbox for all ages to preserve full functionality.
        // 4+ differences are applied via layout/styling only (horizontal, scrollable).
        return 'standard';
    }

    /**
     * Get the appropriate block style based on age
     * @returns {string} 'simple' or 'advanced'
     */
    getBlockStyle() {
        return this.isYoungLearner() ? 'simple' : 'advanced';
    }

    /**
     * Add a listener for age changes
     * @param {Function} listener - Function to call when age changes
     */
    addListener(listener) {
        if (typeof listener === 'function') {
            this.listeners.push(listener);
        }
    }

    /**
     * Remove a listener
     * @param {Function} listener - Function to remove
     */
    removeListener(listener) {
        const index = this.listeners.indexOf(listener);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    }

    /**
     * Notify all listeners of age change
     * @param {string} newAge - The new age group
     */
    notifyListeners(newAge) {
        this.listeners.forEach(listener => {
            try {
                listener(newAge);
            } catch (error) {
                console.error('Error in age change listener:', error);
            }
        });
    }

    /**
     * Get age from session storage
     * @returns {string|null} The stored age or null
     */
    getStoredAge() {
        try {
            return sessionStorage.getItem(AGE_STORAGE_KEY);
        } catch (error) {
            console.warn('Could not read age from session storage:', error);
            return null;
        }
    }

    /**
     * Store age in session storage
     * @param {string} age - The age to store
     */
    storeAge(age) {
        try {
            sessionStorage.setItem(AGE_STORAGE_KEY, age);
        } catch (error) {
            console.warn('Could not store age in session storage:', error);
        }
    }

    /**
     * Clear stored age
     */
    clearAge() {
        try {
            sessionStorage.removeItem(AGE_STORAGE_KEY);
            this.currentAge = null;
        } catch (error) {
            console.warn('Could not clear age from session storage:', error);
        }
    }

    /**
     * Reset to default state
     */
    reset() {
        this.clearAge();
        this.listeners = [];
    }
}

// Create and export a singleton instance
const ageManager = new AgeManager();

export default ageManager;
export { AGE_GROUPS };

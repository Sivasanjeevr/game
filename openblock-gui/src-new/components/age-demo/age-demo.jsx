import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {injectIntl, intlShape} from 'react-intl';

import AgeSelectionPopup from '../age-selection-popup/age-selection-popup.jsx';
import HorizontalLayout from '../horizontal-layout/horizontal-layout.jsx';
import ageManager from '../../lib/age-manager.js';

import styles from './age-demo.css';

const AgeDemo = ({
    intl
}) => {
    const [showAgePopup, setShowAgePopup] = useState(false);
    const [currentAge, setCurrentAge] = useState(ageManager.getCurrentAge());

    useEffect(() => {
        // Check if age is already selected
        if (!ageManager.hasAgeSelected()) {
            setShowAgePopup(true);
        }

        // Listen for age changes
        const handleAgeChange = (newAge) => {
            setCurrentAge(newAge);
            setShowAgePopup(false);
        };

        ageManager.addListener(handleAgeChange);

        return () => {
            ageManager.removeListener(handleAgeChange);
        };
    }, []);

    const handleAgeSelect = (ageGroup) => {
        ageManager.setAge(ageGroup);
        setCurrentAge(ageGroup);
        setShowAgePopup(false);
    };

    const handleShowAgePopup = () => {
        setShowAgePopup(true);
    };

    // Don't render until age is selected
    if (!currentAge) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p className={styles.loadingText}>Loading OpenBlocks...</p>
            </div>
        );
    }

    return (
        <div className={styles.ageDemo}>
            {/* Age Selection Popup */}
            {showAgePopup && (
                <AgeSelectionPopup onAgeSelect={handleAgeSelect} />
            )}

            {/* Age Indicator */}
            <div className={styles.ageIndicator}>
                <span className={styles.ageLabel}>
                    Age Group: {currentAge}
                </span>
                <button 
                    className={styles.changeAgeButton}
                    onClick={handleShowAgePopup}
                    title="Change age group"
                >
                    Change
                </button>
            </div>

            {/* Content based on age selection */}
            {ageManager.isYoungLearner() ? (
                // Age 4+ - Horizontal Layout
                <HorizontalLayout>
                    <div className={styles.demoContent}>
                        <h1>Welcome to OpenBlocks for Young Learners! 🎉</h1>
                        <p>This is the simplified, horizontal layout designed for ages 4+</p>
                        <p>Features:</p>
                        <ul>
                            <li>🏃 Horizontal scrolling motion blocks</li>
                            <li>👁️ Simple looks blocks</li>
                            <li>🔊 Easy sound controls</li>
                            <li>⚙️ Basic programming concepts</li>
                        </ul>
                    </div>
                </HorizontalLayout>
            ) : (
                // Age 7+ - Vertical Layout
                <div className={styles.verticalLayout}>
                    <div className={styles.demoContent}>
                        <h1>Welcome to OpenBlocks for Older Learners! 🚀</h1>
                        <p>This is the full-featured vertical layout designed for ages 7+</p>
                        <p>Features:</p>
                        <ul>
                            <li>🎯 Full OpenBlocks functionality</li>
                            <li>📐 Vertical block arrangement</li>
                            <li>🔧 Advanced programming concepts</li>
                            <li>🎨 Beautiful orange theme</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

AgeDemo.propTypes = {
    intl: intlShape.isRequired
};

export default injectIntl(AgeDemo);

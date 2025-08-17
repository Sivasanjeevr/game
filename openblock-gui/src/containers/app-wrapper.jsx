import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {injectIntl, intlShape} from 'react-intl';

import AgeSelectionPopup from '../components/age-selection-popup/age-selection-popup.jsx';
import ageManager from '../lib/age-manager.js';

import classNames from 'classnames';
import styles from './app-wrapper.css';

const AppWrapper = ({
    children,
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

    // Don't render children until age is selected
    if (!currentAge) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p className={styles.loadingText}>Loading OpenBlocks...</p>
            </div>
        );
    }

    return (
        <div className={styles.appWrapper}>
            {/* Age Selection Popup */}
            {showAgePopup && (
                <AgeSelectionPopup onAgeSelect={handleAgeSelect} />
            )}

            {/* Main App Content */}
            <div className={styles.appContent}>
                {/* Age Indicator and Settings */}
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

                {/* Render children with age-based layout */}
                <div className={classNames(styles.appChildren, {
                    [styles.horizontalLayout]: ageManager.isYoungLearner(),
                    [styles.verticalLayout]: ageManager.isOlderLearner()
                })}>
                    {children}
                </div>
            </div>
        </div>
    );
};

AppWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    intl: intlShape.isRequired
};

const mapStateToProps = state => ({
    // Add any state mapping if needed
});

const mapDispatchToProps = dispatch => ({
    // Add any dispatch mapping if needed
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(AppWrapper));

import React from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import {injectIntl, intlShape} from 'react-intl';
import classNames from 'classnames';

import styles from './age-selection-popup.css';

const AgeSelectionPopup = ({
    onAgeSelect,
    onClose,
    intl
}) => {
    const handleAgeSelect = (ageGroup) => {
        onAgeSelect(ageGroup);
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    // Use createPortal to render popup at document root level, avoiding z-index stacking context issues
    return createPortal(
        <div className={styles.ageSelectionOverlay} onClick={handleClose}>
            <div className={styles.ageSelectionPopup} onClick={(e) => e.stopPropagation()}>
                <div className={styles.popupHeader}>
                    <button 
                        className={styles.closeButton}
                        onClick={handleClose}
                        aria-label="Close popup"
                    >
                        ×
                    </button>
                    <h2 className={styles.popupTitle}>
                        Welcome to My game! 🎉
                    </h2>
                    <p className={styles.popupSubtitle}>
                        Choose your experience level to get started
                    </p>
                </div>

                <div className={styles.ageOptions}>
                    <div 
                        className={styles.ageOption}
                        onClick={() => handleAgeSelect('4+')}
                    >
                        <div className={styles.ageIcon}>
                            <span className={styles.ageNumber}>4+</span>
                        </div>
                        <div className={styles.ageContent}>
                            <h3 className={styles.ageTitle}>Young Learners</h3>
                            <p className={styles.ageDescription}>
                                Simple, intuitive blocks arranged horizontally. 
                                Perfect for beginners and young children.
                            </p>
                        </div>
                        <div className={styles.selectButton}>
                            Choose This
                        </div>
                    </div>

                    <div 
                        className={styles.ageOption}
                        onClick={() => handleAgeSelect('7+')}
                    >
                        <div className={styles.ageIcon}>
                            <span className={styles.ageNumber}>7+</span>
                        </div>
                        <div className={styles.ageContent}>
                            <h3 className={styles.ageTitle}>Older Learners</h3>
                            <p className={styles.ageDescription}>
                                Advanced blocks with vertical layout. 
                                More features and complex programming concepts.
                            </p>
                        </div>
                        <div className={styles.selectButton}>
                            Choose This
                        </div>
                    </div>
                </div>

            </div>
        </div>,
        document.body // Render at document body level to escape stacking context
    );
};

AgeSelectionPopup.propTypes = {
    onAgeSelect: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    intl: intlShape.isRequired
};

export default injectIntl(AgeSelectionPopup);

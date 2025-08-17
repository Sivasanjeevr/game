import React from 'react';
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

    return (
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
                        Welcome to OpenBlocks! 🎉
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
        </div>
    );
};

AgeSelectionPopup.propTypes = {
    onAgeSelect: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    intl: intlShape.isRequired
};

export default injectIntl(AgeSelectionPopup);

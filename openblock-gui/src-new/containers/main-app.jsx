import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {injectIntl, intlShape} from 'react-intl';

import AppWrapper from './app-wrapper.jsx';
import HorizontalLayout from '../components/horizontal-layout/horizontal-layout.jsx';
import ageManager from '../lib/age-manager.js';

import styles from './main-app.css';

const MainApp = ({
    children,
    intl
}) => {
    const currentAge = ageManager.getCurrentAge();
    const isYoungLearner = ageManager.isYoungLearner();

    return (
        <div className={styles.mainApp}>
            {isYoungLearner ? (
                // Age 4+ - Horizontal Layout
                <HorizontalLayout>
                    {children}
                </HorizontalLayout>
            ) : (
                // Age 7+ - Vertical Layout (existing GUI)
                <div className={styles.verticalLayout}>
                    {children}
                </div>
            )}
        </div>
    );
};

MainApp.propTypes = {
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
)(injectIntl(MainApp));

import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import Box from '../box/box.jsx';
import styles from './blocks.css';
import stylesYoung from './blocks-young.css';
import ageManager from '../../lib/age-manager.js';

const BlocksComponent = props => {
    const {
        containerRef,
        dragOver,
        ...componentProps
    } = props;
    
    // Apply age-specific styling
    const isYoungLearner = ageManager.isYoungLearner();
    
    return (
        <Box
            className={classNames(
                styles.blocks,
                {
                    [styles.dragOver]: dragOver,
                    [stylesYoung['blocks-young']]: isYoungLearner
                }
            )}
            {...componentProps}
            componentRef={containerRef}
        />
    );
};
BlocksComponent.propTypes = {
    containerRef: PropTypes.func,
    dragOver: PropTypes.bool
};
export default BlocksComponent;

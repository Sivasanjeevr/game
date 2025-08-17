import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl, intlShape} from 'react-intl';

import styles from './horizontal-layout.css';

const HorizontalLayout = ({
    children,
    intl
}) => {
    return (
        <div className={styles.horizontalLayout}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.logo}>
                    <span className={styles.logoText}>OpenBlocks</span>
                    <span className={styles.ageBadge}>4+</span>
                </div>
                <div className={styles.headerControls}>
                    <button className={styles.headerButton}>
                        <span className={styles.buttonIcon}>🏠</span>
                        Home
                    </button>
                    <button className={styles.headerButton}>
                        <span className={styles.buttonIcon}>💾</span>
                        Save
                    </button>
                    <button className={styles.headerButton}>
                        <span className={styles.buttonIcon}>▶️</span>
                        Run
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className={styles.mainContent}>
                {/* Left Sidebar - Horizontal Toolbox */}
                <div className={styles.leftSidebar}>
                    <div className={styles.toolboxHeader}>
                        <h3 className={styles.toolboxTitle}>Blocks</h3>
                        <p className={styles.toolboxSubtitle}>Drag blocks here</p>
                    </div>
                    
                    <div className={styles.horizontalToolbox}>
                        {/* Motion Category */}
                        <div className={styles.toolboxCategory}>
                            <div className={styles.categoryHeader}>
                                <span className={styles.categoryIcon}>🏃</span>
                                <span className={styles.categoryName}>Motion</span>
                            </div>
                            <div className={styles.horizontalBlocks}>
                                <div className={styles.block}>Move 10 steps</div>
                                <div className={styles.block}>Turn 15°</div>
                                <div className={styles.block}>Go to x:0 y:0</div>
                                <div className={styles.block}>Point in direction 90°</div>
                            </div>
                        </div>

                        {/* Looks Category */}
                        <div className={styles.toolboxCategory}>
                            <div className={styles.categoryHeader}>
                                <span className={styles.categoryIcon}>👁️</span>
                                <span className={styles.categoryName}>Looks</span>
                            </div>
                            <div className={styles.horizontalBlocks}>
                                <div className={styles.block}>Say Hello!</div>
                                <div className={styles.block}>Show</div>
                                <div className={styles.block}>Hide</div>
                                <div className={styles.block}>Change size by 10</div>
                            </div>
                        </div>

                        {/* Sound Category */}
                        <div className={styles.toolboxCategory}>
                            <div className={styles.categoryHeader}>
                                <span className={styles.categoryIcon}>🔊</span>
                                <span className={styles.categoryName}>Sound</span>
                            </div>
                            <div className={styles.horizontalBlocks}>
                                <div className={styles.block}>Play sound</div>
                                <div className={styles.block}>Stop all sounds</div>
                                <div className={styles.block}>Change volume by 10</div>
                            </div>
                        </div>

                        {/* Control Category */}
                        <div className={styles.toolboxCategory}>
                            <div className={styles.categoryHeader}>
                                <span className={styles.categoryIcon}>⚙️</span>
                                <span className={styles.categoryName}>Control</span>
                            </div>
                            <div className={styles.horizontalBlocks}>
                                <div className={styles.block}>Wait 1 second</div>
                                <div className={styles.block}>Repeat 10 times</div>
                                <div className={styles.block}>If touching edge</div>
                                <div className={styles.block}>Forever</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center - Code Area */}
                <div className={styles.codeArea}>
                    <div className={styles.codeHeader}>
                        <h3 className={styles.codeTitle}>Code</h3>
                        <p className={styles.codeSubtitle}>Build your program here</p>
                    </div>
                    
                    <div className={styles.codeWorkspace}>
                        <div className={styles.workspacePlaceholder}>
                            <span className={styles.placeholderIcon}>🎯</span>
                            <p className={styles.placeholderText}>
                                Drag blocks from the left to start building!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Stage and Sprites */}
                <div className={styles.rightSidebar}>
                    <div className={styles.stageSection}>
                        <div className={styles.stageHeader}>
                            <h3 className={styles.stageTitle}>Stage</h3>
                        </div>
                        <div className={styles.stageArea}>
                            <div className={styles.stagePlaceholder}>
                                <span className={styles.stageIcon}>🎭</span>
                                <p className={styles.stageText}>Your project will appear here</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.spritesSection}>
                        <div className={styles.spritesHeader}>
                            <h3 className={styles.spritesTitle}>Sprites</h3>
                        </div>
                        <div className={styles.spritesList}>
                            <div className={styles.spriteItem}>
                                <span className={styles.spriteIcon}>🐱</span>
                                <span className={styles.spriteName}>Sprite 1</span>
                            </div>
                            <button className={styles.addSpriteButton}>
                                <span className={styles.addIcon}>+</span>
                                Add Sprite
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

HorizontalLayout.propTypes = {
    children: PropTypes.node,
    intl: intlShape.isRequired
};

export default injectIntl(HorizontalLayout);

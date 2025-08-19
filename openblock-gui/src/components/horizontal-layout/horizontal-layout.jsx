import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl, intlShape} from 'react-intl';
import classNames from 'classnames';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import tabStyles from 'react-tabs/style/react-tabs.css';

import Blocks from '../../containers/blocks.jsx';
import CostumeTab from '../../containers/costume-tab.jsx';
import TargetPane from '../../containers/target-pane.jsx';
import SoundTab from '../../containers/sound-tab.jsx';
import StageWrapper from '../../containers/stage-wrapper.jsx';
import Box from '../box/box.jsx';
import Watermark from '../../containers/watermark.jsx';
import Hardware from '../../containers/hardware.jsx';
import HardwareHeader from '../../containers/hardware-header.jsx';
import DragLayer from '../../containers/drag-layer.jsx';

import styles from './horizontal-layout.css';

const HorizontalLayout = ({
    children,
    intl,
    // Props that would normally come from the main GUI
    vm,
    stageSize,
    isRealtimeMode,
    isFullScreen,
    isRendererSupported,
    isRtl,
    stageSizeMode,
    blocksTabVisible,
    costumesTabVisible,
    soundsTabVisible,
    costumeLibraryVisible,
    backdropLibraryVisible,
    canUseCloud,
    basePath,
    activeTabIndex,
    targetIsStage,
    onActivateTab,
    onActivateCostumesTab,
    onActivateSoundsTab,
    onExtensionButtonClick,
    onShowMessageBox,
    // Add other necessary props here
    ...props
}) => {
    // Default values for props if not provided
    const defaultProps = {
        vm: vm || {},
        stageSize: stageSize || 'large',
        isRealtimeMode: isRealtimeMode || false,
        isFullScreen: isFullScreen || false,
        isRendererSupported: isRendererSupported !== undefined ? isRendererSupported : true,
        isRtl: isRtl || false,
        stageSizeMode: stageSizeMode || 'large',
        blocksTabVisible: blocksTabVisible !== undefined ? blocksTabVisible : true,
        costumesTabVisible: costumesTabVisible !== undefined ? costumesTabVisible : false,
        soundsTabVisible: soundsTabVisible !== undefined ? soundsTabVisible : false,
        costumeLibraryVisible: costumeLibraryVisible || false,
        backdropLibraryVisible: backdropLibraryVisible || false,
        canUseCloud: canUseCloud || false,
        basePath: basePath || './',
        activeTabIndex: activeTabIndex || 0,
        targetIsStage: targetIsStage || false,
        onActivateTab: onActivateTab || (() => {}),
        onActivateCostumesTab: onActivateCostumesTab || (() => {}),
        onActivateSoundsTab: onActivateSoundsTab || (() => {}),
        onExtensionButtonClick: onExtensionButtonClick || (() => {}),
        onShowMessageBox: onShowMessageBox || (() => {})
    };

    const tabClassNames = {
        tabs: styles.tabs,
        tab: classNames(tabStyles.reactTabsTab, styles.tab),
        tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
        tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
        tabPanelSelected: classNames(tabStyles.reactTabsTabPanelSelected, styles.isSelected),
        tabSelected: classNames(tabStyles.reactTabsTabSelected, styles.isSelected)
    };

    return (
        <div className={styles.horizontalLayout}>
            {/* Menu Bar would be here - handled by parent */}
            
            {/* Main Content Area - PictoBlox-style Layout for Age 4+ */}
            <Box className={styles.bodyWrapper}>
                <Box className={styles.flexWrapper}>
                    {/* Left Side - Large Coding Area */}
                    <Box className={styles.codingAreaWrapper}>
                        <Tabs
                            forceRenderTabPanel
                            className={tabClassNames.tabs}
                            selectedIndex={defaultProps.activeTabIndex}
                            selectedTabClassName={tabClassNames.tabSelected}
                            selectedTabPanelClassName={tabClassNames.tabPanelSelected}
                            onSelect={defaultProps.onActivateTab}
                        >
                            {/* Horizontal Tab List at Top */}
                            <TabList className={tabClassNames.tabList}>
                                <Tab className={tabClassNames.tab}>
                                    <img
                                        draggable={false}
                                        src={require('../gui/icon--code.svg')}
                                    />
                                    <span className={styles.tabText}>Code</span>
                                </Tab>
                                <Tab
                                    className={tabClassNames.tab}
                                    onClick={defaultProps.onActivateCostumesTab}
                                >
                                    <img
                                        draggable={false}
                                        src={require('../gui/icon--costumes.svg')}
                                    />
                                    <span className={styles.tabText}>
                                        {defaultProps.targetIsStage ? 'Backdrops' : 'Costumes'}
                                    </span>
                                </Tab>
                                <Tab
                                    className={tabClassNames.tab}
                                    onClick={defaultProps.onActivateSoundsTab}
                                >
                                    <img
                                        draggable={false}
                                        src={require('../gui/icon--sounds.svg')}
                                    />
                                    <span className={styles.tabText}>Sounds</span>
                                </Tab>
                            </TabList>

                            {/* Code Tab Panel */}
                            <TabPanel className={tabClassNames.tabPanel}>
                                <Box className={styles.blocksWrapper}>
                                    <Blocks
                                        canUseCloud={defaultProps.canUseCloud}
                                        grow={1}
                                        isVisible={defaultProps.blocksTabVisible}
                                        options={{
                                            media: `${defaultProps.basePath}static/blocks-media/`
                                        }}
                                        stageSize={defaultProps.stageSize}
                                        vm={defaultProps.vm}
                                        onShowMessageBox={defaultProps.onShowMessageBox}
                                    />
                                </Box>
                                {/* <Box className={styles.extensionButtonContainer}>
                                    <button
                                        className={styles.extensionButton}
                                        title="Add Extension"
                                        onClick={defaultProps.onExtensionButtonClick}
                                    >
                                        <img
                                            className={styles.extensionButtonIcon}
                                            draggable={false}
                                            src={require('../gui/icon--extensions.svg')}
                                        />
                                    </button>
                                </Box> */}
                                {/* <Box className={styles.watermark}>
                                    <Watermark />
                                </Box> */}
                            </TabPanel>

                            {/* Costumes Tab Panel */}
                            <TabPanel className={tabClassNames.tabPanel}>
                                {defaultProps.costumesTabVisible ? <CostumeTab vm={defaultProps.vm} /> : null}
                            </TabPanel>

                            {/* Sounds Tab Panel */}
                            <TabPanel className={tabClassNames.tabPanel}>
                                {defaultProps.soundsTabVisible ? <SoundTab
                                    vm={defaultProps.vm}
                                    onShowMessageBox={defaultProps.onShowMessageBox}
                                /> : null}
                            </TabPanel>
                        </Tabs>
                    </Box>

                    {/* Right Side - Stage and Target */}
                    <Box className={styles.stageAndTargetWrapper}>
                        <StageWrapper
                            isFullScreen={defaultProps.isFullScreen}
                            isRendererSupported={defaultProps.isRendererSupported}
                            isRtl={defaultProps.isRtl}
                            stageSize={defaultProps.stageSize}
                            vm={defaultProps.vm}
                        />
                        <Box className={styles.targetWrapper}>
                            <TargetPane
                                stageSize={defaultProps.stageSize}
                                vm={defaultProps.vm}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Hardware Section */}
                {((defaultProps.isRealtimeMode === false) && (defaultProps.stageSizeMode !== 'hide')) ? (
                    <Hardware
                        vm={defaultProps.vm}
                        stageSize={defaultProps.stageSize}
                    />
                ) : null}

                {/* Drag Layer */}
                <DragLayer />

                {/* Hardware Header */}
                {(defaultProps.isRealtimeMode === false) ? (
                    <HardwareHeader
                        vm={defaultProps.vm}
                        stageSize={defaultProps.stageSize}
                    />
                ) : null}
            </Box>
        </div>
    );
};

HorizontalLayout.propTypes = {
    children: PropTypes.node,
    intl: intlShape.isRequired,
    // Add all the props that would normally come from the main GUI
    vm: PropTypes.object,
    stageSize: PropTypes.string,
    isRealtimeMode: PropTypes.bool,
    isFullScreen: PropTypes.bool,
    isRendererSupported: PropTypes.bool,
    isRtl: PropTypes.bool,
    stageSizeMode: PropTypes.string,
    blocksTabVisible: PropTypes.bool,
    costumesTabVisible: PropTypes.bool,
    soundsTabVisible: PropTypes.bool,
    costumeLibraryVisible: PropTypes.bool,
    backdropLibraryVisible: PropTypes.bool,
    canUseCloud: PropTypes.bool,
    basePath: PropTypes.string,
    activeTabIndex: PropTypes.number,
    targetIsStage: PropTypes.bool,
    onActivateTab: PropTypes.func,
    onActivateCostumesTab: PropTypes.func,
    onActivateSoundsTab: PropTypes.func,
    onExtensionButtonClick: PropTypes.func,
    onShowMessageBox: PropTypes.func
};

export default injectIntl(HorizontalLayout);

import ScratchBlocks from 'openblock-blocks';

import {eventBlock} from './libraries/devices/index.jsx';

const categorySeparator = '<sep gap="36"/>';
const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px

/* ========================================
   YOUNG LEARNERS (AGE 4+) TOOLBOX CUSTOMIZATIONS
   ======================================== */

/* eslint-disable no-unused-vars */
const motion = function (isInitialSetup, isStage, targetId) {
    const stageSelected = ScratchBlocks.ScratchMsgs.translate(
        'MOTION_STAGE_SELECTED',
        'Stage selected: no motion blocks'
    );
    return `
    <category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC">
        ${isStage ? `
        <label text="${stageSelected}"></label>
        ` : `
        <!-- SIMPLIFIED MOTION BLOCKS FOR YOUNG LEARNERS -->
        <block type="motion_movesteps">
            <value name="STEPS">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnright">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnleft">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <!-- Simplified positioning blocks -->
        <block type="motion_goto">
            <value name="TO">
                <shadow type="motion_goto_menu">
                </shadow>
            </value>
        </block>
        <!-- Remove complex blocks like glideto, pointindirection for young learners -->
        ${blockSeparator}
        <block id="${targetId}_xposition" type="motion_xposition"/>
        <block id="${targetId}_yposition" type="motion_yposition"/>
        `}
        ${categorySeparator}
    </category>
    `;
};

const xmlEscape = function (unsafe) {
    return unsafe.replace(/[<>&'"]/g, c => {
        switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        }
    });
};

const looks = function (isInitialSetup, isStage, targetId, costumeName, backdropName) {
    const hello = ScratchBlocks.ScratchMsgs.translate('LOOKS_HELLO', 'Hello!');
    const hmm = ScratchBlocks.ScratchMsgs.translate('LOOKS_HMM', 'Hmm...');
    return `
    <category name="%{BKY_CATEGORY_LOOKS}" id="looks" colour="#9966FF" secondaryColour="#774DCB">
        ${isStage ? '' : `
        <!-- SIMPLIFIED LOOKS BLOCKS FOR YOUNG LEARNERS -->
        <block type="looks_say">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">${hello}</field>
                </shadow>
            </value>
        </block>
        <block type="looks_think">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">${hmm}</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        `}
        ${isStage ? `
            <!-- Stage backdrop blocks -->
            <block type="looks_switchbackdropto">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops">
                        <field name="BACKDROP">${backdropName}</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_nextbackdrop"/>
        ` : `
            <!-- Sprite costume blocks - simplified -->
            <block type="looks_switchcostumeto">
                <value name="COSTUME">
                    <shadow type="looks_costume">
                        <field name="COSTUME">${costumeName}</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_nextcostume"/>
            ${blockSeparator}
            <!-- Simplified show/hide -->
            <block type="looks_show"/>
            <block type="looks_hide"/>
            ${blockSeparator}
            <!-- Basic size blocks -->
            <block type="looks_setsizeto">
                <value name="SIZE">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_changesizeby">
                <value name="CHANGE">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            <!-- Remove complex visual effects for young learners -->
        `}
        ${categorySeparator}
    </category>
    `;
};

const sound = function (isInitialSetup, isStage, targetId, soundName) {
    return `
    <category name="%{BKY_CATEGORY_SOUND}" id="sound" colour="#D65CD6" secondaryColour="#BD42BD">
        <!-- SIMPLIFIED SOUND BLOCKS FOR YOUNG LEARNERS -->
        <block id="${targetId}_sound_play" type="sound_play">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu">
                    <field name="SOUND_MENU">${soundName}</field>
                </shadow>
            </value>
        </block>
        <block type="sound_stopallsounds"/>
        ${blockSeparator}
        <!-- Basic volume control only -->
        <block type="sound_setvolumeto">
            <value name="VOLUME">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block id="${targetId}_volume" type="sound_volume"/>
        <!-- Remove complex sound effects for young learners -->
        ${categorySeparator}
    </category>
    `;
};

const events = function (isInitialSetup, isStage, targetId) {
    return `
    <category name="%{BKY_CATEGORY_EVENTS}" id="event" colour="#FFD500" secondaryColour="#CC9900">
        <!-- SIMPLIFIED EVENTS FOR YOUNG LEARNERS -->
        <block type="event_whenflagclicked"/>
        <block type="event_whenkeypressed"/>
        <block type="event_whenthisspriteclicked"/>
        ${blockSeparator}
        <!-- Keep it simple - remove complex broadcast events -->
        ${categorySeparator}
    </category>
    `;
};

const control = function (isInitialSetup, isStage, targetId, isRealtimeMode) {
    return `
    <category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#FFAB19" secondaryColour="#CF8B17">
        <!-- SIMPLIFIED CONTROL BLOCKS FOR YOUNG LEARNERS -->
        <block type="control_wait">
            <value name="DURATION">
                <shadow type="math_positive_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="control_repeat">
            <value name="TIMES">
                <shadow type="math_whole_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block id="forever" type="control_forever"/>
        ${blockSeparator}
        <!-- Basic conditionals only -->
        <block type="control_if"/>
        <!-- Remove complex control structures for young learners -->
        ${categorySeparator}
    </category>
    `;
};

const sensing = function (isInitialSetup, isStage, targetId) {
    return `
    <category name="%{BKY_CATEGORY_SENSING}" id="sensing" colour="#4CBFE6" secondaryColour="#2E8EB8">
        <!-- BASIC SENSING FOR YOUNG LEARNERS -->
        <block type="sensing_touchingobject">
            <value name="TOUCHINGOBJECTMENU">
                <shadow type="sensing_touchingobjectmenu"/>
            </value>
        </block>
        <block type="sensing_touchingcolor">
            <value name="COLOR">
                <shadow type="colour_picker"/>
            </value>
        </block>
        ${blockSeparator}
        <!-- Keep mouse and key detection simple -->
        <block type="sensing_mousedown"/>
        <block type="sensing_mousex"/>
        <block type="sensing_mousey"/>
        <!-- Remove complex sensing blocks for young learners -->
        ${categorySeparator}
    </category>
    `;
};

const operators = function (isInitialSetup, isStage, targetId) {
    return `
    <category name="%{BKY_CATEGORY_OPERATORS}" id="operators" colour="#40BF4A" secondaryColour="#389438">
        <!-- SIMPLIFIED OPERATORS FOR YOUNG LEARNERS -->
        <block type="operator_add">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_subtract">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <!-- Basic comparison -->
        <block type="operator_gt">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT">50</field>
                </shadow>
            </value>
        </block>
        <block type="operator_equals">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT">50</field>
                </shadow>
            </value>
        </block>
        <!-- Remove complex operators for young learners -->
        ${categorySeparator}
    </category>
    `;
};

const variables = function (isInitialSetup, isStage, targetId) {
    return `
    <category name="%{BKY_CATEGORY_VARIABLES}" id="data" colour="#FF8C1A" secondaryColour="#DB6E00" custom="VARIABLE">
        <!-- SIMPLIFIED VARIABLES FOR YOUNG LEARNERS -->
        <!-- Variables will be populated automatically -->
        ${categorySeparator}
    </category>
    `;
};

const myBlocks = function (isInitialSetup, isStage, targetId) {
    return `
    <category name="%{BKY_CATEGORY_MYBLOCKS}" id="procedures" colour="#FF6680" secondaryColour="#FF4D6A" custom="PROCEDURE">
        <!-- SIMPLIFIED MY BLOCKS FOR YOUNG LEARNERS -->
        <!-- Custom blocks will be populated automatically -->
        ${categorySeparator}
    </category>
    `;
};

const xmlOpen = '<xml style="display: none">';
const xmlClose = '</xml>';

/**
 * @param {!boolean} isInitialSetup - Whether the toolbox is for initial setup
 * @param {?object} device - Full data of current selected device
 * @param {?boolean} isStage - Whether the toolbox is for a stage-type target
 * @param {?string} targetId - The current editing target
 * @param {?Array.<object>} categoriesXML - optional array of `{id,xml}` for categories
 * @param {?boolean} isRealtimeMode - Current program mode
 * @param {?string} costumeName - The name of the default selected costume dropdown
 * @param {?string} backdropName - The name of the default selected backdrop dropdown
 * @param {?string} soundName - The name of the default selected sound dropdown
 * @returns {string} - a ScratchBlocks-style XML document for the contents of the toolbox (YOUNG LEARNERS VERSION)
 */
const makeToolboxXMLYoung = function (isInitialSetup, device = null, isStage = true, targetId, categoriesXML = [],
    isRealtimeMode = true,
    costumeName = '', backdropName = '', soundName = '') {
    isStage = isInitialSetup || isStage;
    const gap = [categorySeparator];

    costumeName = xmlEscape(costumeName);
    backdropName = xmlEscape(backdropName);
    soundName = xmlEscape(soundName);
    categoriesXML = categoriesXML.slice();
    const moveCategory = categoryId => {
        const index = categoriesXML.findIndex(categoryInfo => categoryInfo.id === categoryId);
        if (index >= 0) {
            // remove the category from categoriesXML and return its XML
            const [categoryInfo] = categoriesXML.splice(index, 1);
            return categoryInfo.xml;
        }
        // return `undefined`
    };

    const everything = [];

    // YOUNG LEARNERS - Generate simplified categories
    const motionXML = moveCategory('motion') || motion(isInitialSetup, isStage, targetId);
    const looksXML = moveCategory('looks') || looks(isInitialSetup, isStage, targetId, costumeName, backdropName);
    const soundXML = moveCategory('sound') || sound(isInitialSetup, isStage, targetId, soundName);
    let eventsXML = moveCategory('event') || events(isInitialSetup, isStage, targetId);
    const controlXML = moveCategory('control') || control(isInitialSetup, isStage, targetId, isRealtimeMode);
    const sensingXML = moveCategory('sensing') || sensing(isInitialSetup, isStage, targetId);
    const operatorsXML = moveCategory('operators') || operators(isInitialSetup, isStage, targetId);
    const variablesXML = moveCategory('data') || variables(isInitialSetup, isStage, targetId);
    const myBlocksXML = moveCategory('procedures') || myBlocks(isInitialSetup, isStage, targetId);

    if (device && !isRealtimeMode) {
        eventsXML = `
        <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#FFD500" secondaryColour="#CC9900">
            ${eventBlock[device.type]}
            ${categorySeparator}
        </category>
    `;
        everything.push(
            xmlOpen,
            eventsXML, gap,
            controlXML, gap,
            operatorsXML, gap,
            variablesXML, gap,
            myBlocksXML
        );
    } else {
        // YOUNG LEARNERS - Simplified category order
        everything.push(
            xmlOpen,
            motionXML, gap,
            looksXML, gap,
            soundXML, gap,
            eventsXML, gap,
            controlXML, gap,
            sensingXML, gap,
            operatorsXML, gap,
            variablesXML, gap,
            myBlocksXML
        );
    }

    for (const extensionCategory of categoriesXML) {
        everything.push(gap, extensionCategory.xml);
    }

    everything.push(xmlClose);
    return everything.join('\n');
};

export default makeToolboxXMLYoung;

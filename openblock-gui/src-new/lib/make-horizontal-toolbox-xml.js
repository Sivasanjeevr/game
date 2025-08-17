/**
 * Horizontal Toolbox XML Generator for Young Learners (4+)
 * Creates a simplified, intuitive toolbox with horizontal block arrangement
 */

import {getLocale} from '../locale';

const makeHorizontalToolboxXML = function (customCategories) {
    const locale = getLocale();
    
    // Simplified categories for young learners
    const youngLearnerCategories = [
        {
            name: locale.BKY_CATEGORY_MOTION,
            id: 'motion',
            colour: '#FF8C42', // Beautiful orange
            secondaryColour: '#E67E3A',
            blocks: [
                'motion_movesteps',
                'motion_turnright',
                'motion_turnleft',
                'motion_goto',
                'motion_gotoxy'
            ]
        },
        {
            name: locale.BKY_CATEGORY_LOOKS,
            id: 'looks',
            colour: '#9966FF',
            secondaryColour: '#774DCB',
            blocks: [
                'looks_say',
                'looks_think',
                'looks_show',
                'looks_hide',
                'looks_switchcostumeto'
            ]
        },
        {
            name: locale.BKY_CATEGORY_SOUNDS,
            id: 'sounds',
            colour: '#CF63CF',
            secondaryColour: '#BD42BD',
            blocks: [
                'sound_play',
                'sound_playuntildone',
                'sound_stopallsounds'
            ]
        },
        {
            name: locale.BKY_CATEGORY_EVENTS,
            id: 'events',
            colour: '#FFBF00',
            secondaryColour: '#CC9900',
            blocks: [
                'event_whenflagclicked',
                'event_whenthisspriteclicked',
                'event_whenkeypressed'
            ]
        },
        {
            name: locale.BKY_CATEGORY_CONTROL,
            id: 'control',
            colour: '#FFAB19',
            secondaryColour: '#CF8B17',
            blocks: [
                'control_wait',
                'control_repeat',
                'control_forever',
                'control_if',
                'control_wait_until'
            ]
        }
    ];

    // Start building the XML
    let xml = '<xml id="toolbox" style="display: none">\n';
    
    // Add custom categories if provided
    if (customCategories && customCategories.length > 0) {
        customCategories.forEach(category => {
            xml += `  <category name="${category.name}" id="${category.id}" colour="${category.colour}" secondaryColour="${category.secondaryColour}">\n`;
            if (category.blocks) {
                category.blocks.forEach(block => {
                    xml += `    <block type="${block}"></block>\n`;
                });
            }
            xml += '  </category>\n';
        });
    } else {
        // Use default young learner categories
        youngLearnerCategories.forEach(category => {
            xml += `  <category name="${category.name}" id="${category.id}" colour="${category.colour}" secondaryColour="${category.secondaryColour}">\n`;
            category.blocks.forEach(block => {
                xml += `    <block type="${block}"></block>\n`;
            });
            xml += '  </category>\n';
        });
    }

    xml += '</xml>';
    
    return xml;
};

export default makeHorizontalToolboxXML;

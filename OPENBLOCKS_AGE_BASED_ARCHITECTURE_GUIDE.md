# 🎯 OpenBlocks Age-Based Architecture Guide

## 🌟 **Overview**

This guide explains the OpenBlocks architecture and how to implement age-specific UI modifications for Age 4+ and Age 7+ groups. The system is designed to provide different experiences based on user age selection.

## 🏗️ **Architecture Overview**

OpenBlocks consists of several interconnected packages that work together:

```
game-project/
├── openblock-gui/          # Main GUI application (React)
├── openblock-blocks/       # Block definitions and toolbox
├── openblock-vm/           # Virtual machine for execution
├── openblock-link/         # Hardware communication
└── openblock-resource/     # Resource management
```

## 🔗 **Package Dependencies & npm link**

The packages use `npm link` for local development:

```bash
# In openblock-blocks directory
npm link

# In openblock-gui directory  
npm link openblock-blocks

# In openblock-vm directory
npm link

# In openblock-gui directory
npm link openblock-vm
```

This allows you to make changes in one package and see them immediately in the GUI.

## 🎨 **Age-Based UI System Architecture**

### **1. Age Manager Service** (`openblock-gui/src/lib/age-manager.js`)
- **Central controller** for age-based decisions
- **Session storage** for user preferences
- **Event system** for age changes
- **Utility methods** for age-based logic

### **2. Age Selection Popup** (`openblock-gui/src/components/age-selection-popup/`)
- **User interface** for age selection
- **Beautiful design** with smooth animations
- **Responsive layout** for all devices

### **3. Layout Switching** (`openblock-gui/src/components/gui/gui.jsx`)
- **Main entry point** for age-based layout decisions
- **Conditional rendering** based on age selection
- **Integration** with age manager service

## 🎯 **How to Implement Age-Specific Modifications**

### **Age 4+ (Young Learners)**
- **Simplified interface** with fewer options
- **Horizontal layout** for blocks
- **Kid-friendly colors** and larger elements
- **Basic programming concepts** only

### **Age 7+ (Older Learners)**
- **Full-featured interface** with all options
- **Vertical layout** (traditional)
- **Advanced programming concepts**
- **Professional appearance**

## 📁 **File Structure for Age-Based Modifications**

```
openblock-gui/src/
├── components/
│   ├── age-selection-popup/     # Age selection UI
│   ├── horizontal-layout/       # Age 4+ layout
│   ├── blocks/                  # Block components
│   ├── gui/                     # Main GUI wrapper
│   └── menu-bar/                # Menu bar with age indicator
├── containers/
│   ├── blocks.jsx               # Blocks container
│   ├── gui.jsx                  # Main GUI container
│   └── app-wrapper.jsx          # App wrapper
├── lib/
│   ├── age-manager.js           # Age management service
│   ├── make-toolbox-xml.js      # Toolbox XML generation
│   └── layout-constants.js      # Layout constants
└── reducers/                    # State management
```

## 🔧 **Implementation Guide**

### **1. Hiding Operations for Age 4+**

#### **A. Modify Toolbox XML** (`openblock-gui/src/lib/make-toolbox-xml.js`)

```javascript
// Add age-based filtering to toolbox functions
const motion = function (isInitialSetup, isStage, targetId, ageGroup) {
    if (ageGroup === '4+') {
        // Simplified blocks for young learners
        return `
        <category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF">
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
        </category>
        `;
    } else {
        // Full blocks for older learners
        return `
        <category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF">
            <!-- All motion blocks -->
        </category>
        `;
    }
};
```

#### **B. Update makeToolboxXML Function**

```javascript
const makeToolboxXML = function (isInitialSetup, device = null, isStage = true, targetId, categoriesXML = [],
    isRealtimeMode = true, costumeName = '', backdropName = '', soundName = '', ageGroup = '7+') {
    
    // Pass ageGroup to category functions
    const motionXML = moveCategory('motion') || motion(isInitialSetup, isStage, targetId, ageGroup);
    const looksXML = moveCategory('looks') || looks(isInitialSetup, isStage, targetId, costumeName, backdropName, ageGroup);
    const soundXML = moveCategory('sound') || sound(isInitialSetup, isStage, targetId, soundName, ageGroup);
    const controlXML = moveCategory('control') || control(isInitialSetup, isStage, targetId, isRealtimeMode, ageGroup);
    
    // ... rest of the function
};
```

#### **C. Update Blocks Container** (`openblock-gui/src/containers/blocks.jsx`)

```javascript
import ageManager from '../lib/age-manager.js';

class Blocks extends React.Component {
    getToolboxXML() {
        const currentAge = ageManager.getCurrentAge();
        return makeToolboxXML(
            this.props.isInitialSetup,
            this.props.device,
            this.props.isStage,
            this.props.targetId,
            this.props.categoriesXML,
            this.props.isRealtimeMode,
            this.props.costumeName,
            this.props.backdropName,
            this.props.soundName,
            currentAge // Pass age to toolbox generation
        );
    }
}
```

### **2. Changing Display Orientation for Age 4+**

#### **A. Modify Block Styles** (`openblock-gui/src/components/blocks/blocks.css`)

```css
/* Age 4+ specific styles */
.blocks.age-4-plus :global(.blocklyToolboxDiv) {
    /* Horizontal layout for young learners */
    width: 100% !important;
    height: 120px !important;
    border-right: none;
    border-bottom: 1px solid $ui-black-transparent;
}

.blocks.age-4-plus :global(.blocklyFlyout) {
    /* Horizontal flyout */
    width: 100% !important;
    height: 120px !important;
    border-right: none;
    border-bottom: 1px solid $ui-black-transparent;
}

/* Age 7+ specific styles (default) */
.blocks.age-7-plus :global(.blocklyToolboxDiv) {
    /* Vertical layout for older learners */
    width: 250px !important;
    height: calc(100% - 3.25rem) !important;
    border-right: 1px solid $ui-black-transparent;
}
```

#### **B. Apply Age-Based Classes** (`openblock-gui/src/components/blocks/blocks.jsx`)

```javascript
import ageManager from '../../lib/age-manager.js';

const BlocksComponent = props => {
    const currentAge = ageManager.getCurrentAge();
    const ageClass = currentAge === '4+' ? 'age-4-plus' : 'age-7-plus';
    
    return (
        <div className={classNames(styles.blocks, ageClass)}>
            {/* Block content */}
        </div>
    );
};
```

### **3. Age-Specific Block Categories**

#### **A. Create Age-Specific Block Definitions** (`openblock-blocks/blocks_horizontal/`)

For Age 4+, create simplified block definitions:

```javascript
// openblock-blocks/blocks_horizontal/motion.js
Blockly.Blocks['motion_movesteps_simple'] = {
    init: function() {
        this.appendValueInput("STEPS")
            .setCheck("Number")
            .appendField("move")
            .appendField(new Blockly.FieldNumber(10, 0), "STEPS")
            .appendField("steps");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Colours.motion.primary);
        this.setTooltip("Move sprite by specified number of steps");
        this.setHelpUrl("");
    }
};
```

#### **B. Age-Specific Toolbox XML** (`openblock-blocks/blocks_horizontal/default_toolbox.js`)

```javascript
Blockly.Blocks.defaultToolbox = '<xml id="toolbox-categories" style="display: none">' +
    '<category name="🏃 Motion" id="motion" colour="#FF8C42">' +
        '<block type="motion_movesteps_simple"></block>' +
        '<block type="motion_turnright_simple"></block>' +
        '<block type="motion_turnleft_simple"></block>' +
    '</category>' +
    '<category name="👁️ Looks" id="looks" colour="#9966FF">' +
        '<block type="looks_say_simple"></block>' +
        '<block type="looks_show"></block>' +
        '<block type="looks_hide"></block>' +
    '</category>' +
    '<category name="🔊 Sound" id="sound" colour="#D65CD6">' +
        '<block type="sound_play_simple"></block>' +
        '<block type="sound_stopallsounds"></block>' +
    '</category>' +
    '<category name="⚙️ Control" id="control" colour="#FFAB19">' +
        '<block type="control_forever"></block>' +
        '<block type="control_repeat_simple"></block>' +
        '<block type="control_wait_simple"></block>' +
    '</category>' +
'</xml>';
```

### **4. Age-Based Layout Switching**

#### **A. Main GUI Component** (`openblock-gui/src/components/gui/gui.jsx`)

```javascript
import ageManager from '../../lib/age-manager.js';

const GUIComponent = props => {
    const [ageGroup, setAgeGroup] = useState(ageManager.getCurrentAge());
    
    // Render different layouts based on age
    if (ageManager.isYoungLearner()) {
        return (
            <HorizontalLayout {...props}>
                {/* Age 4+ specific content */}
            </HorizontalLayout>
        );
    } else {
        return (
            <VerticalLayout {...props}>
                {/* Age 7+ specific content */}
            </VerticalLayout>
        );
    }
};
```

#### **B. Horizontal Layout Component** (`openblock-gui/src/components/horizontal-layout/horizontal-layout.jsx`)

```javascript
const HorizontalLayout = props => {
    return (
        <div className={styles.horizontalLayout}>
            {/* Horizontal block categories */}
            <div className={styles.blockCategories}>
                <div className={styles.categoryRow}>
                    <div className={styles.category}>
                        <h3>🏃 Motion</h3>
                        <div className={styles.horizontalBlocks}>
                            {/* Horizontal scrolling blocks */}
                        </div>
                    </div>
                </div>
                {/* More categories */}
            </div>
        </div>
    );
};
```

## 🎨 **Age-Specific Styling**

### **Age 4+ Styling** (`openblock-gui/src/components/horizontal-layout/horizontal-layout.css`)

```css
.horizontalLayout {
    background: linear-gradient(135deg, #FFF8F0, #FEF6ED);
    padding: 20px;
}

.blockCategories {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.categoryRow {
    display: flex;
    gap: 20px;
    overflow-x: auto;
}

.category {
    min-width: 200px;
    background: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.horizontalBlocks {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding: 12px 0;
}

.block {
    min-width: 120px;
    padding: 12px;
    background: #FF8C42;
    color: white;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.block:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 140, 66, 0.3);
}
```

### **Age 7+ Styling** (Default OpenBlocks styling)

```css
/* Use existing OpenBlocks styles for older learners */
.verticalLayout {
    /* Traditional vertical layout */
}
```

## 🔄 **Dynamic Block Loading**

### **A. Age-Based Block Registry** (`openblock-gui/src/lib/age-based-blocks.js`)

```javascript
import ageManager from './age-manager.js';

const AgeBasedBlocks = {
    '4+': {
        motion: ['motion_movesteps_simple', 'motion_turnright_simple', 'motion_turnleft_simple'],
        looks: ['looks_say_simple', 'looks_show', 'looks_hide'],
        sound: ['sound_play_simple', 'sound_stopallsounds'],
        control: ['control_forever', 'control_repeat_simple', 'control_wait_simple']
    },
    '7+': {
        motion: ['motion_movesteps', 'motion_turnright', 'motion_turnleft', 'motion_goto', 'motion_gotoxy'],
        looks: ['looks_say', 'looks_think', 'looks_switchcostumeto', 'looks_changesizeby'],
        sound: ['sound_play', 'sound_playuntildone', 'sound_changeeffectby'],
        control: ['control_forever', 'control_repeat', 'control_if', 'control_if_else']
    }
};

export const getBlocksForAge = (ageGroup) => {
    return AgeBasedBlocks[ageGroup] || AgeBasedBlocks['7+'];
};

export const registerAgeBasedBlocks = (ageGroup) => {
    const blocks = getBlocksForAge(ageGroup);
    // Register blocks dynamically
    Object.keys(blocks).forEach(category => {
        blocks[category].forEach(blockType => {
            // Register block type
        });
    });
};
```

### **B. Dynamic Toolbox Generation**

```javascript
// In make-toolbox-xml.js
const generateAgeBasedToolbox = (ageGroup) => {
    const blocks = getBlocksForAge(ageGroup);
    
    let toolboxXML = '<xml id="toolbox-categories" style="display: none">';
    
    Object.keys(blocks).forEach(category => {
        toolboxXML += `<category name="${getCategoryName(category)}" id="${category}" colour="${getCategoryColor(category)}">`;
        
        blocks[category].forEach(blockType => {
            toolboxXML += `<block type="${blockType}"></block>`;
        });
        
        toolboxXML += '</category>';
    });
    
    toolboxXML += '</xml>';
    return toolboxXML;
};
```

## 🚀 **Development Workflow**

### **1. Local Development Setup**

```bash
# Clone all packages
git clone <openblock-gui>
git clone <openblock-blocks>
git clone <openblock-vm>

# Set up npm links
cd openblock-blocks
npm install
npm link

cd ../openblock-vm
npm install
npm link

cd ../openblock-gui
npm install
npm link openblock-blocks
npm link openblock-vm

# Start development
npm start
```

### **2. Making Changes**

#### **For Age 4+ Modifications:**
1. **Edit** `openblock-gui/src/components/horizontal-layout/`
2. **Edit** `openblock-gui/src/lib/make-toolbox-xml.js`
3. **Edit** `openblock-blocks/blocks_horizontal/`

#### **For Age 7+ Modifications:**
1. **Edit** `openblock-gui/src/components/gui/`
2. **Edit** `openblock-gui/src/lib/make-toolbox-xml.js`
3. **Edit** `openblock-blocks/blocks_vertical/`

### **3. Testing Changes**

```bash
# In openblock-gui directory
npm run build

# Test with different age groups
# Clear localStorage to test age selection
localStorage.clear()
```

## 📱 **Responsive Design Considerations**

### **Age 4+ (Touch-Friendly)**
- **Large buttons** (minimum 44px touch target)
- **Horizontal scrolling** for mobile devices
- **Simplified navigation** with clear visual hierarchy
- **Emoji icons** for easy recognition

### **Age 7+ (Desktop-First)**
- **Traditional layout** with vertical toolbox
- **Full feature set** with advanced options
- **Professional appearance** suitable for older learners
- **Keyboard shortcuts** and mouse interactions

## 🎯 **Key Implementation Points**

### **1. Age Detection**
```javascript
// Always check age before rendering
const currentAge = ageManager.getCurrentAge();
if (!currentAge) {
    // Show age selection popup
    return <AgeSelectionPopup onAgeSelect={handleAgeSelect} />;
}
```

### **2. Conditional Rendering**
```javascript
// Use age manager for all decisions
{ageManager.isYoungLearner() ? (
    <HorizontalLayout />
) : (
    <VerticalLayout />
)}
```

### **3. Dynamic Content**
```javascript
// Load age-specific content
const blocks = getBlocksForAge(ageManager.getCurrentAge());
const toolbox = generateAgeBasedToolbox(ageManager.getCurrentAge());
```

### **4. State Management**
```javascript
// Listen for age changes
useEffect(() => {
    const handleAgeChange = (newAge) => {
        // Reload components with new age
        window.location.reload();
    };
    
    ageManager.addListener(handleAgeChange);
    return () => ageManager.removeListener(handleAgeChange);
}, []);
```

## 🔍 **Debugging Tips**

### **1. Check Age Selection**
```javascript
console.log('Current age:', ageManager.getCurrentAge());
console.log('Is young learner:', ageManager.isYoungLearner());
console.log('Layout type:', ageManager.getLayoutType());
```

### **2. Verify npm Links**
```bash
# Check if packages are properly linked
npm ls openblock-blocks
npm ls openblock-vm
```

### **3. Clear Cache**
```bash
# Clear build cache
npm run clean
npm run build
```

## 📚 **Additional Resources**

- **AGE_BASED_UI_IMPLEMENTATION.md** - Previous implementation details
- **openblock-blocks/** - Block definitions and toolbox
- **openblock-vm/** - Virtual machine for execution
- **openblock-gui/src/lib/age-manager.js** - Age management service

## 🎉 **Summary**

This architecture guide provides a comprehensive framework for implementing age-specific UI modifications in OpenBlocks. The key is to:

1. **Use the age manager** for all age-based decisions
2. **Modify toolbox XML** to show/hide blocks based on age
3. **Create age-specific layouts** with different orientations
4. **Use npm links** for local development
5. **Implement conditional rendering** throughout the application

By following this guide, you can create a truly age-appropriate experience for both young learners (4+) and older learners (7+) while maintaining the flexibility to switch between layouts dynamically.

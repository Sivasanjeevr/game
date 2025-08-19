# Young Age Toolbox Customization Guide

## 🎯 Overview

This guide explains how to customize the vertical left menu (Motion, Looks, Sound, etc.) specifically for young learners (Age 4+) in OpenBlock GUI.

## 📁 File Structure

```
openblock-gui/src/
├── lib/
│   ├── make-toolbox-xml.js           # Original toolbox (Age 7+)
│   ├── make-toolbox-xml-young.js     # New young age toolbox (Age 4+) ⭐
│   └── age-manager.js                # Updated with toolbox detection
├── containers/
│   └── blocks.jsx                    # Updated to use age-specific toolbox
└── components/blocks/
    ├── blocks.jsx                    # Updated with age-specific CSS
    ├── blocks.css                    # Original styling
    └── blocks-young.css              # Young age styling ⭐
```

## 🔧 How It Works

### **1. Age Detection**
```javascript
// age-manager.js
getToolboxGenerator() {
    return this.isYoungLearner() ? 'young' : 'standard';
}
```

### **2. Toolbox Selection**
```javascript
// containers/blocks.jsx
const toolboxGenerator = ageManager.getToolboxGenerator();
const makeToolboxFunction = toolboxGenerator === 'young' ? makeToolboxXMLYoung : makeToolboxXML;
```

### **3. Visual Styling**
```javascript
// components/blocks/blocks.jsx
const isYoungLearner = ageManager.isYoungLearner();
className={classNames(styles.blocks, {
    [stylesYoung.blocksYoung]: isYoungLearner
})}
```

## 🎨 Young Age Customizations

### **Current Simplifications in `make-toolbox-xml-young.js`:**

#### **Motion Category:**
- ✅ Keep: Basic movement (move steps, turn left/right)
- ✅ Keep: Simple positioning (go to)
- ❌ Remove: Complex blocks (glide, point in direction)

#### **Looks Category:**
- ✅ Keep: Basic speech (say, think)
- ✅ Keep: Show/hide, costume switching
- ✅ Keep: Basic size changes
- ❌ Remove: Visual effects (brightness, ghost, etc.)

#### **Sound Category:**
- ✅ Keep: Play sound, stop all sounds
- ✅ Keep: Basic volume control
- ❌ Remove: Sound effects (pitch, pan, etc.)

#### **Events Category:**
- ✅ Keep: Flag clicked, key pressed, sprite clicked
- ❌ Remove: Broadcast events (too complex)

#### **Control Category:**
- ✅ Keep: Wait, repeat, forever
- ✅ Keep: Basic if statement
- ❌ Remove: Complex conditionals (if-else, wait until, etc.)

### **Visual Enhancements in `blocks-young.css`:**
- 📏 Larger category labels (1rem vs 0.75rem)
- 🎨 More colorful category highlighting
- 📱 Wider toolbox (200px vs default)
- ✏️ Bigger block text (14px vs default)
- 🔲 Thicker block outlines
- 🚫 Hidden complex UI (zoom, trash)

## 🛠️ How to Add More Customizations

### **1. Add New Simplified Blocks**
Edit `make-toolbox-xml-young.js`:
```javascript
const motion = function (isInitialSetup, isStage, targetId) {
    return `
    <category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF">
        <!-- Add your simplified blocks here -->
        <block type="your_custom_block">
            <value name="PARAM">
                <shadow type="math_number">
                    <field name="NUM">5</field>
                </shadow>
            </value>
        </block>
    </category>
    `;
};
```

### **2. Change Category Colors**
```javascript
// In make-toolbox-xml-young.js
<category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#FF6B6B" secondaryColour="#FF5252">
//                                                           ↑ Change this color
```

### **3. Add Custom Styling**
Edit `blocks-young.css`:
```css
/* Add custom styles for young learners */
.blocks-young :global(.your-custom-element) {
    /* Your custom styles */
    font-size: 1.2rem !important;
    background-color: #colorful !important;
}
```

### **4. Reorder Categories**
In `make-toolbox-xml-young.js`, change the order in the `everything.push()` section:
```javascript
everything.push(
    xmlOpen,
    soundXML, gap,      // Put Sound first for young learners
    motionXML, gap,     // Motion second
    looksXML, gap,      // Looks third
    // ... rest of categories
);
```

## 📋 Testing Your Changes

1. **Set Age to 4+**: In browser, select "4+" in the age popup
2. **Check Toolbox**: The left menu should use your customized blocks
3. **Verify Styling**: Categories should have young learner styling
4. **Switch Ages**: Switch between 4+ and 7+ to see differences

## 🔍 Debugging

### **Check Age Detection**
```javascript
// In browser console
console.log(ageManager.getCurrentAge());        // Should show "4+" or "7+"
console.log(ageManager.getToolboxGenerator());  // Should show "young" or "standard"
```

### **Verify File Loading**
- Check browser DevTools Network tab for `make-toolbox-xml-young.js`
- Check for CSS loading: `blocks-young.css`

## 🚀 Advanced Customizations

### **Add Custom Block Categories**
```javascript
// In make-toolbox-xml-young.js
const customCategory = function() {
    return `
    <category name="Fun Blocks" id="fun" colour="#FF69B4">
        <!-- Your custom blocks -->
    </category>
    `;
};

// Add to main function
const customXML = customCategory();
everything.push(
    xmlOpen,
    customXML, gap,
    motionXML, gap,
    // ... rest
);
```

### **Dynamic Block Generation**
```javascript
const motion = function (isInitialSetup, isStage, targetId) {
    const blocks = [];
    
    // Add blocks based on conditions
    if (someCondition) {
        blocks.push('<block type="conditional_block"/>');
    }
    
    return `
    <category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF">
        ${blocks.join('\n')}
    </category>
    `;
};
```

## 📝 Notes

- **Both age groups share the same block engine** - only the toolbox content and styling differs
- **Changes are hot-reloaded** during development
- **CSS changes require browser refresh**
- **Block XML changes require age re-selection or page refresh**

## 🤝 Contributing

When adding customizations:
1. Keep young learner blocks simple and colorful
2. Test on different screen sizes
3. Maintain accessibility
4. Document your changes
5. Consider gradual complexity introduction

---
**Happy Customizing! 🎨✨**

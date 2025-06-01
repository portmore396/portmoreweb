const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ICONS_DIR = 'icons';
const SOURCE_ICON = 'source-icon.png'; // Your source icon should be at least 512x512

// Create icons directory if it doesn't exist
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR);
}

// Icon sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 167, 180, 192, 384, 512];

// Generate icons
async function generateIcons() {
  try {
    for (const size of sizes) {
      await sharp(SOURCE_ICON)
        .resize(size, size)
        .toFile(path.join(ICONS_DIR, `icon-${size}x${size}.png`));
      console.log(`Generated ${size}x${size} icon`);
    }

    // Generate favicon
    await sharp(SOURCE_ICON)
      .resize(32, 32)
      .toFile(path.join(ICONS_DIR, 'favicon.ico'));
    console.log('Generated favicon');

    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 
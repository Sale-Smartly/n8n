const fs = require('fs');
const path = require('path');

/**
 * Copy non-TS assets (e.g. SVG icons) from source directories into dist,
 * preserving the same relative folder structure.
 */
const EXTENSIONS = ['.svg', '.png', '.jpg', '.json'];
const SOURCE_DIRS = ['nodes', 'credentials'];

function copyAssets(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyAssets(srcPath, destPath);
    } else if (EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
}

const root = path.resolve(__dirname, '..');
for (const dir of SOURCE_DIRS) {
  copyAssets(path.join(root, dir), path.join(root, 'dist', dir));
}

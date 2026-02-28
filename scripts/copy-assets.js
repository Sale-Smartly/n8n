const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.join(__dirname, '..');
const srcRoot = path.join(projectRoot, 'src');
const distRoot = path.join(projectRoot, 'dist');

const assetExtensions = new Set(['.svg', '.png']);

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyAssetsRecursively(currentDir) {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      copyAssetsRecursively(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!assetExtensions.has(ext)) continue;

    const relativeFromSrc = path.relative(srcRoot, fullPath);
    const targetPath = path.join(distRoot, relativeFromSrc);
    ensureDir(path.dirname(targetPath));
    fs.copyFileSync(fullPath, targetPath);
  }
}

copyAssetsRecursively(srcRoot);


/**
 * Configuration loader
 * Loads and merges base and local config files
 */

const fs = require('fs');
const path = require('path');

/**
 * Load JSON config file defensively
 */
function loadJsonConfig(filePath, { required = false } = {}) {
  if (!fs.existsSync(filePath)) {
    if (required) {
      throw new Error(
        `\nERROR: Missing ${filePath}\n` +
        `This file is required to run gulp.\n`
      );
    }
    return {};
  }
  const raw = fs.readFileSync(filePath, 'utf8').trim();
  if (!raw) {
    throw new Error(
      `\nERROR: ${filePath} exists but is empty.\n` +
      `Please provide valid JSON.\n`
    );
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(
      `\nERROR: ${filePath} contains invalid JSON:\n` +
      `  ${err.message}\n`
    );
  }
}

// Load configs from project root (parent directory of _build)
const rootPath = path.join(__dirname, '..');
const baseConfig = loadJsonConfig(path.join(rootPath, 'config.json'), { required: true });
const localConfig = loadJsonConfig(path.join(rootPath, 'config-local.json'));

// Merge configs (local overrides base)
const config = { ...baseConfig, ...localConfig };

module.exports = {
  config,
  baseConfig,
  localConfig,
  loadJsonConfig,
};

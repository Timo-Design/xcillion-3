/**
 * Path helpers for build system
 */

const path = require('path');
const { config } = require('./config');

const themeName = config.themeName;
const distFolder = config.distFolder || '_dist';

/**
 * Get dist skin path
 */
function distSkinPath() {
  return path.join(distFolder, 'Skins', themeName);
}

/**
 * Get dist container path
 */
function distContainerPath() {
  return path.join(distFolder, 'Containers', themeName);
}

/**
 * Get target skin path for a given base path
 */
function skinTarget(basePath) {
  return path.join(basePath, 'Skins', themeName);
}

/**
 * Get target container path for a given base path
 */
function containerTarget(basePath) {
  return path.join(basePath, 'Containers', themeName);
}

module.exports = {
  themeName,
  distFolder,
  distSkinPath,
  distContainerPath,
  skinTarget,
  containerTarget,
};

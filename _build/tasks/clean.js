/**
 * Clean tasks
 */

const del = require('del');
const { distFolder, skinTarget, containerTarget } = require('../helpers');
const { config } = require('../config');

const targetPaths = config.targetPaths || [];

/**
 * Clean dist folder
 */
function cleanDist() {
  return del([`${distFolder}/**`], { force: true });
}

/**
 * Clean skin targets
 */
function cleanSkins() {
  const paths = targetPaths.map(p => skinTarget(p));
  return del(paths, { force: true });
}

/**
 * Clean container targets
 */
function cleanContainers() {
  const paths = targetPaths.map(p => containerTarget(p));
  return del(paths, { force: true });
}

module.exports = {
  cleanDist,
  cleanSkins,
  cleanContainers,
};

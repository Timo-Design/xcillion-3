/**
 * Vendor management tasks
 */

const { src, dest } = require('gulp');
const fs = require('fs');
const { distSkinPath } = require('../helpers');
const { config, localConfig } = require('../config');

/**
 * Get vendor files from npm packages
 */
function getVendorsFromNpm() {
  const npmVendors = config.npmVendors || localConfig.npmVendors;
  
  if (!npmVendors || Object.keys(npmVendors).length === 0) {
    console.log('No npmVendors configured, skipping npm vendor copy.');
    return Promise.resolve();
  }
  
  const tasks = [];
  
  Object.entries(npmVendors).forEach(([vendorName, vendorConfig]) => {
    const basePath = `node_modules/${vendorConfig.package}`;
    
    // Check if package exists in node_modules
    if (!fs.existsSync(basePath)) {
      console.warn(`Warning: Package '${vendorConfig.package}' not found in node_modules. Run 'npm install' first.`);
      return;
    }
    
    vendorConfig.files.forEach(filePattern => {
      tasks.push(
        src(`${basePath}/${filePattern}`, { encoding: false })
          .pipe(dest(`vendors/${vendorName}`))
      );
    });
  });
  
  if (tasks.length === 0) {
    return Promise.resolve();
  }
  
  return Promise.all(tasks);
}

module.exports = {
  getVendorsFromNpm,
};

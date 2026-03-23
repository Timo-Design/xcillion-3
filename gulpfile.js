/**
 * Root-level gulpfile that delegates to _build/gulpfile.js
 * This allows `npx gulp` to work from the root directory
 */

module.exports = require('./_build/gulpfile.js');

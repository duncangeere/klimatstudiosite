const { dest, src } = require('gulp');

// Temporarily skip imagemin to test if the issue is with the source image
const images = () => {
  return src('./src/images/**/*')
    .pipe(dest('./dist/images'));
};

module.exports = images;
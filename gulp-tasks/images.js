const {dest, src} = require('gulp');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const optipng = require('imagemin-optipng');

// Grabs all images, runs them through imagemin
// and plops them in the dist folder
const images = () => {
  // We have specific configs for jpeg and png files to try
  // to really pull down asset sizes
  return src('./src/images/**/*')
    //.pipe(
    //  imagemin(
    //    [
    //      mozjpeg({quality: 60, progressive: true}),
    //      optipng({optimizationLevel: 5})
    //    ],
    //    {
    //      silent: true
    //    }
    //  )
    //)
    //.on('error', function (err) { 
    //  console.error('Image minification error:', err.message);
    //  this.emit('end');
    //})
    .pipe(dest('./dist/images'));
};

module.exports = images;
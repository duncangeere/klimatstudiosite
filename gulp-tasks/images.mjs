import { dest, src } from 'gulp';
import imagemin from 'gulp-imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import optipng from 'imagemin-optipng';

// Grabs all images, runs them through imagemin
// and plops them in the dist folder
const images = () => {
  // We have specific configs for jpeg and png files to try
  // to really pull down asset sizes
  return src('./src/images/**/*', { encoding: false })
    .pipe(
      imagemin(
        [
          mozjpeg({ quality: 60, progressive: true }),
          optipng({ optimizationLevel: 5, interlaced: null }),
        ],
        {
          silent: true,
        }
      )
    )
    .on('error', function (err) {
      console.error('Image minification error:', err.message);
      this.emit('end');
    })
    .pipe(dest('./dist/images'));
};

export default images;

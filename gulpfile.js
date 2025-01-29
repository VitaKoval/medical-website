const { task, watch, src, dest, parallel, series } = require("gulp"),
  browserSync = require("browser-sync"),
  sass = require("gulp-sass")(require("sass")),
  uglify = require("gulp-uglify"),
  babel = require("gulp-babel"),
  fileinclude = require("gulp-file-include"),
  prefixer = require("gulp-autoprefixer"),
  imagemin = require("gulp-imagemin"),
  sourcemaps = require("gulp-sourcemaps"),
  cssnano = require("gulp-cssnano"),
  rimraf = require("rimraf"),
  rename = require("gulp-rename"),
  stream = browserSync.stream;

//----------------------------------- Path ----------------------------//

const path = {
  build: {
    html: "build",
    css: "build/css",
    img: "build/img",
    js: "build/js",
    fonts: "build/fonts",
  },
  src: {
    html: "src/html/*.html",
    scss: "src/styles/*.sass",
    img: "src/img/**",
    js: "src/js/*.js",
    jsLib: "src/js-lib/*.js",
    fonts: "src/fonts/**",
  },
  watch: {
    html: "src/html/**",
    scss: "src/styles/**",
    js: "src/js/**",
    img: "src/img/**",
    fonts: "src/fonts/**",
  },
};

//----------------------------------- Html ----------------------------//

const html = function () {
  return src(path.src.html)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(dest(path.build.html))
    .pipe(stream());
};

//----------------------------------- Style ----------------------------//

const styles = function () {
  return (
    src(path.src.scss)
      .pipe(sourcemaps.init())
      .pipe(sass())
      // .pipe(prefixer())
      // .pipe(cssnano())
      .pipe(rename({ suffix: ".min" }))
      .pipe(sourcemaps.write("."))
      .pipe(dest(path.build.css))
      .pipe(stream())
  );
};

const styles_without_min = function () {
  return src(path.src.scss)
    .pipe(sass())
    .pipe(prefixer())
    .pipe(dest(path.build.css));
};

//----------------------------------- Fonts ----------------------------//

const fonts = function () {
  return src(path.src.fonts).pipe(dest(path.build.fonts)).pipe(stream());
};

//----------------------------------- JS ----------------------------//

const lib_scripts = function () {
  console.log("sadsd");
  return src(path.src.jsLib).pipe(dest(path.build.js));
};

const main_scripts = function () {
  return src(path.src.js)
    .pipe(
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              exclude: ["transform-regenerator"],
            },
          ],
        ],
      })
    )
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./"))
    .pipe(dest(path.build.js))
    .pipe(stream());
};

const scripts = parallel(main_scripts);

const scripts_without_min = function () {
  return src(path.src.js)
    .pipe(
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              exclude: ["transform-regenerator"],
            },
          ],
        ],
      })
    )
    .pipe(dest(path.build.js));
};

//----------------------------------- Image ----------------------------//

const image = function () {
  return src(path.src.img)
    .pipe(imagemin())
    .pipe(dest(path.build.img))
    .pipe(stream());
};

//----------------------------------- Serve ----------------------------//

const build = parallel(html, lib_scripts, styles, fonts, scripts, image);

const without_min = parallel(
  styles_without_min,
  scripts_without_min,
  lib_scripts
);

const webserver = function () {
  return browserSync.init({
    server: {
      baseDir: "./build",
    },
  });
};

const serve = () => {
  build();
  webserver();
  watch(path.watch.html, html);
  watch(path.watch.scss, styles);
  watch(path.src.fonts, fonts);
  watch(path.src.js, scripts);
  watch(path.src.jsLib, lib_scripts);
  watch(path.src.img, image);
};

//----------------------------------- Exports ----------------------------//

exports.build = series(build, without_min);

exports.default = serve;

//--------------------- Deploy GitHub Pages -----------------------------//

var gulp   = require('gulp');
var deploy = require('gulp-gh-pages');

gulp.task('deploy', function () {
  return gulp.src("./prod/**/*")
    .pipe(deploy({ 
      remoteUrl: "https://github.com/VitaKoval/medical-website.git",
      branch: "gh-pages"
    }))
  });

// const gulp = require('gulp');
// const { exec } = require('child_process');
// const pathModule = require('path'); 

// // Завдання для деплою на gh-pages
// gulp.task('deploy', function (cb) {
//   const buildPath = pathModule.join(__dirname, 'build');

//   // Виконання Git команд для деплою
//   exec(`git add .`, { cwd: buildPath }, (err, stdout, stderr) => {
//     if (err) {
//       console.error(`exec error: ${err}`);
//       return;
//     }
//     console.log(stdout);
//     console.error(stderr);

//     // Комітити зміни
//     exec(`git commit -m "Deploy build"`, { cwd: buildPath }, (err, stdout, stderr) => {
//       if (err) {
//         console.error(`exec error: ${err}`);
//         return;
//       }
//       console.log(stdout);
//       console.error(stderr);

//       // Пушити зміни на gh-pages
//       exec(`git push origin gh-pages`, { cwd: buildPath }, (err, stdout, stderr) => {
//         if (err) {
//           console.error(`exec error: ${err}`);
//           return;
//         }
//         console.log(stdout);
//         console.error(stderr);
//         cb(); // Завершуємо таску
//       });
//     });
//   });
// });

// const gulp = require('gulp');
// const { execSync } = require('child_process');

// gulp.task('deploy', function () {
//   // Додаємо файли до Git (включаючи ігноровані)
//   execSync('git add -f .', { stdio: 'inherit' });

//   // Проводимо commit і push
//   execSync('git commit -m "Deploy to gh-pages"', { stdio: 'inherit' });
//   execSync('git push origin main', { stdio: 'inherit' });
//   execSync('git subtree push --prefix build origin gh-pages', { stdio: 'inherit' });
// });

/****************************************************************************************************/
// MODULES IMPORT
/****************************************************************************************************/
const { src, dest, symlink, lastRun, series, parallel, watch } = require('gulp');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNormalize = require('postcss-normalize');
const postcssImport = require('postcss-import');
const postcssCsso = require('postcss-csso');
const tailwind = require('tailwindcss');
const gulpPurgeCss = require('gulp-purgecss');
const webpack = require('webpack');
const gulpwebpack = require('webpack-stream');
const mainNpmFiles = require('npmfiles');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgSprite = require('gulp-svg-sprite');
const favicons = require('gulp-favicons');
const plumber = require('gulp-plumber');
const newer = require('gulp-newer');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const del = require('del');
const flatten = require('gulp-flatten');
const remember = require('gulp-remember');
const cached = require('gulp-cached');
const hash = require('gulp-hash');
const rename = require('gulp-rename');
const path = require('path');
const fs = require('fs');
const { create } = require('browser-sync');

/****************************************************************************************************/
// DEV OR PRODUCTION
/****************************************************************************************************/
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

/****************************************************************************************************/
// CREATE BROWSER-SYNC INSTANCE
/****************************************************************************************************/
const browserSync = create();

/****************************************************************************************************/
// BROWSER-SYNC TASK
/****************************************************************************************************/
const domain_name = 'modx-build-system.loc';
const serve = cb => {
  browserSync.init({
    host: `dev.${domain_name}`,
    proxy: {
      target: domain_name,
      cookies: { stripDomain: false }
    },
    port: 3000,
    files: [
      'www/assets/**/*.*',
      'www/core/elements/**/*.*'
    ],
    open: false,
    notify: false
  });
  cb();
};
exports.serve = serve;
/****************************************************************************************************/
// DEL BUILD DIRECTORY TASK
/****************************************************************************************************/
const clean = () => del(['www/assets/{css,fonts,img,js}']);
exports.clean = clean;
/****************************************************************************************************/
// PATHS AND SETTINGS
/****************************************************************************************************/
const cms = {
  modx: {
    html: 'www/core/elements/',
    css: 'www/assets/css/',
    js: 'www/assets/js/',
    img: 'www/assets/',
    libs: 'www/assets/libs/',
    fonts: 'www/assets/fonts/',
    favicon: 'www/assets/img/favicons'
  }
};
/****************************************************************************************************/
// CSS TASK
/****************************************************************************************************/
const css = () =>
  src('src/css/style.css', { sourcemaps: true })
    .pipe(plumber())
    .pipe(hash())
    .pipe(postcss([
      postcssImport({ path: ['src/css'] }),
      postcssNormalize({ forceImport: true }),
      tailwind(),
      postcssPresetEnv({
        stage: 2,
        features: {
          'nesting-rules': true
        },
        autoprefixer: { cascade: false }
      })
    ]))
    .pipe(gulpIf(!isDevelopment, gulpPurgeCss({
      content: ['www/core/elements/**/*.tpl', 'src/js/**/*.js', 'src/js/**/*.ts'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })))
    .pipe(gulpIf(!isDevelopment, postcss([postcssCsso({
      restructure: false,
      comments: false
    })])))
    .pipe(gulpIf(!isDevelopment, dest(cms.modx.css), dest(cms.modx.css, { sourcemaps: '.' })))
    .pipe(hash.manifest('www/assets/assets.json', {
      deleteOld: true,
      sourceDir: __dirname + '/www/assets/css'
    }))
    .pipe(dest('.'));
exports.css = css;

const cssProd = () =>
  src('src/css/style.css')
    .pipe(plumber())
    .pipe(rename('style.min.css'))
    .pipe(hash())
    .pipe(postcss([
      postcssImport({ path: ['src/css'] }),
      postcssNormalize({ forceImport: true }),
      tailwind(),
      postcssPresetEnv({
        stage: 2,
        features: {
          'nesting-rules': true
        },
        autoprefixer: { cascade: false }
      })
    ]))
    .pipe(gulpPurgeCss({
      content: ['www/core/elements/**/*.tpl', 'src/js/**/*.js', 'src/js/**/*.ts'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    }))
    .pipe(postcss([postcssCsso({
      restructure: false,
      comments: false
    })]))
    .pipe(dest(cms.modx.css))
    .pipe(hash.manifest('www/assets/assets.json', {
      deleteOld: true,
      sourceDir: __dirname + '/www/assets/css'
    }))
    .pipe(dest('.'));
exports.cssProd = cssProd;
/****************************************************************************************************/
// JS TASK WITH BABEL AND WEBPACK
/****************************************************************************************************/
const js = () =>
  src('src/js/main.js')
    .pipe(plumber())
    .pipe(gulpwebpack({
      mode: 'development',
      entry: './src/js/main.js',
      output: {
        filename: 'main.js',
      },
      plugins: [],
      module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
      },
      devtool: 'eval'
    }, webpack))
    .pipe(hash())
    .pipe(dest(cms.modx.js))
    .pipe(hash.manifest('www/assets/assets.json', {
      deleteOld: true,
      sourceDir: __dirname + '/www/assets/js'
    }))
    .pipe(dest('.'));
exports.js = js;

const jsProd = () =>
  src('src/js/main.js')
    .pipe(plumber())
    .pipe(gulpwebpack({
      mode: 'production',
      entry: './src/js/main.js',
      output: {
        filename: 'main.min.js',
      },
      plugins: [],
      module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
      },
      devtool: undefined
    }, webpack))
    .pipe(hash())
    .pipe(dest(cms.modx.js))
    .pipe(hash.manifest('www/assets/assets.json', {
      deleteOld: true,
      sourceDir: __dirname + '/www/assets/js'
    }))
    .pipe(dest('.'));
exports.jsProd = jsProd;
/****************************************************************************************************/
// LIBS TASK
/****************************************************************************************************/
const libs = () =>
  src(mainNpmFiles(), { base: './node_modules' })
    .pipe(flatten({ includeParents: 1 }))
    .pipe(newer(cms.modx.libs))
    .pipe(dest(cms.modx.libs));
exports.libs = libs;
/****************************************************************************************************/
// FONTS TASK
/****************************************************************************************************/
const fonts = () =>
  src('src/fonts/**/*.*')
    .pipe(newer(cms.modx.fonts))
    .pipe(dest(cms.modx.fonts));
exports.fonts = fonts;
/****************************************************************************************************/
// IMG TASK (JPG,PNG,GIF)
/****************************************************************************************************/
const img = () =>
  src(['src/img/**/*.*', 'src/images/**/*.*', '!src/img/icons/*.*'], { base: 'src' })
    .pipe(newer(cms.modx.img))
    .pipe(gulpIf(!isDevelopment, imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({ removeViewBox: false, collapseGroups: true })
    ])))
    .pipe(dest(cms.modx.img));
exports.img = img;
/****************************************************************************************************/
// WEBP FUNCTION
/****************************************************************************************************/
const makeWebp = file => src(file, { base: 'src' })
  .pipe(webp())
  .pipe(dest('src'));

/****************************************************************************************************/
// SVG SPRITE ICONS TASK
/****************************************************************************************************/
const config = {
  shape: {
    dimension: {
      maxWidth: 50,
      maxHeight: 50
    },
    spacing: {
      padding: 0,
      box: 'icon'
    },
    transform: [
      {
        svgo: {
          plugins: [
            { removeXMLNS: true },
            { cleanupListOfValues: true },
            { convertShapeToPath: false },
            { removeAttrs: { attrs: ['data-name', 'version'] } },
            { removeStyleElement: true },
            { removeScriptElement: true }
          ],
          floatPrecision: 1
        }
      }
    ]
  },
  svg: {
    xmlDeclaration: false,
    doctypeDeclaration: false,
    dimensionAttributes: false
  },
  mode: {
    stack: {
      dest: '.',
      sprite: 'img/sprite.svg',
      render: {
        css: {
          template: 'www/core/elements/chunks/utils/icon_template.tpl',
          dest: 'css/modules/sprite.css'
        }
      }
    }
  }
};
const svgicons = () =>
  src('src/img/icons/*.svg')
    .pipe(cached('svg:icons'))
    .pipe(remember('svg:icons'))
    .pipe(svgSprite(config))
    .pipe(dest('src'));
exports.svgicons = svgicons;
/****************************************************************************************************/
// COPY FAVICON
/****************************************************************************************************/
const faviconsGenerator = () =>
  src('src/img/favicons/favicon.png')
    .pipe(favicons({
      appName: 'My App',
      appShortName: 'App',
      appDescription: 'This is my application',
      background: '#020307',
      path: 'assets/img/favicons/',
      url: 'http://mysite.ru/',
      display: 'standalone',
      lang: 'ru-RU',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      version: 1.0,
      logging: false,
      html: 'index.html',
      pipeHTML: true,
      replace: true,
      icons: {
        coast: false,
        firefox: false,
        windows: false,
        yandex: false
      }
    }))
    .pipe(dest(cms.modx.favicon));
exports.faviconsGenerator = faviconsGenerator;
/****************************************************************************************************/
// WATCHERS
/****************************************************************************************************/
const watchers = cb => {
  watch('src/css/**/*.css', css);
  watch('src/js/**/*.{js,ts}', js);
  watch(['src/img/**/*.*', 'src/images/**/*.*', '!src/img/icons/*.*'], img)
    .on('add', (filepath) => {
      if (path.extname(filepath) === '.jpg' || path.extname(filepath) === '.png') {
        makeWebp(filepath);
      }
    })
    .on('change', (filepath) => {
      if (path.extname(filepath) === '.jpg' || path.extname(filepath) === '.png') {
        makeWebp(filepath);
      }
    })
    .on('unlink', filepath => {
      const filePathFromSrc = path.relative(path.resolve('src'), filepath);
      const destFilePath = path.resolve(cms.modx.img, filePathFromSrc);
      fs.unlinkSync(destFilePath);
    });
  watch('src/img/icons/*.svg', svgicons)
    .on('unlink', filepath => {
      remember.forget('svg:icons', path.resolve(filepath));
      delete cached.caches['svg:icons'][path.resolve(filepath)];
    });
  watch('src/fonts/**/*.*', fonts)
    .on('unlink', filepath => {
      const filePathFromSrc = path.relative(path.resolve('src/fonts'), filepath);
      const destFilePath = path.resolve(cms.modx.fonts, filePathFromSrc);
      fs.unlinkSync(destFilePath);
    });
  cb();
};

/****************************************************************************************************/
// GLOBAL TASKS
/****************************************************************************************************/
const build = series(svgicons, parallel(css, js, libs, fonts, img));
exports.build = build;
const dev = series(build, parallel(serve, watchers));
exports.dev = dev;

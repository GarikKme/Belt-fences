//variables
const {src, dest, parallel, series, watch} = require('gulp'),
		sass = require('gulp-sass'),
		notify = require('gulp-notify'),
		autoPrefixer = require('gulp-autoprefixer'),
		rename = require('gulp-rename'),
		cleanCSS = require('gulp-clean-css'),
		sourcemaps = require('gulp-sourcemaps'),
		browserSync = require('browser-sync').create(),
		fileinclude = require('gulp-file-include'),
		svgSprite = require('gulp-svg-sprite'),
		ttf2woff = require('gulp-ttf2woff'),
		ttf2woff2 = require('gulp-ttf2woff2'),
		fs = require('fs'),
		del = require('del'),
		uglify = require('gulp-uglify-es').default,
		concat = require('gulp-concat');

const fonts = () => {
	src('./src/fonts/**.ttf')
	.pipe(ttf2woff())
	.pipe(dest('./app/fonts'))
	return src('./src/fonts/**.ttf')
	.pipe(ttf2woff2())
	.pipe(dest('./app/fonts'))
}

const cb = () => {};

let srcFonts = './src/scss/_fonts.scss';
let appFonts = './app/fonts';

const fontsStyle = (done) => {
	let file_content = fs.readFileSync(srcFonts);

	fs.writeFile(srcFonts, '', cb);
	fs.readdir(appFonts, function (err, items) {
		if(items) {
			let c_fontname;
			for (let i = 0; i < items.length; i++) {
				let fontname = items[i].split('.');
				fontname = fontname[0];
				if(c_fontname != fontname) {
					fs.appendFile(srcFonts, '@include font-face("' + fontname + '", "' + fontname +'", 400);\r\n', cb);
				} 
				c_fontname = fontname;
			}
		}
	})

	done();
}

const svgSprites = () => {
	return src('./src/images/**.svg')
	.pipe(svgSprite({
		mode: {
			stack: {
				sprite: "../sprite.svg"
			}
		}
	}))
	.pipe(dest('./app/images'))
}

//styles libs

const stylesLibs = () => {
	return src([
		'node_modules/bootstrap/dist/css/bootstrap.min.css'
	])
		.pipe(concat('_libs.scss'))
		.pipe(dest('src/scss'))
		.pipe(browserSync.reload({stream: true}))
}
//sourcemap, rename, autoprefixer, cleanCSS, browsersync
const styles = () => {
	return src('./src/scss/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass.sync(
		{
			outputStyle: 'expanded'
		}
	).on('error', notify.onError()))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(autoPrefixer({
		cascade: false
	}))
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(sourcemaps.write('.'))
	.pipe(dest('./app/css'))
	.pipe(browserSync.stream());
}

const htmlinclude = () => {
	return src (['./src/index.html'])
	.pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
	 }))
	 .pipe(dest('./app'))
	 .pipe(browserSync.stream());
}

const imgToApp = () => {
	return src(['./src/images/**.jpg', './src/images/**.png', './src/images/**.jpeg','./src/images/**.svg'])
	.pipe(dest('./app/images'))
}

const resources = () => {
	return('./src/resources/**')
		.pipe(dest('./app'))
}
const clean = () => {
	return del('app/*')
}

//js
const scripts = () => {
	return src([
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/jquery-validation/dist/jquery.validate.min.js',
		'src/js/main.js'
	])

		.pipe(sourcemaps.init())
		.pipe(concat('main.js'))
		.pipe(uglify().on("error", notify.onError()))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./app/js'))
		.pipe(browserSync.stream());
}

//watching files
const watchFiles = () => {
	browserSync.init({
		server: {
			 baseDir: "./app"
		}
  });
//   watch('./src/scss/**/*.scss', stylesLibs);
  watch('./src/scss/**/*.scss', styles);
  watch('./src/index.html', htmlinclude);
  watch('./src/images/**/*.{jpg,png,gif,ico,webp,svg}', imgToApp);
  watch('./src/images/**.svg', svgSprites);
  watch('./src/resources/**', resources);
  watch('./src/fonts/**.ttf', fonts);
  watch('./src/fonts/**.ttf', fontsStyle);
  watch('./src/js/**/*.js', scripts);
}

exports.stylesLibs = stylesLibs;
exports.styles = styles;
exports.watchFiles = watchFiles;

exports.default = series(clean, parallel(htmlinclude, scripts, fonts, imgToApp, svgSprites),  fontsStyle, stylesLibs, styles, watchFiles);


const stylesBuild = () => {
	return src('./src/scss/**/*.scss')
		.pipe(sass.sync(
			{
				outputStyle: 'compressed'
			}
		).on('error', notify.onError()))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(autoPrefixer({
			cascade: false
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(dest('./app/css'))
}

const scriptsBuild = () => {
	return src([
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/jquery-validation/dist/jquery.validate.min.js',
		'src/js/main.js'
	])
		.pipe(concat('main.js'))
		.pipe(uglify().on("error", notify.onError()))
		.pipe(dest('./app/js'))
}
const phpBuild = () => {
	return src('./src/**.php')
		.pipe(dest('./app/'))
}

exports.build = series(clean, parallel(htmlinclude, scriptsBuild, fonts, phpBuild, imgToApp, svgSprites),  fontsStyle, stylesLibs, stylesBuild); 
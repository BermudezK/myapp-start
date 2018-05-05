// NOTE: Dependencies
const gulp = require ('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

// const cssnano = require('gulp-cssnano'); //es para minificar el css
// const imagemin = require('gulp-imagemin'); //comprime las imagenes
// const htmlmin = require('gulp-htmlmin'); //minimisa el html

// NOTE: TAREAS

// NOTE: compila los archivos .pug
gulp.task('pug',()=>{
	gulp.src('src/pug/*.pug')
		.pipe(pug({
			pretty:true
		}))
		.pipe(gulp.dest('dist'))
		// .pipe(htmlmin({collapseWhitespace:true})) //minimisa el html
		.pipe(browserSync.stream());
})

// NOTE: compila los archivos .scss y agrega los prefijos
gulp.task('sass',()=>{
	//esto nos permitira que se agreguen los prefijos neccesarios para que el codigo css sea compatible con las dos ultimas versiones de los navegadores
	gulp.src(['src/sass/*.sass','src/sass/*.scss'])
		.pipe(sass().on('error', sass.logError)) //.on() indica al plugin sass() que si encuentra un error al mmento de la compilacion nos lo muestre
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: true
		}))
		// .pipe(cssnano()) //nos permite coprimir el archivo css
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

// NOTE: nos permite comprimir las imagenes
// se ven resultados favorables cn imagenes de gran tamaño
// gulp.task('compressIMAGE', () =>
//     gulp.src(['src/img/*.jpg' , 'src/img/*.png' , 'src/img/*.gif' , 'src/img/*.svg'])
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/img'))
// );

// NOTE: nos permite pasar los codigos en js ecmascript6 en codigo js ecmascript5
gulp.task('javaScript', ()=>{
	gulp.src('src/js/*.js')
		.pipe(babel({
			presets: ['env']
		}))
		// .pipe(uglify()) //comprime los archivos javaScript
		.pipe(gulp.dest('dist/js'))
});

gulp.task('watch',()=>{
	gulp.watch('src/js/*.js',['javaScript']).on('change', browserSync.reload);
	gulp.watch('/src/pug/*.pug', ['pug']).on('change', browserSync.reload);
	gulp.watch(['src/sass/*.scss','src/sass/*.sass'], ['sass']).on('change', browserSync.reload);

});
// NOTE: recarga el navegador actualizando los cambios realizados [.css y html]
gulp.task('default',['sass','pug','javaScript','watch'],()=>{
	browserSync.init({
		server:'dist'
	});
	});

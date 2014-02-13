# gulp-xml2json

gulp plugin convert xml to json

## Install

Install with [npm](https://npmjs.org/package/gulp-xml2json)

```
npm install --save-dev gulp-xml2json
```


## Example

```js
var gulp = require('gulp');
var xml2json = require('gulp-xml2json');

gulp.task('default', function () {
	gulp.src('src/**/*.xml')
		.pipe(xml2json())
		.pipe(gulp.dest('dist'));
});
```


## API

### xml2json()


## License

MIT [@chilijung](http://github.com/chilijung)

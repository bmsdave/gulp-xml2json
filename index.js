'use strict';
var path = require('path');
var fs = require('graceful-fs');
var gutil = require('gulp-util');
var map = require('map-stream');
var filesize = require('filesize');
var tempWrite = require('temp-write');
var xml2js = require('xml2js');

module.exports = function (options) {
	return map(function (file, cb) {
		if (file.isNull()) {
			return cb(null, file);
		}

		if (file.isStream()) {
			return cb(new gutil.PluginError('gulp-xml2json', 'Streaming not supported'));
		}

		tempWrite(file.contents, path.extname(file.path), function (err, tempFile) {
			if (err) {
				return cb(new gutil.PluginError('gulp-xml2json', err));
			}

			fs.stat(tempFile, function (err, stats) {
				if (err) {
					return cb(new gutil.PluginError('gulp-xml2json', err));
				}

				options = options || {};

				fs.readFile(tempFile, { encoding : 'UTF-8'}, function(err, data) {
					if (err) {
						return cb(new gutil.PluginError('gulp-xml2json', err));
					}

					var parser = new xml2js.Parser(options);
					parser.parseString(data, function (err, result) {
						if(err) throw new Error(err);
						gutil.log('gulp-xml2json:', gutil.colors.green('ok ') + file.relative);
						file.contents = new Buffer(JSON.stringify(result));
						file.path = gutil.replaceExtension(file.path, '.json');
						cb(null, file);
					});

				});

			});
		});
	});
};

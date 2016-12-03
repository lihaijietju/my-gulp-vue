var through=require('through2');
var gutil=require('gulp-util');

var path=require('path');

var File = gutil.File;

var fileMapping = {};

module.exports = function (outputPath){
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }
        var filePath = file.path;
        var content = file.contents.toString();
        content = content.replace(/\n(\s+)?/ig, '').replace(/\"/g, '\\"');
        var baseName = path.basename(filePath, '.tpl.html');
        fileMapping[baseName] = content;
        cb();
    }, function(cb) {
        var num=0;
        var result = 'export default { \n';

        for (var name in fileMapping) {
            if(num!==0){
                result += ',\n';
            }
            result += '    "' + name + '": "' + fileMapping[name]+'"';
            num++;
        }
        result += '\n};';
        var joinedFile = new File({
            path: outputPath
        });

        joinedFile.contents = new Buffer(result);
        this.push(joinedFile);
        cb();
    });
}


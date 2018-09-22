/* import exteral npde modules */ 
const { exec } = require('child_process');
const   gulp   = require('gulp');
const    fs    = require('fs');
const   str    = require('../cli-helpers/str');
const   shell  = require('../cli-helpers/shell');
const recurse  = require('recursive-readdir');
const gulpJade = require('gulp-jade');
const   Jade   = require('jade');

class jade {
    static compile(file, callback) {

        
        let p = file.split('\\').reverse().slice(1).reverse().join('/')+'/';
        let f = file.split('\\').reverse().shift();
        return gulp.src(file)
            .pipe(gulpJade({
                jade: Jade,
                pretty: true
            }))
            .pipe(gulp.dest(p), callback(f, p));
    }
    
    static scan(dir) {
        recurse('./src/'+dir, (err, files) => {
            for(let i = 0; i < files.length; i++) {
                let ext = str.getExt(files[i]);
                
                if(ext == 'jade') {
                    jade.compile(files[i], (f, p) => {
                        console.log(f+' compiled and saved to '+p)
                    });
                }
            }
        });
    }
}

gulp.task('jade', () => {
    
    /* Itterate all extra input please */
    for(let i = 0; i < process.argv.length; i++) {
        
        
        let fn   = (process.argv[i]) ? process.argv[i].substring(2) : '';
        let argv = (process.argv[i+1] != undefined) ? process.argv[i+1] : '';
        let args = (argv.indexOf(':') != -1) ? argv.split(':') : argv;
        
        if (typeof jade[fn] == 'function')
            (typeof args == 'string') ? jade[fn](args) : jade[fn].apply(this, args);
    };
});
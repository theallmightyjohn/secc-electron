/* import exteral node modules */ 
const    fs    = require('fs');
const  readdir = require('recursive-readdir');
const   gulp   = require('gulp');

const GulpRunner = require('gulp-runner');
const   str      = require('../cli-helpers/str');

const  runner    = new GulpRunner('./gulpfile.js');

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

class observe {

    static all(...args) {
        
        observe.sass('scss');
        observe.jade('views');
    }

    static sass(...args) {


        readdir('./src/'+args[0], (err, files) => {
            if(err) throw err;
            for(let i = 0; i < files.length; i++) {
                gulp.watch(files[i], (e) => {

                    let path = e.path.replace(config.cmd.preprocessorTargetFilePrefix, '');
                    let file = e.path.split('\\').reverse().shift();

                    let opts = {
                        compile: path
                    }

                    runner.run('sass', opts, (err) => {
                        if(err) throw err;
                        console.log(file+' has been compiled and saved to dist/css/');
                    });
                });
            }
        });
        
    }

    static jade(...args) {
        readdir('./src/'+args[0], (err, files) => {
            if(err) throw err;
            for(let i = 0; i < files.length; i++) {
                let file = files[i].split('\\').reverse().shift();
                let ext = str.getExt(file);
                if(ext == 'jade') {
                    gulp.watch(files[i], (e) => {
                        console.log(e.path);
                        let path = e.path.replace(config.cmd.preprocessorTargetFilePrefix, '');
                        let file = e.path.split('\\').reverse().shift();
    
                        let opts = {
                            compile: path
                        }
    
                        runner.run('jade', opts, (err) => {
                            if(err) throw err;
                            console.log(file+' has been compiled!');
                        });
                    });
                }
            }
        });
    }
}

gulp.task('observe', () => {
    
    /* Itterate all extra input please */
    for(let i = 0; i < process.argv.length; i++) {
        
        
        let fn   = (process.argv[i]) ? process.argv[i].substring(2) : '';
        let argv = (process.argv[i+1] != undefined) ? process.argv[i+1] : '';
        let args = (argv.indexOf(':') != -1) ? argv.split(':') : argv;
        
        if (typeof observe[fn] == 'function')
            (typeof args == 'string') ? observe[fn](args) : observe[fn].apply(this, args);
    };
});
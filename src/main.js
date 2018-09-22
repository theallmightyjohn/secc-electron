/****************************/
/* import vendors (unnamed) */
/****************************/
import 'bootstrap';

/****************************/
/*  import vendors (named)  */
/****************************/
import $ from 'jquery';
import fs from 'fs';

/*******************/
/*  import models  */
/*******************/
import jace from './models/filters/JACE';

// execute jQueryAnimateCssExtender
jace($);

// register singletons for 
// dependency injection
const dependancies = {
  
};

//*************************/
/*  import controllers   */
/*************************/

fs.readdir('./src/controllers', (err, files) => {
    if(err) throw err;

    for(let i = 0; i < files.length; i++) {
        
        let file = files[i].split('.');
        let filename = file[0];
        
        const controller = require('./controllers/'+filename);
        controller = new controller.default.prototype.constructor();
    }
});
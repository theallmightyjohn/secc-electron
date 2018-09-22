import handlebars from 'handlebars';
import layouts from 'handlebars-layouts';
import fs from 'fs';
import $ from 'jquery';
export default class template {
	constructor() {
		handlebars.registerHelper(layouts(handlebars));
		this.partials = [];
		this.main = '';
	}
	
	registerPartials(callback) {
		
		for(let i = 0; i < this.partials.length; i++)	{
			
			handlebars.registerPartial(this.partials[i].name, this.partials[i].file);
		}
		if(callback != undefined || callback != null) callback();
	}
	
	addPartial(name, path, callback) {
		fs.readFile('src/views/partials/'+path+'.html', 'utf8', (err, data) => {
			if(err) throw err;
			this.partials.push(
				{
					name: name,
					file: data
				}
			);
			if(callback != undefined || callback != null) callback();
		});
	}
	
	registerMain(path) {
		fs.readFile('src/views/'+path+'.html', 'utf8', (err, data) => {
			if(err) throw err;
			this.main = data
		});
	}
	
	compile(element) {

		let temp = handlebars.compile(this.main);
		$('#'+element).append(temp());
	}
}
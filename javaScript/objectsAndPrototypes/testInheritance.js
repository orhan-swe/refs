'use strict';

/////////////////////////////////////////////////////

//object literals:

var cat1 = {name: "Fluffy"};
cat1.age = 3;
cat1.speak = function() {
	l("mowe");
};

//same can be done like this:
var cat2 = {
	name: "Fluffy", 
	speak: function(){l("mouw")}
};

//l(cat2);

/////////////////////////////////////////////////////

//objects with constructor functions and a 
//new keyword

function Cat3(name) {
	this.name = name;
}  //NOTE: no semicolon here!!!
var cat3 = new Cat3();
//l(cat3);



//////////////////////////////////////////////////////
//this is what is happening behind the sceen when 
//creating an object:

var cat4 = Object.create(Object.prototype, {
	name: { 
		value: "Fluffy",
		enumerable: true,
		writable: true,
		configurable: true
		}
	});
//l(cat4);

/////////////////////////////////////////////////////

//using class keyword from ES6, same would be done like this:

class Cat5 {
	constructor(name) {
		this.name = name;
	}
	speak() {
		l("meeoow - cat 5");
	}
}
var cat5 = new Cat5("Fluffy");
l(cat5);
cat5.speak();
function l(o) {
	console.log(o);
}

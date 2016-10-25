'use strict'

///////////////////Array prototype//////////////////////////
var p1 = false;
var cat = {
    name: "Fluffy",
    color: "White",
}


var arr = [1,2];
//same:
var arr = new Array(1,2);
l(Array.prototype, p1);  //prints: "[]"
l(arr.__proto__, p1);   //prints: "[];

//Object.defineProperty(Array.prototype, 'last', {
//    get: function() {
//        return this[this.length-1];
//    }
//});
//l(array.last, p1);

//the same can be done like this also
Array.prototype.last = function (){
        return this[this.length-1];
    }
//now all the arrays will have a "function" last instead:
l(arr.last(), p1);
l(Array.prototype, p1);  //[ last: [ Function ] ]
l(arr.__proto__, p1);  //[ last: [ Function ] ]



////////////////function VS object prototype//////////////////////
var p2 = false;
//function has a prototype property:
var myFunc = function() {}
function myFunc2 () {}
l(myFunc.prototype, p2); //prints: {}
l(myFunc2.prototype, p2); //prints: myFunc2 {}

var f = new myFunc();
if(f.__proto__ === myFunc.prototype)
    l("yes f.__proto__ === myFunc.prototype will give true!!", p2);
    
myFunc.prototype.age = 5;
// and now f also has age prop:
l("f.age: " + f.age, p2)

myFunc2.prototype.age = 4;
//object does not have prototype property, but only __proto__
var cat2 = {name: 'Fluffy'};
l(cat2.prototype, p2); //will log undefined
//but they do have __proto___ property:
cat2.__proto__.wow = 5;

//now all objects ever created will have wow in there __proto__
var cat3 = {name: 'Fluffy3'};
l(Object.keys(cat2.__proto__), p2); //prints [ "wow" ]
l(Object.keys(cat3.__proto__), p2);//prints [ "wow" ]

l(cat2.__proto__.toString, p2); //will log [ Function: toString ]

//A functions prototype is the object instance that will become
//the prototype for all objects created using this function
//as a constructor
//
//An objects prototype is the object instace from which the
//object is inherited

////////////////Inheritance/////////////////////////////
var p3 = true;
function Animal(voice) {
    this.voice = voice || 'grunt';
};
//we can add stuff to the Animal.prototype....

function cat4(name) {
    Animal.call(this, "Meow");
    this.name = name;
};
cat3.prototype = Object.create(Animal.prototype);
cat3.prototype.constructor = cat4;
var c1 = new cat4("flufy");

//and now class ES6:
class Animal2 {
    constructor(voice) {
        this.voice = voice;
    }
    //here we can add functions to prototype but
    //they will not be enumerable in other words they 
    //will be invisible when iterating prototype keys
}
class cat5 extends Animal2 {
    constructor(name) {
        super("Meow");
        this.name = name;
        this.speak = function() {
            l("What!!", p3);
        }
    };
};
var c2 = new cat5("mufy");

l(c2.speak(), p3);
/////////////////////////////////////////////////
function l(o, doPrint) {
    if(doPrint === true)
        console.log(o);
    if(doPrint == null)
        console.log("ERROR: doPrint is null for: " + o);
}

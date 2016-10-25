'use strict'

var p1 = false;
var cat = {
    name: "Fluffy",
    color: "White",
}
//these two give same result
l(cat.name, p1);
l(cat["name"], p1);
//the second one is usefull when having object whit propertie
//that is not a valid identifier:
cat["eye color"] = "Green";
l(cat["eye color"], p1);

//we can get all propertie values for a propertie
//with propertie descriptior (writable, enumerable, configurable)
l(Object.getOwnPropertyDescriptor(cat, 'name'), p1);


/////////////Writable attribute///////////////////////
//lets change one of them:
Object.defineProperty(cat, 'name', {writable: false});
//now at least in strict mode you can not change the 
//name propertie but you can change the object it is pointing to
//if it is an object that is, but if you wan to prevent changes
//to the object it is pointing to you do:
Object.freeze(cat.name);



//////////////Enumerable prop/////////////////////////////////////////
var p2 = false;

var cat2 = {
    name: "Fluffy",
    color: "White",
}

//here we will loop over all the cat2 properties
l("prop: value ************", p2);
for(var prop in cat2) {
    l(prop + ': ' + cat2[prop], p2);
}
//but if we do this:
Object.defineProperty(cat2, 'name', {enumerable: false});
// now your for loop above would not show name propertie
//and it will not show in object keys ether:
l("Object keys will give as an array with enumerable props: ", p2);
l(Object.keys(cat2), p2);
l("also json serialization will not work on these props:", p2);
l(JSON.stringify(cat2), p2);


//////////////Configurable prop/////////////////////////////////////////

Object.defineProperty(cat2, 'name', {configurable: false});
//now 1. you can not change the enumerable attribute
// 2. you can not change the configurable attribute anymore
// 3. you can not delete property


//////////////using getters and setters/////////////////////////////////
//getters and setters are attributes on a property that 
//allow you to specify return and set value of a property using a 
//function but you access the prop just like any other:
var p3 = true;
var cat3 = {
    name: {first: "Flyffy", last: "TheCat"},
    color: "White",
};
//now if we wnat to have full name of the cat this is what we do:
Object.defineProperty(cat3, 'fullName', {
    get: function() {
        return this.name.first + ' ' + this.name.last;
    },
    set: function(value) {
        var nameParts = value.split(" ");
        this.name.first = nameParts[0];
        this.name.last = nameParts[1];
    }
});
//now we can get fullname like this, as if it was a prop:
l(cat3.fullName, p3);
//and we can set the fullname like this, as if it was a prop:
cat3.fullName = "Fufen Tio";
l(cat3.fullName, p3);




/////////////////////////////////////////////////
function l(o, doPrint) {
    if(doPrint === true)
        console.log(o);
    if(doPrint == null)
        console.log("ERROR: doPrint is null for: " + o);
}

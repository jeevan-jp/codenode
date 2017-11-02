var rect = require('./rectangle');

function showRect(l,b) {
    if(l<=0 || b<=0) {
        console.log("Wrong dimensions.");
    }
    else {
        console.log("the area of rectangle is: "+rect.area(l,b));
        console.log("perimeter of rectangle is: "+rect.perimeter(l,b));
    }
}

showRect(3,4);
showRect(0,2);
showRect(-5,4);
var fs = require('fs');

var numberOfValidPasswords = 0;

const files = async function() {
    var data;
try {  
    data = await fs.readFileSync('input.txt', 'utf8');
   // console.log(data.toString());    
} catch(e) {
    console.log('Error:', e.stack);
}

return data.toString();
}

const inputArray = files().then(res => res.split('\n'))

const fitRequirements = function (passToCheck, min, max, letter) {
    try {
        var timesMatch = passToCheck.match(new RegExp(letter, 'gm')).length
        // console.log(timesMatch)
        if (timesMatch >= min && timesMatch <= max ) return true; else return false;
        
    } catch (error) {
        return false;
    }
    
}

const run = async function() { 

    var rawData = await inputArray;

    (async function() {
     for await (password of rawData){
        var myRe = /([0-9]*)-([0-9]*) ([a-z]): ([a-z]*)/;
        var min = password.match(myRe)[1]
        var max = password.match(myRe)[2]
        var letter = password.match(myRe)[3]
        var passToCheck = password.match(myRe)[4]

        console.log("min is " + min + " and max is " + max + " letra " + letter + " passtocheck " + passToCheck + " " + fitRequirements(passToCheck,min,max,letter))
        
        if (await fitRequirements(passToCheck,min,max,letter)) {
            numberOfValidPasswords += 1;
        }
    }
    console.log("number of valid passwords: " + numberOfValidPasswords)
    })();
}

run();
 
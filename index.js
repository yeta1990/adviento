
var fs = require('fs');

var trees = 0;

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

const inputArray = files().then(res => res.split('\r\n'))

const createFullMap = async function(){
    
    const partialMap = await inputArray;
    const widthPartialMap = partialMap[0].length;
    const heigth = partialMap.length;
    const desirableWidth = heigth * 3;
    const timesToExtendPartialMap = Math.ceil(desirableWidth/widthPartialMap);

    const fullMap = partialMap.map( line => {
        var newLine = '';
        for (i=0; i<timesToExtendPartialMap; i++){
            newLine += line
        }
        return newLine
    })
    return fullMap;
}


createFullMap().then(fullMap => {
    var positionX = 0;
    fullMap.forEach(longLine => {
        if (longLine.charAt(positionX) == '#') {
            trees += 1;
          
        }
        positionX += 3
       
    })
    console.log(trees + ' árboles')
 
})




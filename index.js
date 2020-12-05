
var fs = require('fs');



const slopes = 
[
    {right: 1, down: 1},
    {right: 3, down: 1},
    {right: 5, down: 1},
    {right: 7, down: 1},
    {right: 1, down: 2}
]    

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
    const desirableWidth = heigth * 7;
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

const calculateTrees = async function(right, down) {

    const fullMap = await createFullMap();
    var positionX = 0;
    var trees = 0;
    
    for (i=0;i<fullMap.length; i += down) {
        if (fullMap[i].charAt(positionX) == '#') {
            trees += 1;
         }
        positionX += right

    }

    console.log(trees + ' árboles')
    return trees;

}

const getProductOfTrees = async function (slopes) {
    var product = 0;
    for (const slope of slopes ) {
        const calculatedTrees = await calculateTrees(slope.right, slope.down);
        if (product === 0) {
            product = calculatedTrees;
        }else{
            product *= calculatedTrees;
        }
        
    }
    console.log('producto es ' + product)
   
}

getProductOfTrees(slopes);


console.time("time")
var fs = require('fs');

const files = async function() {
    var data;
try {  
    data = await fs.readFileSync('input.txt', 'utf8');
} catch(e) {
    console.log('Error:', e.stack);
}
return data.toString().split('\n');
}

var oneJolt = 0;
var threeJolts = 1;


const order = function(adapters) {
  return adapters.sort(function(a, b) {
    return a - b;
  });
  
}

const calculate = function(orderedAdapters){
  var lastAdapter = 0;
  orderedAdapters.forEach(adapter => {
    switch (adapter - lastAdapter)  {
      case 1:
        lastAdapter = adapter;
        oneJolt++;
        break;
      case 3:
        lastAdapter = adapter;
        threeJolts++;
        break;
      default:
        break;
    }
  
  });

}

const run = files().then(adapters => order(adapters)).then(orderedAdapters => calculate(orderedAdapters)).then(a => console.log('result: ' + oneJolt*threeJolts))

var fs = require('fs');

const files = async function() {
    var data;
try {  
    data = await fs.readFileSync('input.txt', 'utf8');
} catch(e) {
    console.log('Error:', e.stack);
}

return data.toString();
}

var binary = require('binary-to-decimal')

// equivalencias
// f=0
//b=1
//r=1
//l=0

const inputArray = files()
.then(res => res.split('\n'))
.then(codified=> codified.map(seat=> {
  var row = binary.decimal(seat
    .substring(0,7)
    .replace(/F/g,0)
    .replace(/B/g,1).toString());
  var column = binary.decimal(seat
    .substring(7,10)
    .replace(/R/g,1)
    .replace(/L/g,0).toString());
  return (row*8 + column)
}))
.then(p=>console.log(Math.max(...p) + ' es el mayor SeatID'))

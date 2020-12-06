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

const getAllSeats = function (){
  var allSeats = []
    for (i=10; i<115; i++){
      int = i;
      for (j=0; j<8; j++){
        dec = j;
        allSeats.push(Number(i+'.'+j))
      }
    }
   
    return allSeats.sort((a, b) => a - b);
}

const getAllPassengers = files()
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
  return Number(row+'.'+column)
 
}).sort((a, b) => a - b))

const searchSeats = async function(){

  const seats = getAllSeats();
  const passengers = await getAllPassengers;

  for(i=0;i<seats.length;i++){
    if (seats[i] != passengers[i]) {
        console.log(seats[i] + " es tu asiento");
        var col = parseInt((seats[i] - Math.floor(seats[i]))*10)
        const seatId = (Math.floor(seats[i])*8 + col)
        return console.log(seatId + ' es tu seatId')
        }
  }
}

searchSeats();
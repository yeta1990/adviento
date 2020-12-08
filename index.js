
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


const run = files()
.then(res => res.map(i => {

  var instruction = [];
  instruction.push(i.substr(0,3))
  instruction.push(parseInt(i.substr(4,i.length)))
  return instruction;
}))
.then(instructions => {
  console.log(instructions)
  var position = 0;
  var alreadyUsed = new Set();
  var points = 0;
  function interpreter(position) {
    if (alreadyUsed.has(position)) return points;
    if (instructions[position][0] == "nop"){
      //points += instructions[position][1]
      alreadyUsed.add(position)
      return interpreter(position+1)
    }else if (instructions[position][0] == "acc"){
      points += instructions[position][1]
      alreadyUsed.add(position)
      return interpreter(position+1)
    }
    else{
      alreadyUsed.add(position)
      return interpreter(position+instructions[position][1])
    }
  }
  interpreter(position)
  return points;
})
.then(p=> console.log("acumulador :" + p))




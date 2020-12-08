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
.then(ins => {

  var instructions = [...ins]
 
  var position = 0;
  var alreadyUsed = new Set();
  var points = 0;

  function interpreter() {
   
    if (alreadyUsed.has(position)) return false;

    if (position == (instructions.length -1 )) { 
      if (instructions[position][0] == "acc") points += instructions[position][1];
      return true;
    }
    if (instructions[position][0] == "nop"){
      alreadyUsed.add(position)
      position++
      return interpreter(position)

    }else if (instructions[position][0] == "acc"){
      points += instructions[position][1]
      alreadyUsed.add(position)
      position++
      return interpreter(position)
    }else{

      alreadyUsed.add(position)
      position += instructions[position][1]
      return interpreter(position)
    }
  }

  for (i=0; i<instructions.length; i++){
    
    if (instructions[i][0] == "nop" && instructions[i][1] != 0 ){

      instructions[i][0] = "jmp"
      position = 0;
      points = 0;
      alreadyUsed = new Set();

      try {
        if(interpreter() == true) return points;
        instructions[i][0] = "nop"
      } catch (error) {
        
      } 
      
    }

    if (instructions[i][0] == "jmp"){
      instructions[i][0] = "nop"
      position = 0;
      points = 0;
      alreadyUsed = new Set();
      try {
        if(interpreter() == true) return points;
        instructions[i][0] = "jmp"
      } catch (error) {
       
      } 
    
    }

  }

  return points;
})
.then(p=> console.log("acumulador :" + p))




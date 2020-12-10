
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

const calc = function(xmas) {

  const exp = xmas.map(ex => parseInt(ex));
  
  var invalid = 0;
  //dance:
  for (i=0; i<exp.length; i++){

    const subset = exp.slice(i, i+26)
    var found = false;

    for (j=0; j<25;j++){

      for (h=0; h<25;h++){
        if (subset[j] + subset[h] == subset[25]) {
          
          found = true
          break //dance;
        };
      }

    }
    if (!found) {console.log('9.1: ' + subset[25]); invalid = subset[25]; break; };
  }
  
  console.timeEnd("time")
  return {invalid, exp};
}

const findContiguous = function(exp, invalid){
  console.time("time 2")

  dance:
  for(i=0; i<exp.length;i++) {
    
    var found = false;
    
      for (h=0; h<25;h++){
       
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        
        try {
          if (exp.slice(i, (i+h+1)).reduce(reducer) == invalid){
            found = true;
            var combination = [...exp.slice(i, (i+h+1))];
         
            console.log('9.2: ' + (Math.min(...combination) + Math.max(...combination)));
            if (found) break dance;
            
          }
        } catch (error) {
          
        }
         
      }
    
     
  }
  console.timeEnd("time 2")
}


const run = files().then(xmas => calc(xmas)).then(p => findContiguous(p.exp, p.invalid))

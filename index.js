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
  for (i=0; i<exp.length; i++){

    const subset = exp.slice(i, i+26)
    var found = false;

    for (j=0; j<25;j++){

      for (h=0; h<25;h++){
        if (subset[j] + subset[h] == subset[25]) {
          
          found = true
          
        };
      }


    }

    if (!found) {console.log('falla el número ' + subset[25] + ' en posición ' + (25)); invalid = subset[25]; break;};

  }
  return {invalid, exp};
}

const findContiguous = function(exp, invalid){
  

  for (i=0; i<exp.length; i++){

    const subset = exp.slice(i, i+25)
    var found = false;

    for (j=0; j<25;j++){
      if (found) break;
      
      for (h=0; h<25;h++){
        if (found) break;
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
        
          try {
            if (subset.slice(j, h+1).reduce(reducer) == invalid){
              found = true;
              var combination = [...subset.slice(j, h+1)];
           
              console.log('encontrado ' + (Math.min(...combination) + Math.max(...combination)));
              
            }
          } catch (error) {
            
          } 


      }
      
    }
    if (found) break;
  }
}


const run = files().then(xmas => calc(xmas)).then(p => findContiguous(p.exp, p.invalid))

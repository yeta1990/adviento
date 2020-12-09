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
  
  
  for (i=0; i<exp.length; i++){

    const subset = exp.slice(i, i+26)
    var found = false;

    for (j=0; j<25;j++){

      for (h=0; h<25;h++){
        if (subset[j] + subset[h] == subset[25]) {
          
          found = true
          console.log(subset[25])
        };
      }


    }

    // solución que no me ha funcionado :(
    /*subset.map(line => 
      {
        
        subset.map(f=> {
        console.log(f + ' + ' + line + ' = ' + (f+line) + ' vs ' + exp[i+26])
        if (((f+line) == exp[i+26]) ){
          found = true
        console.log('encontrada suma ' + f + ' + ' + line +  ' ' + exp[i+26] + ' en posición ' + (i+26) )
        
      }}
    )}
    )*/

    if (!found) {console.log('falla el número ' + subset[25] + ' en posición ' + (25)); break;};

  }

}

const run = files().then(xmas => calc(xmas)
)

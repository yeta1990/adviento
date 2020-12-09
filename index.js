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

const calc = function(expenses) {

  const exp = expenses.map(ex => parseInt(ex));
  console.log(exp)
  exp.map(line => exp.map(f=> {

    if ((f+line) == 2020){
      console.log(f*line)
      
    }}
  ))
}

const run = files().then(expenses => calc(expenses)
)

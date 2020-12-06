var fs = require('fs');

var counts = 0;

const files = async function() {
    var data;
try {  
    data = await fs.readFileSync('input.txt', 'utf8');
} catch(e) {
    console.log('Error:', e.stack);
}



return data.toString();
}


const getUniqueAnswers = function(str){
  var setOfAnswers = new Set();
  for (letter of str) {
    setOfAnswers.add(letter);
  }
  return setOfAnswers;
} 

const countValues = function(grSet){
  var values = getUniqueAnswers(grSet)
  counts += values.size;
  console.log(values)
  console.log('size ' + values.size)
  return true;

}

const run = files()
.then(res => res
  .split('\r\n\r\n')
  .map(group=>countValues(group.replace(/\r\n|\n|\r/gm,''))
  ))

.then(p=>console.log(counts + ' nº of counts'))



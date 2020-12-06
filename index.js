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

const inputData = files()

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

const getAllPassengers = files()
.then(res => res
  .split('\r\n\r\n')
  .map(group=>countValues(group.replace(/\r\n|\n|\r/gm,''))
  ))

.then(p=>console.log(counts + ' nº of counts'))



/*  

function getAnswersByGroup(input) {
  return input.split('\r\n\r\n');
}

function getUniqueAnswersByGroup(groups) {
  return groups.map(group => {
    group = group.replace(/\n|\r/g, "");
    return [...new Set(group)]
  });
}

function getSumOfUniqueAnswerCountByGroup(groups) {
  return groups.reduce((acc, group) => {
    return acc += group.length
  }, 0);
}

async function solve(input) {
  
  const groups = getAnswersByGroup(input);
  const uniqueAnswersByGroup = getUniqueAnswersByGroup(groups)
 
  return console.log(getSumOfUniqueAnswerCountByGroup(uniqueAnswersByGroup));
}

const getResult = files().then(r=> solve(r))


*/
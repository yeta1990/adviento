var fs = require('fs');

var counts = 0;

const files = async function() {
    var data;
  try {  
      data = await fs.readFileSync('input4.txt', 'utf8');
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
  var uniqueValues = getUniqueAnswers(grSet.replace(/\r\n|\n|\r/gm,''))
  var uniqueValIterable = [...uniqueValues];
  var groupAnswers = grSet.split('\n');
  console.log(uniqueValIterable)
  console.log(groupAnswers)


  for (const letter of uniqueValIterable){

    var coincidences = 0;
    groupAnswers.map(personAnswers => {

      if (personAnswers.includes(letter)) {
        coincidences +=1;
        
        }
      })
    
    if (coincidences == groupAnswers.length) {
     
      counts +=1
      continue;
    
    };

  }

 
  return true;

}

const run = files()
.then(res => res
  .split('\n\n')
  .map(rawGroups=> countValues(rawGroups))
  //.map(group=>countValues(group.replace(/\r\n|\n|\r/gm,''))
  )

.then(p=>console.log(counts))




var fs = require('fs');
const { get } = require('http');


const files = async function() {
    var data;
try {  
    data = await fs.readFileSync('input.txt', 'utf8');
} catch(e) {
    console.log('Error:', e.stack);
}

return data.toString();
}

const createMainBags = function (input) {

  var allBags = []
  input.map(line=> {
  
    var key = line.match(/\w*\s\w*/)[0]
    var mainBag = {bag: key, contains: []}
    var re = /\d\s(\w*\s\w*)?/gm;

    try {

      var match; 

      while ((match = re.exec(line)) !== null) {
       
        mainBag.contains.push(match[1])
      }
      
      console.log(mainBag)
    } catch (error) {
      
    }
   
    console.log(key)
    allBags.push(mainBag)
    
  })

  return allBags;
}

var results = new Set();

const searchContainers = function(bags, objective){
  
  const allbags = bags;
  console.log('buscando '+ objective)
  allbags.forEach(element => {
    if(element.contains.includes(objective)){
      results.add(element.bag);
      return searchContainers(allbags, element.bag)
    }
  });

}

const run = files()
.then(res => createMainBags(res.split('\n')))
.then(mainBags => searchContainers(mainBags, 'shiny gold'))
.then(p=>console.log('shiny gold puede ir en un total de  ' + results.size + ' bags distintos'))



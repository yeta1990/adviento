
var fs = require('fs');


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
    var re = /(\d)\s(\w*\s\w*)?/gm;

    try {

      var match; 

      while ((match = re.exec(line)) !== null) {
      
        mainBag.contains.push({bag: match[2], stock: parseInt(match[1])})
      
      }
      
      
    } catch (error) {
      
    }
   
    allBags.push(mainBag)
    
  })

  return allBags;
}

var results = 0;

const searchContainers = function(bags, objective, stock){
  
  const allbags = bags;
 
  allbags.forEach(element => {
    if(element.bag == objective){
      
      try {
        element.contains.forEach(singleBag => {
          var toSum = singleBag.stock*stock;
          if (toSum != 0){
            results += toSum;
          } else {
            toSum = singleBag.stock;
            results += singleBag.stock;
          }         
          searchContainers(allbags, singleBag.bag, toSum)
        })
       
      } catch (error) {
        
      }
    
      return ;
    }
  });

}

const run = files()
.then(res => createMainBags(res.split('\n')))
.then(mainBags => searchContainers(mainBags, 'shiny gold', 0))
.then(p=>console.log('shiny gold puede contener en un total de  ' + results + ' bags distintos'))



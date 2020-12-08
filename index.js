
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
        //mainBag.stock += parseInt(match[1])
      }
      
       //console.log(mainBag)
    } catch (error) {
      
    }
   
    // console.log(key)
    allBags.push(mainBag)
    
  })

  return allBags;
}

var results = 0;

const searchContainers = function(bags, objective, stock){
  
  const allbags = bags;
  //console.log('buscando '+ objective)
  allbags.forEach(element => {
    if(element.bag == objective){
      console.log(element)
      try {
        var multiply;
        

        element.contains.forEach(singleBag => {
          console.log('buscando ' + singleBag.stock + ' ' + singleBag.bag )
          //console.log(stock)
          //console.log(singleBag.stock*stock)
          

          var toSum = singleBag.stock*stock;
          console.log(toSum)
          
          if (toSum != 0){
            console.log('sumo ' + singleBag.stock + '*' + stock)
            results += toSum;
          } else {
            console.log('sumo ' + singleBag.stock)
            toSum = singleBag.stock;
            results += singleBag.stock;
          }
         
          searchContainers(allbags, singleBag.bag, toSum)
          
        })
        
        //return searchContainers(allbags, element.bag)
      } catch (error) {
        //console.error(error)
      }
    
      return ;
    }
  });

}

const run = files()
.then(res => createMainBags(res.split('\n')))
.then(mainBags => searchContainers(mainBags, 'shiny gold', 0))
.then(p=>console.log('shiny gold puede ir en un total de  ' + results + ' bags distintos'))



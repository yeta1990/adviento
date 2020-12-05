
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

var valid = 0;

const inputArray = files()
.then(res => res.split('\r\n\r\n'))
// después de resolverlo me he dado cuenta de que este paso sobraba
// .then(r => r.map(x=> x.replace(/\r\n/gm,' ')))
.then(l => l.map(line => line.match(/([a-z]{3}):/gm) ))
.then(keys => {
    for (var key of keys) {
        if ((key.length === 8 ) || (key.length === 7 && !key.includes('cid:'))) valid++ 
    }
    return valid
})
.then(p=>console.log(p + ' valid passports'))



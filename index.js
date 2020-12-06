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

const parsers = {
    byr: /byr:(19[2-9][0-9])|(200[0-2])\b/,
    iyr: /iyr:(201[0-9])|(2020)\b/,
    eyr: /eyr:(202[0-9])|(2030)\b/,
    hgt: /hgt:(1[5-8][0-9]cm)|(19[0-3]cm)|(59in)|(6[0-9]in)|(7[0-6]in)\b/,
    hcl: /hcl:#(([0-9a-f]){6})\b/,
    ecl: /ecl:(amb|blu|brn|gry|grn|hzl|oth)\b/,
    pid: /pid:([0-9]{9})\b/
}

const inputArray = files()
.then(res => res.split('\r\n\r\n'))

.then(l => l.map(line => {
    var pass = {}
    
    try {
    
        for (const key of Object.keys(parsers)){
            pass[key] = line.match(parsers[key])[1]
            
        }

    valid +=1;
    return pass;
       
    } catch (error) {
        console.log(line)
        
       
        return null;
    }

    
}).filter(w => w != null))
.then(p=>console.log(p.length + ' valid passports ' + valid))



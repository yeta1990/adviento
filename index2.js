const fs = require('fs')

fs.readFile('./input.txt',(err, data)=>{
    if(err) throw err;
    let new_array = []
    let valid_passports = 0;
    let passports = data.toString()
    passports = passports.split(/\n\n/g);

    for(i in passports){
        let replace_new_line = passports[i].replace(/\n/g," ")
        new_array.push(replace_new_line)
    }

    for(key in new_array){
        let passport_elems = new_array[key].split(' ').sort();
        counter = 0;

        for(j in passport_elems){
            if(passport_elems.length >= 7 && passport_elems[j].substring(0,3) != 'cid'){
                let passport_code = passport_elems[j].substring(0,3);
                switch (passport_code) {

                    // byr (Birth Year) - four digits; at least 1920 and at most 2002.
                    case 'byr':
                        const birth_year = (passport_elems[j].substring(4,8));
                        const year_reg = /^(19)[2-9]\d{1}$|^(200)[0-2]$/g

                        if(birth_year.match(year_reg)){
                            counter += 1;
                        }
                        break;

                    // byr (Birth Year) - four digits; at least 1920 and at most 2002.
                    case 'iyr':
                        const issue_year = passport_elems[j].substring(4,8);
                        const issue_reg = /^(201)\d{1}$|^(2020)$/g

                        if(issue_year.match(issue_reg)){
                            counter += 1;
                        }
                        break;

                    // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
                    case 'eyr':
                        const exp_year = passport_elems[j].substring(4,8);
                        const exp_reg = /^(2019)$|^(202)[0-9]$|^(2030)$/g

                        if(exp_year.match(exp_reg)){
                            counter += 1;
                        }
                        break;

                    // hgt (Height) - a number followed by either cm or in:
                    //// If cm, the number must be at least 150 and at most 193.
                    //// If in, the number must be at least 59 and at most 76.
                    case 'hgt':
                        const height = passport_elems[j].substring(4,passport_elems[j].length);
                        const heightReg = /^(5[9](in))|^(6[0-9](in))|^(7[0-6](in))|^(15[0-9](cm))|^(16[0-9](cm))|^(17[0-9](cm))|^(18[0-9](cm))|^(19[0-3](cm))/g

                        if(height.match(heightReg)){
                            counter += 1;
                        }
                        break;

                    // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
                    case 'hcl':
                        const hair_color = passport_elems[j].substring(4,passport_elems[j].length);
                        const hair_reg = /^[#]+[a-f0-9]{6}$/g

                        if(hair_color.match(hair_reg)){
                            counter += 1;
                        }
                        break;

                    // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
                    case 'ecl':
                        const eye_color = passport_elems[j].substring(4,passport_elems[j].length);
                        const eye_Reg = /(amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)/g;

                        if(eye_color.match(eye_Reg)){
                            counter += 1;
                        }
                        break;

                    // pid (Passport ID) - a nine-digit number, including leading zeroes.
                    case 'pid':
                        const passport_id = passport_elems[j].substring(4,passport_elems[j].length);
                        const passport_reg = /^[0-9]{9}$/g

                        if(passport_id.match(passport_reg)){
                            counter += 1;
                        }
                        break;

                    default:
                        break;
                }
            }
        }

        if(counter >= 7){
            valid_passports += 1;
        }

    }
    console.log(`Number of valid passports: ${valid_passports}`)});
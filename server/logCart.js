const fs = require('fs');
const moment=require('moment');

const logCart = (type,obj) => {
    let t = moment().format('MMMM Do YYYY, h:mm:ss a');
    const operation = [{
        time: t,
        action: type,
        object: obj
    }];

    let str =JSON.stringify(operation)+"\n";
   
    fs.appendFile('server/db/stats.json', str, 'utf8', (err) => {
        if (err) throw err;
        console.log('Данные были добавлены в конец файла!');
      });
}

module.exports = logCart;
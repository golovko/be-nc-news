const fs = require('fs/promises');
const filePath = `${__dirname}/../endpoints.json`;

exports.fetchEndpoints = () => {
    return fs.readFile(filePath, 'utf8')
    .then((data => {
        return JSON.parse(data);
    }))

}
const initOptions = {
    connect(e) {
        const cp = e.client.connectionParameters;
        console.log('Connected to database:', cp.database)
    }
};
const pgp = require('pg-promise')(initOptions);

const db = pgp('postgres://user:@localhost:port/database');

db.connect()
    .then(obj => {
        const serverVersion = obj.client.serverVersion;
        obj.done();
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    })


module.exports = db;


const pg = require('pg');
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const queryDB = (q, params, cb) => {
  client.connect((err) => {
    if (err) {
      cb(err);
      return null;
    }

    client.query(q, params, (err, result) => {
      if (err) {
        cb(err);
        return null;
      }

      cb(null, result.rows);
      client.end();
    });
  });
};

module.exports = {
  query: queryDB
};

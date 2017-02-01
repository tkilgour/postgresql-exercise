const userInput = process.argv.slice(2);
const firstName = userInput[0];
const lastName = userInput[1];
const birthdate = userInput[2];

if (!(firstName && lastName && birthdate)) {
  // ERROR
  return;
}

const settings = require("./settings"); // settings.json
const knex = require('knex');


const db = knex({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});


db.insert({
  first_name: firstName,
  last_name: lastName,
  birthdate: birthdate
})
.into('famous_people').then();

db.destroy();
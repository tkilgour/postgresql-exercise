console.log('Searching ...');
const settings = require("./settings"); // settings.json
const knex = require('knex');
const userInput = process.argv[2];
const inputForLike = "%"+userInput+"%";

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

var query = db.select()
  .from('famous_people')
  .where('last_name', 'ilike', inputForLike)
  .orWhere('first_name', 'ilike', inputForLike)
  .then((results) => {
    console.log(`Found ${results.length} person(s) by the name '${userInput}':`);
    for (result in results) {
      console.log(`- ${results[result].id}: ${results[result].first_name} ${results[result].last_name}, born '${results[result].birthdate.toISOString().slice(0,-14)}'`);
    }
  });

console.log(query.toSQL());

db.destroy();
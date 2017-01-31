const dbUtil = require('./dbUtil');

const userInput=`%${process.argv[2]}%`;

const q = `
  SELECT *
  FROM famous_people
  WHERE UPPER(first_name) LIKE UPPER($1) OR UPPER(last_name) LIKE UPPER($1)
  ;`;

const handleResponse = (err, results) => {
  if (err) {
    console.error("error running query", err);
  }

  console.log(`Found ${results.length} person(s) by the name '${userInput.slice(1,-1)}':`);
  for (result in results) {
    console.log(`- ${results[result].id}: ${results[result].first_name} ${results[result].last_name}, born '${results[result].birthdate.toISOString().slice(0,-14)}'`);
  }
};

dbUtil.query(q, [userInput], handleResponse);
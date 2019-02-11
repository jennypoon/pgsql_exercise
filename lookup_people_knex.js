const pg = require("pg");

const settings = require("./settings"); // settings.json

//Connection to Database
const knex = require('knex')({
  client: 'pg',
  version: '5.7',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});


// CALLBACK FUNCTION
// loop through each data and output information
function getOutput(arr) {
  arr.forEach(function(elm, i) {
    console.log(`- ${i + 1}: ${elm.first_name} ${elm.last_name}, born ${elm.birthdate.toISOString().split('T')[0]}`);
  });
}

//DATABASE QUERY
knex.from('famous_people').select('*')
    .where('first_name', 'like', `${process.argv[2]}`)
    .asCallback(function(err, result) {
      if (err) {
        return console.error("error running query", err);
      }
      console.log('Searching...')
      // console.log(result);
      console.log(`Found ${result.length} person(s) by the name '${process.argv[2]}':`)
      getOutput(result)
    })
    .finally(() => {
        knex.destroy();
    });


/* With Knex, no longer need connection, and will query using sql as methods)
- Use asCallback for direction on what it should do with results
- Escape string using backtick `
- use knex.destroy to end connection
- console.log(query.toSQL())s

Code with pg only:
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  client.query(`SELECT * FROM famous_people WHERE first_name LIKE $1`, [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching...');
    //console.log(result.rows) Outputs array of data
    console.log(`Found ${result.rows.length} person(s) by the name '${process.argv[2]}':`)

    getOutput(result.rows)

    client.end();
  });
});

*/
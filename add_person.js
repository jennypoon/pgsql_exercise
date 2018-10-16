/* Implement an add_person.js script that takes in the first name, last name and date of a famous person as three command line arguments and uses Knex to perform an insert.
*/

const pg = require("pg");

const settings = require("./settings"); // settings.json

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

knex('famous_people').insert([{
  first_name: `${process.argv[2]}`,
  last_name: `${process.argv[3]}`,
  birthdate: `${process.argv[4]}`
}])
  .then(() => console.log("data inserted"))
  .finally(() => {
        knex.destroy();
  });

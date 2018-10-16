const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


//CALLBACK FUNCTION
function getResult(arr) {
  arr.forEach(function(elm, i) {
    console.log(`- ${i + 1}: ${elm.first_name} ${elm.last_name}, born ${elm.birthdate.toISOString().split('T')[0]}`);
  });
}


//DATABASE
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
    //function to loop through each data and output information

    //Found 2 person(s) by the name 'Paul':
    console.log(`Found ${result.rows.length} person(s) by the name '${process.argv[2]}':`)
    getResult(result.rows)


    client.end();
  });
});
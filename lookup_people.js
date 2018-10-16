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

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  client.query(`SELECT * FROM famous_people WHERE first_name LIKE $1`, [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching...')

    // function getResult(arr) {
    //   let counter = 0;
    //   arr.forEach(elm => {

    //   })

    // }

    console.log("- 1:", result.rows[0].first_name, result.rows[0].last_name + ", born " +result.rows[0].birthdate)

    console.log("- 2:", result.rows[1].first_name, result.rows[1].last_name + ", born " +result.rows[1].birthdate)

    client.end();
  });
});
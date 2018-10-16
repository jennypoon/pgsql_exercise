
exports.up = function(knex, Promise) {
  return knex.schema.createTable('milestone', (table) => {
    table.string('description');
    table.date('date_achieved');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('milestone')
};

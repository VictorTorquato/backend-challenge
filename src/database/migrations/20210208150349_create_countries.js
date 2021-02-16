
exports.up = function(knex){	// cria a Table
	return knex.schema.createTable('countries', function(table) {
		table.increments('id').primary();
		table.string('name').notNullable();
		table.string('url').notNullable();
	});
};

exports.down = function(knex){	// deleta a Table
	return knex.schema.dropTable('countries');
};
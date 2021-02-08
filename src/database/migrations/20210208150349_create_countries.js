
exports.up = function(knex){	// cria a Table
	return knex.schema.createTable('countries', function(table) {
		table.serial('id').primary();
		table.string('name').notNullable();
		// campos
	});
};

exports.down = function(knex){	// deleta a Table
	return knex.schema.dropTable('countries');
};
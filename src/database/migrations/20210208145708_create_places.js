
exports.up = function(knex){	// cria a Table
	return knex.schema.createTable('places', function(table) {
		table.increments('id').primary();
		table.string('name').notNullable();
        table.date('data').notNullable();
		table.timestamp('created').defaultTo(knex.fn.now());
		table.timestamp('updated').defaultTo(knex.fn.now());
        table.string('countryId').notNullable();
        
        table.foreign('countryId').references('id').inTable('countries');
		// campos
	});
};

exports.down = function(knex){	// deleta a Table
	return knex.schema.dropTable('nome_table');
};

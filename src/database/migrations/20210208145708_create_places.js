
exports.up = function(knex){	// cria a Table
	return knex.schema.createTable('places', function(table) {
		table.serial('id').primary();
		table.string('name').notNullable();
        table.string('data').notNullable();
        table.string('countryId').notNullable();
        
        table.foreign('countryId').references('id').inTable('countries');
		// campos
	});
};

exports.down = function(knex){	// deleta a Table
	return knex.schema.dropTable('nome_table');
};

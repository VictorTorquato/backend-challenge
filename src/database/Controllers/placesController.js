const connection = require('../connection');

module.exports = {

    async create(request, response){
        const { name, data, countryId } = request.body;

        try{
            const country = await connection('countries')
            .where('id', '=', countryId)
            .first()

            if ( country == undefined)
            {
                console.log('\nSelected country does not exist!');
                return response.status(400).send();
            }
        }catch(error){

        };

        try{
            const place = await connection('places')
            .where('countryId', '=', countryId)
            .where('name', '=', name)
            .select('*');

            if ( place[0].id != undefined)
            {
                console.log('\nThis place already exist!');
                return response.status(400).send();
            }
        }catch(error){

        }
        
        try{
            await connection('places').insert({
                name, 
                data,
                countryId
            })
            console.log("\nPlace added sucessfull!");
            return response.status(201).send()
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async index(request, response){
        try{
            const places = await connection('places').join('countries', 'countries.id' , '=', 'countryId')
            .select('places.id as ID','countries.name as Country', 'places.name as Name', 'data as Meta', 'created', 'updated', 'url').orderBy('data');

            var data = ('\nPlaces: ' + '\n');

            for (var i = 0; places[i]!=undefined ; i++)
            {
                data = data.substr(0,data.length) + ('ID: ' + places[i].ID + ' - ' + places[i].Name + ' | Country: ' + places[i].Country) + ' \nMeta: ' + places[i].Meta + ' \nCreated: ' + places[i].created + ' \nUpdated: ' + places[i].updated + ' \nFlag URL: ' + places[i].url + '\n\n';
            }

            return response.status(200).send(data);
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        } 
    },

    async delete(request, response){
	    const { id } = request.params;
	
	    try{
		    await connection('places')
		    .where('id', id)
		    .delete();
            console.log("\nPlace deleted sucessfull!");
	        return response.status(204).send();
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async update(request, response){

        const { id, newName, newData } = request.body;

        try{
            const place = await connection('places')
            .where('id', '=', id)
            .select('*')

            console.log(place);

            if ( place[0].id == undefined)
            {
                console.log('\nSelected place does not exist!');
                return response.status(400).send();
            }
        }catch(error){

        }
        
        const up = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        try{
            await connection('places').where('id', '=', id).update({
                name: newName,
                data: newData,
                updated: up
            });
            console.log("\nPlace updated sucessfull!");
	        return response.status(204).send();
        }
        catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },
}
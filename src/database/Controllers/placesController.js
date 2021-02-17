const connection = require('../connection');

module.exports = {

    async exists(name, countryId){
        try{
        console.log('\nExist: ' + name + ' - ' + countryId);
		    const namep = await connection('places')
            .where('countryId', '=', countryId)
            .select('name')

            if (namep == name)
            {
	            return (1);
            }else{
                return (0);
            }
        }catch(error){
            console.log(error.name + ":" + error.message);
            return (-1);
        }

    },

    async create(request, response){
        const { name, data, countryId } = request.body;
        var exist = -1;
        try{
            const place = await connection('places')
            .where('countryId', '=', countryId)
            .where('name', '=', name)
            .first()

            if(place.name == name){ exist = 1
            }else{ exist = 0}
        }catch(error){
            
        }
        
        if ( exist == 0){
        try{
            await connection('places').insert({
                name, 
                data,
                countryId
            })
            return response.status(201).send()
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
        } else if( exist == 1){
            console.log('\nThis place already exist!');
            return response.status(404).send();
        } else {
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
	        return response.status(204).send();
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async update(request, response){

        const { id, newName, newData } = request.body;
        
        const up = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        try{
            await connection('places').where('id', '=', id).update({
                name: newName,
                data: newData,
                updated: up
            });
	        return response.status(204).send();
        }
        catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    }

}
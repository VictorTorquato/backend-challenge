const connection = require('../connection');

module.exports = {

    async create(request, response){
        const { name, data, countryId } = request.body;

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
    },

    async index(request, response){
        try{
            const data = await connection('places').join('countries', 'countries.id' , '=', 'countryId')
            .select('places.id','countries.name as País', 'places.name', 'data as Meta', 'created', 'updated', 'url').orderBy('data');

            return response.json(data);
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

        try{
            await connection('places').where('id', '=', id).update({
                name: newName,
                data: newData
            });
	        return response.status(204).send();
        }
        catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    }

}
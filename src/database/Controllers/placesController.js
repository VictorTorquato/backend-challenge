const connection = require('./database/connection');

module.exports = {

    async create(request, response){
        const { name, data, countryId } = request.body;
        console.log(data);

        const created = Date.now();
        const updated = Date.now();

        try{
            await connection('places').insert({
                name, 
                data,
                created,
                updated,
                countryId
            })
            return response.status(201);
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400);
        }    
    },

    async index(request, response){
        try{
            const data = await connection('places').select('*').orderBy('data');

            return response.json(data);
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400);
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
            return response.status(400);;
        }
    },

    async update(id, newName, newData, newCountry){
        try{
            await connection('places').where('id', '=', id).update({
                name: newName,
                data: newData
            });
        }
        catch(error){
            console.log(error.name + ":" + error.message);
        }
        return;
    }

}
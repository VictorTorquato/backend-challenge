const connection = require('./database/connection');

module.exports = {

    async create(request, response){
        const { name, data, countryId } = request.body;
        console.log(data);
    
        await connection('nomeTable').insert({
            name, 
            data,
            countryId
        })
        return response.json();
    },

    async index(request, response){
        const data = await connection('places').select('*');

        return response.json(data);
    },

    
    async delete(request, response){
	    const { id } = request.params;
	
	    try{
		    await connection('nomeTable')
		    .where('id', id)
		    .delete();
	        return response.status(204).send();
        }catch(error){
            console.log(error.name + ":" + error.message);
            return;
        }
    },

    async update(id, newName, newData, newCountry){
        try{
            await connection('nomeTable').where('id', '=', id).update({
                name: newName,
                data: newData,
                country: newCountry
            });
        }
        catch(error){
            console.log(error.name + ":" + error.message);
        }
        return;
    }

}
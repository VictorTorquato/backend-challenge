const connection = require('../connection');

module.exports = {

    async create(request, response){
        const { name, url} = request.body;
    
        try{
            await connection('countries').insert({
                name,
                url
            });
            return response.status(201).send();
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();
        }
    },

    async index(request, response){
        const data = await connection('countries').select('*');
        return response.json(data);
    },

    async delete(request, response){
	    const { id } = request.params;
	
	    try{
		    await connection('countries')
		    .where('id', id)
		    .delete();
	        return response.status(204).send();
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();;
        }
    },
}
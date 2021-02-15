const connection = require('./database/connection');

module.exports = {

    async create(request, response){
        const { name, url} = request.body;
    
        try{
            await connection('countries').insert({
                name,
                url
            })
            return response.status(201);
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400);
        }
    },

    async index(request, response){
        const data = await connection('countries').select('*');
        return response.json(data);
    },
}
const connection = require('./database/connection');

module.exports = {

    async create(request, response){
        const { name } = request.body;
    
        try{
            await connection('countries').insert({
                name
            })
            return response.json();
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.json();
        }
    },

    async index(request, response){
        const data = await connection('countries').select('*');

        return response.json(data);
    },
}
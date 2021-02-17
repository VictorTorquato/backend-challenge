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
        try{
            const countries = await connection('countries').select('*');
            var data =  ('\nCountries: ' + '\n');

            for (var i = 0; countries[i]!=undefined ; i++)
            {
                data = data.substr(0,data.length) + ('ID: ' + countries[i].id + ' - ' + countries[i].name + ' | Flag Url: ' + countries[i].url) + ' \n';
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
		    await connection('countries')
		    .where('id', id)
		    .delete();
	        return response.status(204).send('Country deleted successful!');
        }catch(error){
            console.log(error.name + ":" + error.message);
            return response.status(400).send();;
        }
    },
}
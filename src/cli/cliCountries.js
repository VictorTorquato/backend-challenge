const inquirer = require('inquirer');
const HttpRequest = require('./HttpRequest')

var countriesModule = {
    name: 'funtion',
    type: 'list',
    choices:   ['List all countries', 'Add country', 'Delete country', 'Back'],
    message: 'Select the option:'
};

var countryContinue = {
    name: 'enter',
    type: 'input',
    message: 'Press "enter" to continue:',
}

var countryCreate = [
{
    type: 'input',
    name: 'name',
    message: 'Insert country name: ',
    validate(value) {
        if (value.length) {
            return (true);
        }
        return 'It cannot be empty. Please enter it correctly...';
    }
},
{
    type: 'input',
    name: 'url', 
    message: 'Insert the country flag url: ',
    validate(value) {
        if (value.length) {
            return (true);
        }
        return 'It cannot be empty. Please enter it correctly...';
    }
},
];

var countryDelete = {
    name: 'id',
    type: 'input',
    message: 'Insert the country to be deleted by id:',
    validate(value) {
        if (value.length) {
            if(isNaN(value) == false){
                return (true);
            }
            return 'Error! The "id" field must be a number.';
        }
        return 'It cannot be empty. Please enter it correctly...';
    }
};

module.exports = {

    countryModule(){
        console.clear();
        console.log('Countries Module\n');
        inquirer.prompt(countriesModule)
        .then(answers => {
            option = answers.funtion;
            console.clear();
            switch(option){
                case 'List all countries':
                    console.clear();
                    setTimeout(function() {
                        HttpRequest.listCoutries();
                        setTimeout(function() { 
                            console.log('\n');
                            inquirer.prompt(countryContinue)
                            .then(answers => {
                                const cli = require('./cliCountries')
                                cli.countryModule();
                            }).catch(error => {
                                if(error.isTtyError) {
                                    // Prompt couldn't be rendered in the current environment
                                } else {
                                    // Something else when wrong
                                }
                            });
                        }, 500);
                    }, 500);  
                break;
                case 'Add country':
                    console.clear();
                    setTimeout(function() {
                        inquirer.prompt(countryCreate)
                        .then(answers => {
                            option = answers;
                            console.clear();
                            HttpRequest.createCountry(option.name, option.url);
                            setTimeout(function() { 
                                console.log('\n');
                                inquirer.prompt(countryContinue)
                                .then(answers => {
                                    const cli = require('./cliCountries');
                                    cli.countryModule();
                                }).catch(error => {
                                    if(error.isTtyError) {
                                        // Prompt couldn't be rendered in the current environment
                                    } else {
                                        // Something else when wrong
                                    }
                                });
                            }, 1000);
                        }).catch(error => {
                            if(error.isTtyError) {
                                // Prompt couldn't be rendered in the current environment
                            } else {
                                // Something else when wrong
                            }
                        });
                    }, 500);
                break;
                case 'Delete country':
                    HttpRequest.listCoutries();
                    setTimeout(function() {
                        console.log('\n');
                        inquirer.prompt(countryDelete)
                        .then(answers => {
                            const id = answers.id;
                            console.clear();
                            HttpRequest.deleteCountry(id);
                            setTimeout(function() { 
                                console.log('\n');
                                inquirer.prompt(countryContinue)
                                .then(answers => {
                                    const cli = require('./cliCountries');
                                    cli.countryModule();
                                }).catch(error => {
                                    if(error.isTtyError) {
                                    // Prompt couldn't be rendered in the current environment
                                    } else {
                                    // Something else when wrong
                                    }
                                });
                            }, 500);
                        }).catch(error => {
                            if(error.isTtyError) {
                            // Prompt couldn't be rendered in the current environment
                            } else {
                            // Something else when wrong
                            }
                        });
                    }, 500);
                break;
                case 'Back':
                    const cli = require('./cli');
                    cli.menu();
                break;
            }
        }).catch(error => {
            if(error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
    },

}





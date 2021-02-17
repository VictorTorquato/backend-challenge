const inquirer = require('inquirer');
const HttpRequest = require('./HttpRequest')

var placesModule = {
    name: 'funtion',
    type: 'list',
    choices:   ['List all places', 'Add place', 'Delete place', 'Update place', 'Back'],
    message: 'Select the option:'
};

var placeCreate = [
    {
        type: 'input',
        name: 'countryId', 
        message: 'Insert the country id: ',
        validate: function (value) {
            if (value.length) {
                if(isNaN(value) == false){
                    return (true);
                }
                return 'Error! The "country id" field must be a number.';
            }
            return 'It cannot be empty. Please enter it correctly...';
        }
    },
    {
        type: 'input',
        name: 'name',
        message: 'Insert place name: ',
        validate(value) {
            if (value.length) {
                return (true);
            }
            return 'It cannot be empty. Please enter it correctly...';
        }
    },
    {
        type: 'input',
        name: 'data',
        message: 'Insert the month and year you want to visit the place, follow the model (yyyy/mm): ',
        validate(value) {
            var data = value;

            if(!/^\d{4}\/\d{2}$/.test(data))
            return 'Invalid date format!';

            var year   = data.split("/")[0];
            var month  = data.split("/")[1]
            
            if(year < 1000 || year > 3000 || month <= 0 || month > 12)
                return 'Invalid date format!';

            if (value.length) {
                return (true);
            }
            return 'It cannot be empty. Please enter it correctly...';
        }
    },
];

var placeUpdate = [
    {
        type: 'input',
        name: 'id', 
        message: 'Insert the place id: ',
        validate: function (value) {
            if (value.length) {
                if(isNaN(value) == false){
                    return (true);
                }
                return 'Error! The "id" field must be a number.';
            }
            return 'It cannot be empty. Please enter it correctly...';
        }
    },
    {
        type: 'input',
        name: 'newName',
        message: 'Insert new place name: ',
        validate(value) {
            if (value.length) {
                return (true);
            }
            return 'It cannot be empty. Please enter it correctly...';
        }
    },
    {
        type: 'input',
        name: 'newData',
        message: 'Insert the new date you want to visit the place, follow the model (yyyy/mm): ',
        validate(value) {
            var data = value;

            if(!/^\d{4}\/\d{2}$/.test(data))
            return 'Invalid date format!';

            var year   = data.split("/")[0];
            var month  = data.split("/")[1]
            
            if(year < 1000 || year > 3000 || month <= 0 || month > 12)
                return 'Invalid date format!';

            if (value.length) {
                return (true);
            }
            return 'It cannot be empty. Please enter it correctly...';
        }
    },
];

var placeDelete = {
    name: 'id',
    type: 'input',
    message: 'Insert the place to be deleted by id: ',
    validate: function (value) {
        if (value.length) {
            if(isNaN(value) == false){
                return (true);
            }
            return 'Error! The "id" field must be a number.';
        }
        return 'It cannot be empty. Please enter it correctly...';
    }
};

var placeContinue = {
    name: 'enter',
    type: 'input',
    message: 'Press "enter" to continue:',
};

module.exports = {

    placesModule(){
        console.clear();
        console.log('Places Module\n');
        inquirer.prompt(placesModule)
        .then(answers => {
            console.clear();
            option = answers.funtion;
            switch(option){
                case 'List all places':
                    setTimeout(function() {
                        console.clear();
                        HttpRequest.listPlaces();
                        setTimeout(function() { 
                            console.log('\n');
                            inquirer.prompt(placeContinue)
                            .then(answers => {
                                const cli = require('./cliPlaces');
                                cli.placesModule();
                            }).catch(error => {
                                if(error.isTtyError) {
                                    // Prompt couldn't be rendered in the current environment
                                } else {
                                    // Something else when wrong
                                }
                            });
                        }, 500);
                    }, 500)
                break;
                case 'Add place':
                    console.clear();
                    HttpRequest.listCoutries();
                    console.log('\n');
                    setTimeout(function() { 
                    inquirer.prompt(placeCreate)
                    .then(answers => {
                        const place = answers;
                        HttpRequest.createPlace(place.name, place.data, place.countryId);
                        setTimeout(function() { 
                            console.log('\n');
                            inquirer.prompt(placeContinue)
                            .then(answers => {
                                const cli = require('./cliPlaces');
                                cli.placesModule();
                            }).catch(error => {
                                if(error.isTtyError) {
                                    // Prompt couldn't be rendered in the current environment
                                } else {
                                    // Something else when wrong
                                }
                            });
                        }, 1500);
                    }).catch(error => {
                        if(error.isTtyError) {
                            // Prompt couldn't be rendered in the current environment
                        } else {
                            // Something else when wrong
                        }
                    });
                }, 500);
                break;
                case 'Update place':
                    console.clear();
                    HttpRequest.listPlaces();
                    setTimeout(function() {
                    console.log('\n');
                    inquirer.prompt(placeUpdate)
                    .then(answers => {
                        option = answers;
                        HttpRequest.updatePlace(option.id, option.newName, option.newData);
                        setTimeout(function() { 
                            console.log('\n');
                            inquirer.prompt(placeContinue)
                            .then(answers => {
                                const cli = require('./cliPlaces');
                                cli.placesModule();
                            }).catch(error => {
                                if(error.isTtyError) {
                                    // Prompt couldn't be rendered in the current environment
                                } else {
                                    // Something else when wrong
                                }
                            });
                        }, 800);
                    }).catch(error => {
                        if(error.isTtyError) {
                            // Prompt couldn't be rendered in the current environment
                        } else {
                            // Something else when wrong
                        }
                    });
                }, 800);
                break;
                case 'Delete place':
                    HttpRequest.listPlaces();
                    setTimeout(function() {
                        console.log('\n');
                        inquirer.prompt(placeDelete)
                        .then(answers => {
                            const id = answers.id;
                            console.clear();
                            HttpRequest.deletePlace(id);
                            setTimeout(function() { 
                                console.log('\n');
                                inquirer.prompt(placeContinue)
                                .then(answers => {
                                    const cli = require('./cliPlaces');
                                    cli.placesModule();
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
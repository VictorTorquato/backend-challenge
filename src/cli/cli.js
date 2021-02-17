const figlet = require('figlet');
const inquirer = require('inquirer');
const cliPlaces = require('./cliPlaces');
const cliCountries = require('./cliCountries');


var menuInit = {
    name: 'module',
    type: 'list',
    choices:   ['Countries', 'Places', 'Exit'],
    message: 'Select the module:'
};

module.exports = {

    menu() {

        console.clear();

        console.log(figlet.textSync('BackEnd Challenge', { horizontalLayout: 'full' }));

        var option = '';

        inquirer.prompt(menuInit)
        .then(answers => {
            option = answers.module;
            console.clear();
                switch (option) {
                    case 'Countries':
                            cliCountries.countryModule();
                        break;
                    case 'Places':
                            cliPlaces.placesModule();
                        break;
                    case 'Exit':
                            console.log('Exiting...\n');
                            process.kill(process.pid, 'SIGTERM');
                        break;
                    default:
                        console.log('\nError! Unknown command.');
                        break;
                }
            }).catch(error => {
            if(error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
            });
    }
}
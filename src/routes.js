const express = require('express');

const routes = express.Router();

const placesController = require('./controllers/placesController');
const countriesController = require('./controllers/countriesController');

routes.get('/places', placesController.index);
routes.post('/places', placesController.create);
routes.delete('/places/:id', placesController.delete);
routes.update('/places', placesController.update);

routes.get('/countries', countriesController.index);
routes.post('/countries', countriesController.create);

module.exportes = routes;
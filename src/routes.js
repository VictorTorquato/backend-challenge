const express = require('express');

const routes = express.Router();

const placesController = require('./database/controllers/placesController');
const countriesController = require('./database/controllers/countriesController');

routes.get('/places', placesController.index);
routes.post('/places', placesController.create);
routes.delete('/places/:id', placesController.delete);
routes.put('/places', placesController.update);

routes.get('/countries', countriesController.index);
routes.post('/countries', countriesController.create);
routes.delete('/countries/:id', countriesController.delete);

module.exports = routes;
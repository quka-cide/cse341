const routes = require('express').Router();
const contacts = require('./contactsRouter');
const profModel = require('../models/professional-model')

routes.use('/', require('./swagger'))
routes.use('/contacts', contacts);
routes.get("/professional", profModel.getProfessional)

module.exports = routes;
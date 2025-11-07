const express = require("express");
const router = express.Router();
const contactsController = require('../controllers/contactsController');
const contactsModel = require('../models/contacts-model');

router.get("/", contactsModel.getContacts);
router.get("/single", contactsModel.getSingleContact);
router.post('/', contactsController.createContactHandler);
router.put('/:id', contactsController.updateContactHandler);
router.delete('/:id', contactsController.deleteContactHandler);



module.exports = router;
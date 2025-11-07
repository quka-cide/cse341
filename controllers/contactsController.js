const express = require('express');
const contactsModel = require('../models/contacts-model');

async function createContactHandler(req, res) {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;
        if(!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const contactId = await contactsModel.createContact({firstName, lastName, email, favoriteColor, birthday});
        res.status(201).json({ id: contactId });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' })
    }
}

async function updateContactHandler(req, res) {
    try {
        const { id } = req.params;
        const contactData = req.body;

        const result = await contactsModel.updateContact(id, contactData);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(200).json({ message: 'No changes made' });
        }

        res.status(200).json({ message: 'Contact updated successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating contact' });
    }
}

async function deleteContactHandler(req, res) {
    console.log('DELETE /contacts/:id hit!')
    try {
        const { id } = req.params;
        const result = await contactsModel.deleteContact(id);

        if(result.deletedCount === 0) {
            res.status(404).json('Contact not found')
        }

        res.status(200).json({ message: 'Contact deleted successfully'})
    } catch(error) {
        console.error(error)
        res.status(500).json({ message: 'Error deleting contact'})
    }
}

module.exports = { 
    createContactHandler,
    updateContactHandler,
    deleteContactHandler
}
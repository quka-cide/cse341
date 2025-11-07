const { get } = require('mongoose');
const mongodb = require('../utilities/connect');
const { ObjectId } = require('mongodb');

async function getContacts(req, res) {
    try {
        const db = mongodb.getDb();
        const contacts = await db.collection("contacts").find().toArray();
        res.status(200).json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching contacts" });
    }
}

async function getSingleContact(req, res) {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ message: "ID query parameter is required" });
    }
    
    try {
        const db = mongodb.getDb();
        const contact = await db.collection("contacts").findOne({ _id: new ObjectId(String(id)) });
        
    if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
    }
    
    res.status(200).json(contact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching contact" });
    }
}

async function createContact(contact) {
    const db = mongodb.getDb();
    const result = await db.collection('contacts').insertOne(contact);
    return result.insertedId.toString();
}

async function updateContact(id, contactData) {
    const db = mongodb.getDb();
    const result = await db.collection('contacts').updateOne(
        {_id: new ObjectId(String(id)) },
        {$set: contactData }
    );
    return result
}

async function deleteContact(id) {
    const db = mongodb.getDb();
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(String(id)) });
    return result;
}

module.exports = { 
    createContact, 
    updateContact, 
    getContacts, 
    getSingleContact,
    deleteContact,
 };


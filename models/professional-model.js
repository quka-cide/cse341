const mongodb = require('../utilities/connect');

async function getProfessional(req, res) {
    try {
        const db = mongodb.getDb();
        const collection = db.collection('data');
        const result = await collection.findOne();
        res.status(200).json(result)
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching data' });
    }
}

module.exports = { getProfessional }
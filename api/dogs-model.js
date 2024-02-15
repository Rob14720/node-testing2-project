const db = require('../data/dbConfig.js')

async function createDog(dog) {
    const [id] = await db('dogs').insert(dog)
    return db('dogs').where('dog_id', id).first()
}

async function deleteDog(id) {
    const delDog = await db('dogs').where({dog_id: id}).first()
    await db('dogs').where({dog_id: id}).del()
    return delDog
}

module.exports = {
    createDog,
    deleteDog,
}
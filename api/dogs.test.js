const request = require('supertest')
const db = require('../data/dbConfig.js')
const server = require('../server.js')
const Dog = require('./dogs-model.js')

const dog1 = { dog_name: 'Duchess', dog_breed: 'German Shepherd' }
const dog2 = { dog_name: 'Cooper', dog_breed: 'Boxer' }

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('dogs').truncate()
})

afterAll(async () => {
    await db.destroy()
})

it('correct env var', () => {
    expect(process.env.DB_ENV).toBe('testing')
})

describe('Dogs model functions', () => {
    describe('create dog', () => {
        it('adds a dog to the db', async () => {
            let dogs
            await Dog.createDog(dog1)
            dogs = await db('dogs')
            expect(dogs).toHaveLength(1)

            await Dog.createDog(dog2)
            dogs = await db('dogs')
            expect(dogs).toHaveLength(2)
        })
        it('inserts dog and breed', async () => {
            const dog = await Dog.createDog(dog1)
            expect(dog).toMatchObject({ dog_id: 1, ...dog })
        })
    })
    describe('[DELETE] / -delete dog', () => {
        it('removes dog from database', async () => {
            const [dog_id] = await db('dogs').insert(dog1)
            let dog = await db('dogs').where({ dog_id }).first()
            expect(dog).toBeTruthy()
            await request(server).delete(`/dogs/${dog_id}`)
            dog = await db('dogs').where({ dog_id }).first()
            expect(dog).toBeFalsy()
        })
        it('responds with the deleted dog', async () => {
            await db('dogs').insert(dog1)
            let dog = await request(server).delete('/dogs/1')
            expect(dog.body).toMatchObject(dog1)
        })
    })
})